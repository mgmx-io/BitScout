import { useBalance } from "@/hooks/use-balance";
import { useDisplayValue } from "@/hooks/use-display-value";
import { usePreferencesStore } from "@/stores/preferences";
import { Feedback } from "@/utils";
import { Skeleton } from "heroui-native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "./icon";

export function WalletHeader() {
  const balance = useBalance();
  const { unit, visible, cycleUnit, toggleVisibility } = usePreferencesStore();
  const displayValue = useDisplayValue(balance);

  return (
    <View className="gap-2 p-4">
      <View>
        <Text className="text-foreground">Balance</Text>
        <Skeleton isLoading={balance === null} className="h-9 w-48 rounded">
          <Text className="text-foreground text-3xl font-bold">
            {displayValue}
          </Text>
        </Skeleton>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity
          className="bg-surface h-8 w-12 items-center justify-center rounded shadow-xs"
          onPress={() => {
            Feedback.selection();
            cycleUnit();
          }}
        >
          <Text className="text-foreground font-bold">{unit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-surface h-8 w-12 items-center justify-center rounded shadow-xs"
          onPress={() => {
            Feedback.selection();
            toggleVisibility();
          }}
        >
          <Icon
            name={visible ? "visibility-off" : "visibility"}
            size={20}
            colorClassName="accent-foreground"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
