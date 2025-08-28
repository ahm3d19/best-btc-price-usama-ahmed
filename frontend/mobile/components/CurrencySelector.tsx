import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Currency } from "../types";

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
    <View style={styles.container}>
      {CURRENCIES.map((curr) => (
        <TouchableOpacity
          key={curr}
          style={[
            styles.currencyButton,
            curr === currency && styles.activeButton,
          ]}
          onPress={() => onCurrencyChange(curr)}
        >
          <Text
            style={[
              styles.currencyText,
              curr === currency && styles.activeText,
            ]}
          >
            {curr}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
    marginVertical: 8,
  },
  currencyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
  activeText: {
    color: "#6366f1",
    fontWeight: "600",
  },
});
