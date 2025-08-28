import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ExchangePrice } from "../types";

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading market data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>Market Data Unavailable</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No exchange data available</Text>
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Exchange</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Updated</Text>
      </View>

      {data.map((exchange, index) => (
        <View
          key={exchange.exchange}
          style={[
            styles.exchangeRow,
            index === 0 && styles.firstRow,
            index === data.length - 1 && styles.lastRow,
          ]}
        >
          <View style={styles.exchangeInfo}>
            <Text style={styles.exchangeName}>{exchange.exchange}</Text>
            <Text style={styles.currencyCode}>{exchange.currency}</Text>
          </View>

          <Text style={styles.price}>
            {formatPrice(exchange.price, exchange.currency)}
          </Text>

          <Text style={styles.timestamp}>
            {new Date(exchange.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "center",
  },
  exchangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    marginBottom: 1,
    borderLeftWidth: 4,
    borderLeftColor: "transparent",
  },
  firstRow: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastRow: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 0,
  },
  exchangeInfo: {
    flex: 1,
  },
  exchangeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  currencyCode: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  price: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#10b981",
    textAlign: "center",
  },
  timestamp: {
    flex: 1,
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
    fontWeight: "500",
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 16,
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
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  errorSubtext: {
    color: "#ef4444",
    fontSize: 14,
    textAlign: "center",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "600",
  },
});
