import { useState } from "react";
import { useBitcoinData } from "./hooks/useBitcoinData";
import { CurrencySelector } from "./components/CurrencySelector";
import { BestPrice } from "./components/BestPrice";
import { ExchangesList } from "./components/ExchangesList";
import { AutoRefreshToggle } from "./components/AutoRefreshToggle";
import type { Currency } from "./types/index";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [autoRefresh, setAutoRefresh] = useState(false);

  const { bestPrice, exchanges, refetch, loading } = useBitcoinData(currency);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="app">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="app-header">
          <h1>BTC Price</h1>
          <div className="controls">
            <CurrencySelector
              currency={currency}
              onCurrencyChange={setCurrency}
            />
            <button onClick={handleRefresh} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </header>

        <main className="app-main">
          <section className="best-price-section">
            <h2>Best Sell Price</h2>
            <BestPrice
              {...{
                ...bestPrice,
                data: bestPrice.data ? bestPrice.data[0] : null,
              }}
            />
          </section>

          <section className="exchanges-section">
            <ExchangesList {...exchanges} />
          </section>

          <section className="auto-refresh-section">
            <AutoRefreshToggle
              onRefresh={handleRefresh}
              enabled={autoRefresh}
              onToggle={setAutoRefresh}
            />
          </section>
        </main>
      </motion.div>
    </div>
  );
}

export default App;
