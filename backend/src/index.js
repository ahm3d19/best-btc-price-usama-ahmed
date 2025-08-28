const express = require("express");
const cors = require("cors");
const {
  getAllExchangePrices,
  getBestPrice,
} = require("./service/bitcoinExchangeService");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// Health endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Best price endpoint
app.get("/api/best", async (req, res) => {
  try {
    const currency = req.query.currency || "GBP";
    const bestPrice = await getBestPrice(currency);
    res.json([bestPrice]);
  } catch (error) {
    if (error.message === "UPSTREAM_UNAVAILABLE") {
      res.status(502).json({ error: "UPSTREAM_UNAVAILABLE" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Exchanges list endpoint
app.get("/api/exchanges", async (req, res) => {
  try {
    const currency = req.query.currency || "GBP";
    const prices = await getAllExchangePrices(currency);

    if (prices.length === 0) {
      return res.status(502).json({ error: "UPSTREAM_UNAVAILABLE" });
    }

    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`CORS enabled for: http://localhost:5173`);
});
