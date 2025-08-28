import { useState, useEffect } from "react";

interface AutoRefreshToggleProps {
  onRefresh: () => void;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const AutoRefreshToggle: React.FC<AutoRefreshToggleProps> = ({
  onRefresh,
  enabled,
  onToggle,
}) => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onRefresh();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, onRefresh]);

  return (
    <div className="auto-refresh">
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
        />
        Auto-refresh every 30s
      </label>
      {enabled && <span className="countdown">({countdown}s)</span>}
    </div>
  );
};
