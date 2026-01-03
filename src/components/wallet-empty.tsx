import { Text, View } from "react-native";
import Icon from "./icon";

export function WalletEmpty() {
  return (
    <View className="flex-1 items-center justify-center gap-3 px-8 py-16">
      <View className="bg-surface-secondary h-16 w-16 items-center justify-center rounded-full">
        <Icon
          name="account-balance-wallet"
          size={32}
          colorClassName="accent-foreground"
        />
      </View>
      <Text className="text-foreground text-lg font-bold">
        No addresses yet
      </Text>
      <Text className="text-muted text-center">
        Get started by tracking your first Bitcoin address
      </Text>
    </View>
  );
}
