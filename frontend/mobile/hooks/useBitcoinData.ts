import { useState, useEffect, useCallback } from "react";
import { ExchangePrice, Currency, ApiResponse } from "../types";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const useBitcoinData = (currency: Currency) => {
  const [bestPrice, setBestPrice] = useState<ApiResponse>({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const [exchanges, setExchanges] = useState<ApiResponse>({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const fetchBestPrice = useCallback(async () => {
    setBestPrice((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/best?currency=${currency}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data: ExchangePrice | ExchangePrice[] = await response.json();
      const bestPriceData = Array.isArray(data) ? data[0] : data;

      setBestPrice({
        data: bestPriceData,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      setBestPrice({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: null,
      });
    }
  }, [currency]);

  const fetchExchanges = useCallback(async () => {
    setExchanges((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/exchanges?currency=${currency}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch exchanges");
      }
      const data: ExchangePrice[] = await response.json();
      setExchanges({
        data: data,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      setExchanges({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: null,
      });
    }
  }, [currency]);

  const fetchAllData = useCallback(async () => {
    await Promise.all([fetchBestPrice(), fetchExchanges()]);
  }, [fetchBestPrice, fetchExchanges]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    bestPrice,
    exchanges,
    refetch: fetchAllData,
    loading: bestPrice.loading || exchanges.loading,
  };
};
