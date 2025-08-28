import type { ExchangePrice } from "../types";

interface ExchangesListProps {
  data: ExchangePrice[] | null;
  loading: boolean;
  error: string | null;
}

export const ExchangesList: React.FC<ExchangesListProps> = ({
  data,
  loading,
  error,
}) => {
  if (loading) {
    return <div className="exchanges-list loading">Loading exchanges...</div>;
  }

  if (error) {
    return <div className="exchanges-list error">Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="exchanges-list">No exchange data available</div>;
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
    <div className="exchanges-list">
      <h3>All Exchange Prices</h3>
      <table>
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((exchange) => (
            <tr key={exchange.exchange}>
              <td>{exchange.exchange}</td>
              <td>{formatPrice(exchange.price, exchange.currency)}</td>
              <td>{exchange.currency}</td>
              <td>{new Date(exchange.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
