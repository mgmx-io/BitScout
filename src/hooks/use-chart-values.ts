import { usePreferencesStore } from "@/stores/preferences";
import { useDerivedValue } from "react-native-reanimated";
import type { ChartPressState } from "victory-native";

export function useChartValues(
  state: ChartPressState<{ x: number; y: { value: number } }>,
) {
  const { displayUnit, fiatCurrency } = usePreferencesStore();

  const animatedBalance = useDerivedValue(() => {
    const value = Number(state.y.value.value.value);

    if (displayUnit === "BTC") {
      return `${value.toFixed(8)} BTC`;
    } else if (displayUnit === "sats") {
      return `${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)} sats`;
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: fiatCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
  });

  const animatedDate = useDerivedValue(() => {
    const timestamp = Number(state.x.value.value);
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  });

  return { animatedBalance, animatedDate };
}
