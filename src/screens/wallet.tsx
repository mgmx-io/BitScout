import { AddressCard } from "@/components/address-card";
import { useAddresses } from "@/hooks/use-addresses";
import { useNavigation } from "@react-navigation/native";
import { Button } from "heroui-native";
import { FlatList, View } from "react-native";

export function Wallet() {
  const addresses = useAddresses();
  const { navigate } = useNavigation();

  return (
    <View className="pb-safe flex-1 px-4">
      <FlatList
        data={addresses}
        renderItem={({ item }) => <AddressCard {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="grow mt-4 gap-4"
      />
      <Button onPress={() => navigate("Track")}>Track Address</Button>
    </View>
  );
}
