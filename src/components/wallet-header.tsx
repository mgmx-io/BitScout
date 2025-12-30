import { useBalance } from "@/hooks/use-balance";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "./icon";

export function WalletHeader() {
  const balance = useBalance();

  return (
    <View className="gap-2 p-4">
      <View>
        <Text className="text-foreground">Balance</Text>
        <Text className="text-foreground text-3xl font-bold">
          {balance} sats
        </Text>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity className="bg-surface items-center justify-center rounded px-4 py-2">
          <Text className="text-foreground">sats</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-surface items-center justify-center rounded px-4 py-2">
          <Icon
            name="visibility"
            size={18}
            colorClassName="accent-foreground"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
