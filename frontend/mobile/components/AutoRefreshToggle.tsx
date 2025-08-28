import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

interface AutoRefreshToggleProps {
  onRefresh: () => void;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  countdown: number;
}

export const AutoRefreshToggle: React.FC<AutoRefreshToggleProps> = ({
  onRefresh,
  enabled,
  onToggle,
  countdown,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Auto Refresh</Text>
          <Text style={styles.description}>Update every 30 seconds</Text>
        </View>

        <View style={styles.controls}>
          {enabled && (
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>{countdown}s</Text>
            </View>
          )}
          <Switch
            value={enabled}
            onValueChange={onToggle}
            trackColor={{ false: "#e2e8f0", true: "rgba(99, 102, 241, 0.3)" }}
            thumbColor={enabled ? "#6366f1" : "#f8fafc"}
            ios_backgroundColor="#e2e8f0"
            style={styles.switch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.1)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  countdown: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 50,
    alignItems: "center",
  },
  countdownText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});
