import { useAddresses } from "@/hooks/use-addresses";
import { useWallets } from "@/hooks/use-wallets";
import { useNavigation } from "@react-navigation/native";
import { Button } from "heroui-native";
import { Text, View } from "react-native";

export function Wallet() {
  const addresses = useAddresses();
  const wallets = useWallets();
  const { navigate } = useNavigation();

  console.log({ wallets });

  return (
    <View className="flex-1 items-center justify-center">
      {addresses.map(({ address, id }) => (
        <Text key={id}>{address}</Text>
      ))}
      <Button onPress={() => navigate("Track")}>track new address</Button>
    </View>
  );
}
