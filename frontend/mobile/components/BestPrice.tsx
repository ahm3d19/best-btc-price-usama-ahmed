import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { ExchangePrice } from "../types";

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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Fetching best price...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>Connection Error</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No market data available</Text>
      </View>
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
    <View style={styles.bestPriceContainer}>
      {/* Price Display */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceDisplay}>
          {formatPrice(data.price, data.currency)}
        </Text>
      </View>

      {/* Exchange Badge */}
      <View style={styles.exchangeContainer}>
        <View style={styles.exchangeBadge}>
          <Text style={styles.exchangeName}>{data.exchange}</Text>
        </View>
      </View>

      {/* Last Updated */}
      {lastUpdated && (
        <View style={styles.lastUpdatedContainer}>
          <Text style={styles.clockIcon}>⏱</Text>
          <Text style={styles.lastUpdatedText}>
            Updated {lastUpdated.toLocaleTimeString()}
          </Text>
        </View>
      )}

      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  bestPriceContainer: {
    alignItems: "center",
    padding: 8,
    position: "relative",
  },
  priceContainer: {
    marginBottom: 24,
  },
  priceDisplay: {
    fontSize: 42,
    fontWeight: "800",
    color: "#6366f1",
    textAlign: "center",
    textShadowColor: "rgba(99, 102, 241, 0.2)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
    letterSpacing: 0.5,
  },
  exchangeContainer: {
    marginBottom: 20,
  },
  exchangeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
  trophyIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  exchangeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6366f1",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  lastUpdatedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  clockIcon: {
    fontSize: 14,
    marginRight: 8,
    color: "#64748b",
  },
  lastUpdatedText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6366f1",
    fontWeight: "600",
  },
  errorContainer: {
    padding: 32,
    backgroundColor: "rgba(239, 68, 68, 0.05)",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(239, 68, 68, 0.1)",
    alignItems: "center",
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  errorSubtext: {
    color: "#ef4444",
    fontSize: 14,
    textAlign: "center",
  },
  noDataText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "600",
  },
  decorativeCircle1: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(99, 102, 241, 0.05)",
    zIndex: -1,
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(245, 158, 11, 0.05)",
    zIndex: -1,
  },
});
