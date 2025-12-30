import { useGetAddress } from "@/api/queries";
import { Address } from "@/types/misc";
import { compactAddress, computeBalance, computeTxCount } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "./icon";

type Props = Address;

export function AddressCard(props: Props) {
  const { address } = props;
  const { navigate } = useNavigation();
  const query = useGetAddress(address);
  if (query.isPending || query.isError) return null;
  const balance = computeBalance(query.data);
  const txCount = computeTxCount(query.data);

  return (
    <TouchableOpacity
      className="flex-row items-center gap-4 p-4"
      onPress={() => navigate("Address")}
    >
      <Icon
        name="account-balance-wallet"
        size={18}
        colorClassName="accent-foreground"
      />
      <Text className="text-foreground flex-1">{compactAddress(address)}</Text>
      <View className="items-end">
        <Text className="text-foreground font-bold">{balance} sats</Text>
        <Text className="text-foreground text-xs">{txCount} tx</Text>
      </View>
    </TouchableOpacity>
  );
}
