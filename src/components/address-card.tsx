import { useGetAddress } from "@/api/queries";
import { Address } from "@/types/misc";
import { compactAddress, computeBalance, computeTxCount } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

type Props = Address;

export function AddressCard(props: Props) {
  const { address } = props;
  const query = useGetAddress(address);
  const { navigate } = useNavigation();
  if (query.isPending || query.isError) return null;
  const balance = computeBalance(query.data);
  const txCount = computeTxCount(query.data);

  return (
    <TouchableOpacity
      className="bg-surface border-border gap-4 rounded border-2 p-4"
      onPress={() => navigate("Address")}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-foreground">Address</Text>
        <Text className="text-foreground">{compactAddress(address)}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-foreground">Balance</Text>
        <Text className="text-foreground">{balance}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-foreground">Transactions</Text>
        <Text className="text-foreground">{txCount}</Text>
      </View>
    </TouchableOpacity>
  );
}
