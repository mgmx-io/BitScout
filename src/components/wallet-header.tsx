import { useBalance } from "@/hooks/use-balance";
import { useChartValues } from "@/hooks/use-chart-values";
import { useDisplayValue } from "@/hooks/use-display-value";
import { usePreferencesStore } from "@/stores/preferences";
import { authenticate, Feedback } from "@/utils";
import { Skeleton } from "heroui-native";
import { Fragment } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useChartPressState } from "victory-native";
import { AnimatedText } from "./animated-text";
import { BalanceChart } from "./balance-chart";
import Icon from "./icon";

export function WalletHeader() {
  const balance = useBalance();
  const displayValue = useDisplayValue(balance);
  const { state, isActive } = useChartPressState({ x: 0, y: { value: 0 } });
  const { displayUnit, fiatCurrency, visible, cycleUnit, toggleVisibility } =
    usePreferencesStore();

  const { animatedBalance, animatedDate } = useChartValues(state);

  const handleUnitPress = () => {
    Feedback.selection();
    cycleUnit();
  };

  const handleVisibilityPress = async () => {
    Feedback.selection();
    if (visible) return toggleVisibility();
    const ok = await authenticate();
    if (!ok) return;
    toggleVisibility();
  };

  return (
    <Fragment>
      <View className="p-4">
        <View className="mb-2">
          <Text className="text-foreground">Balance</Text>
          <Skeleton isLoading={balance === null} className="h-9 w-48 rounded">
            {isActive ? (
              <AnimatedText
                text={animatedBalance}
                className="text-foreground text-3xl font-bold"
              />
            ) : (
              <Text className="text-foreground text-3xl font-bold">
                {displayValue}
              </Text>
            )}
          </Skeleton>
        </View>

        <View className="flex-row gap-2">
          {!isActive && (
            <TouchableOpacity
              className="bg-surface h-8 w-12 items-center justify-center rounded shadow-xs"
              onPress={handleUnitPress}
            >
              <Text className="text-foreground font-bold">
                {displayUnit === "fiat" ? fiatCurrency : displayUnit}
              </Text>
            </TouchableOpacity>
          )}

          {!isActive && (
            <TouchableOpacity
              className="bg-surface h-8 w-12 items-center justify-center rounded shadow-xs"
              onPress={handleVisibilityPress}
            >
              <Icon.Material
                name={visible ? "visibility-off" : "visibility"}
                size={20}
                colorClassName="accent-foreground"
              />
            </TouchableOpacity>
          )}

          {isActive && (
            <View className="bg-surface h-8 items-center justify-center rounded shadow-xs">
              <AnimatedText
                text={animatedDate}
                className="text-foreground mx-4 w-full text-center font-bold"
              />
            </View>
          )}
        </View>
      </View>
      {visible && (
        <BalanceChart
          state={state}
          isActive={isActive}
          displayUnit={displayUnit}
          fiatCurrency={fiatCurrency}
        />
      )}
    </Fragment>
  );
}
