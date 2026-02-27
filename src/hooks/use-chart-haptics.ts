import { Feedback } from "@/utils";
import { useAnimatedReaction } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import type { ChartPressState } from "victory-native";

type ChartState = ChartPressState<{ x: number; y: { value: number } }>;

const trigger = () => Feedback.selection();

export function useChartHaptics(state: ChartState, isActive: boolean) {
  useAnimatedReaction(
    () => {
      if (!isActive) return null;
      return Number(state.x.value.value);
    },
    (current, previous) => {
      if (current === null) return;
      if (previous === null || previous === undefined) return;
      if (current !== previous) scheduleOnRN(trigger);
    },
    [isActive],
  );
}
