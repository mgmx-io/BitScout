import { useGetPrices } from "@/api/queries";
import { Text, View } from "react-native";

export function Home() {
  const query = useGetPrices();

  return (
    <View className="bg-background flex-1">
      <Text className="text-accent">{JSON.stringify(query.data, null, 2)}</Text>
    </View>
  );
}
