import { Text, TouchableOpacity, View } from "react-native";
import Icon from "./icon";

export function WalletSection() {
  return (
    <View className="bg-background flex-row items-center justify-between px-4 py-2">
      <Text className="text-foreground text-lg font-bold">Addresses</Text>
      <TouchableOpacity className="bg-surface h-8 w-12 items-center justify-center rounded">
        <Icon name="sort" size={18} colorClassName="accent-foreground" />
      </TouchableOpacity>
    </View>
  );
}
