import { useBalance } from "@/hooks/use-balance";
import { useDisplayValue } from "@/hooks/use-display-value";
import { useCurrencyStore } from "@/stores/currency";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "./icon";

export function WalletHeader() {
  const balance = useBalance();
  const { unit, visible, cycleUnit, toggleVisibility } = useCurrencyStore();
  const displayValue = useDisplayValue(balance);

  return (
    <View className="gap-2 p-4">
      <View>
        <Text className="text-foreground">Balance</Text>
        <Text className="text-foreground text-3xl font-bold">
          {displayValue}
        </Text>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity
          className="bg-surface w-12 items-center justify-center rounded py-2"
          onPress={cycleUnit}
        >
          <Text className="text-foreground font-bold">{unit}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-surface w-12 items-center justify-center rounded py-2"
          onPress={toggleVisibility}
        >
          <Icon
            name={visible ? "visibility-off" : "visibility"}
            size={18}
            colorClassName="accent-foreground"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
