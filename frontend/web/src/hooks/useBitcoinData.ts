import { useState, useEffect, useCallback } from "react";
import type { ExchangePrice, Currency, ApiResponse } from "../types/index";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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
        throw new Error("Failed to fetch best price");
      }
      const data: ExchangePrice = await response.json();
      setBestPrice({
        data: data,
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
