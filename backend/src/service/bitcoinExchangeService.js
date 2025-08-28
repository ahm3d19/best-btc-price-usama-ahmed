const fetch = require("node-fetch");

const API_TIMEOUT = 3000; // 3 seconds

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function getBlockchainPrice(currency = "GBP") {
  try {
    const response = await fetchWithTimeout("https://blockchain.info/ticker");

    if (response.ok) {
      const data = await response.json();
      const currencyData = data[currency];

      if (!currencyData) {
        throw new Error(
          `Currency ${currency} not supported by Blockchain.info`
        );
      }

      return {
        exchange: "Blockchain",
        symbol: `BTC/${currency}`,
        // Using 'sell' as the sell price representation
        price: currencyData.sell,
        currency: currency,
        timestamp: new Date().toISOString(),
      };
    }
    throw new Error(`HTTP error: ${response.status}`);
  } catch (error) {
    console.error(`Blockchain.info API error: ${error.message}`);
    return null;
  }
}

async function getExmoPrice(currency = "GBP") {
  try {
    const pair = `BTC_${currency}`;
    const response = await fetchWithTimeout("https://api.exmo.com/v1/ticker");

    if (response.ok) {
      const data = await response.json();
      const pairData = data[pair];

      if (!pairData) {
        throw new Error(`Pair ${pair} not supported by EXMO`);
      }

      return {
        exchange: "EXMO",
        symbol: `BTC/${currency}`,
        // Using 'sell_price' as the sell price representation
        price: parseFloat(pairData.sell_price),
        currency: currency,
        timestamp: new Date().toISOString(),
      };
    }
    throw new Error(`HTTP error: ${response.status}`);
  } catch (error) {
    console.error(`EXMO API error: ${error.message}`);
    return null;
  }
}

async function getAllExchangePrices(currency = "GBP") {
  const [blockchainPrice, exmoPrice] = await Promise.allSettled([
    getBlockchainPrice(currency),
    getExmoPrice(currency),
  ]);

  const prices = [];

  if (blockchainPrice.status === "fulfilled" && blockchainPrice.value) {
    prices.push(blockchainPrice.value);
  }

  if (exmoPrice.status === "fulfilled" && exmoPrice.value) {
    prices.push(exmoPrice.value);
  }

  return prices;
}

async function getBestPrice(currency = "GBP") {
  const prices = await getAllExchangePrices(currency);

  if (prices.length === 0) {
    throw new Error("UPSTREAM_UNAVAILABLE");
  }

  // Find the highest price
  const bestPrice = prices.reduce((highest, current) =>
    current.price > highest.price ? current : highest
  );

  return bestPrice;
}

module.exports = {
  getAllExchangePrices,
  getBestPrice,
};
