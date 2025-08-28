import type { Currency } from "../types";

interface CurrencySelectorProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CURRENCIES: Currency[] = ["GBP", "EUR", "USD"];

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  onCurrencyChange,
}) => {
  return (
    <select
      value={currency}
      onChange={(e) => onCurrencyChange(e.target.value as Currency)}
      className="currency-selector"
    >
      {CURRENCIES.map((curr) => (
        <option key={curr} value={curr}>
          {curr}
        </option>
      ))}
    </select>
  );
};
