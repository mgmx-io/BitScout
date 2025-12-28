import { useNavigation } from "@react-navigation/native";
import { Button } from "heroui-native";
import { Text, View } from "react-native";

export function Wallet() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-accent">Wallet</Text>
      <Button onPress={() => navigate("Address")}>Go to Address</Button>
      <Button onPress={() => navigate("Track")}>Go to Track</Button>
    </View>
  );
}
