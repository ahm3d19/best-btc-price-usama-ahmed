export interface ExchangePrice {
  exchange: string;
  symbol: string;
  price: number;
  currency: string;
  timestamp: string;
}

export interface ApiResponse {
  data: ExchangePrice[] | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export type Currency = "GBP" | "EUR" | "USD";
