import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useBitcoinData } from "../hooks/useBitcoinData";
import { CurrencySelector } from "../components/CurrencySelector";
import { BestPrice } from "../components/BestPrice";
import { ExchangesList } from "../components/ExchangesList";
import { AutoRefreshToggle } from "../components/AutoRefreshToggle";
import { Currency } from "../types/index";

export default function App() {
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const { bestPrice, exchanges, refetch, loading } = useBitcoinData(currency);

  const handleRefresh = () => {
    refetch();
    if (autoRefresh) {
      setCountdown(30);
    }
  };

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refetch();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refetch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={["#6366f1"]}
            tintColor="#6366f1"
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>BTC Price</Text>
          <CurrencySelector
            currency={currency}
            onCurrencyChange={setCurrency}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Sell Price</Text>
          <BestPrice {...bestPrice} />
        </View>

        <View style={styles.section}>
          <ExchangesList {...exchanges} />
        </View>

        <AutoRefreshToggle
          onRefresh={handleRefresh}
          enabled={autoRefresh}
          onToggle={setAutoRefresh}
          countdown={countdown}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6366f1",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 8,
  },
});
