import { useAddresses } from "@/hooks/use-addresses";
import { useBalance } from "@/hooks/use-balance";
import { useAppStore } from "@/stores";
import { useNavigation } from "@react-navigation/native";
import { Button } from "heroui-native";
import { Text, View } from "react-native";

export function Wallet() {
  const addresses = useAddresses();
  const { navigate } = useNavigation();
  const { removeAddress } = useAppStore();
  const balance = useBalance();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{balance}</Text>
      {addresses.map(({ id, address }) => (
        <Text
          key={id}
          className="text-foreground"
          onPress={() => removeAddress(id)}
        >
          {address}
        </Text>
      ))}
      <Button onPress={() => navigate("Track")}>track new address</Button>
    </View>
  );
}
