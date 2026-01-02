import { useGetAddress } from "@/api/queries";
import { useDisplayValue } from "@/hooks/use-display-value";
import { Address } from "@/types/misc";
import {
  compactAddress,
  computeBalance,
  computeTxCount,
  Feedback,
} from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "./icon";

type Props = Address;

export function AddressCard(props: Props) {
  const { address } = props;
  const { navigate } = useNavigation();
  const query = useGetAddress(address);
  const balance = computeBalance(query.data || null);
  const txCount = computeTxCount(query.data || null);
  const displayValue = useDisplayValue(balance);

  return (
    <TouchableOpacity
      className="flex-row items-center gap-4 p-4"
      delayLongPress={100}
      onLongPress={() => {}}
      onPress={() => {
        Feedback.selection();
        navigate("Address", { address });
      }}
    >
      <Icon
        name="account-balance-wallet"
        size={20}
        colorClassName="accent-foreground"
      />
      <Text className="text-foreground flex-1">{compactAddress(address)}</Text>
      <View className="items-end">
        <Text className="text-foreground font-bold">{displayValue}</Text>
        <Text className="text-foreground text-xs">{txCount} tx</Text>
      </View>
    </TouchableOpacity>
  );
}
