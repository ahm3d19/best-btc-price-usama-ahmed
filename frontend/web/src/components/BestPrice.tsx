import type { ExchangePrice } from "../types";

interface BestPriceProps {
  data: ExchangePrice | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const BestPrice: React.FC<BestPriceProps> = ({
  data,
  loading,
  error,
  lastUpdated,
}) => {
  if (loading) {
    return (
      <div className="best-price loading">
        <div>Loading best price...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="best-price error">
        <div>⚠️ Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="best-price">
        <div>No data available</div>
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="best-price">
      <div className="price-display">
        {formatPrice(data.price, data.currency)}
      </div>
      <div className="exchange-name"> {data.exchange}</div>
      {lastUpdated && (
        <div className="last-updated">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};
