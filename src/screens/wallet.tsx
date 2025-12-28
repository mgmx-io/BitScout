import { useWalletAddresses } from "@/hooks/use-wallet-addresses";
import { Text, View } from "react-native";

export function Wallet() {
  const addresses = useWalletAddresses();

  return (
    <View className="flex-1 items-center justify-center">
      {addresses.map(({ address, id }) => (
        <Text key={id}>{address}</Text>
      ))}
    </View>
  );
}
