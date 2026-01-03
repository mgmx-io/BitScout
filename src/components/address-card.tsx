import { useDisplayValue } from "@/hooks/use-display-value";
import { FullAddress } from "@/types/misc";
import {
  compactAddress,
  computeBalance,
  computeTxCount,
  Feedback,
} from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "heroui-native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon2 from "./icon2";

type Props = FullAddress;

export function AddressCard(props: Props) {
  const { id, address, query } = props;
  const { navigate } = useNavigation();
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
        navigate("Address", { address, addressId: id });
      }}
    >
      <Icon2 name="wallet" size={20} colorClassName="accent-foreground" />
      <Text className="text-foreground flex-1">{compactAddress(address)}</Text>
      <View className="items-end gap-1">
        <Skeleton
          isLoading={displayValue === null}
          className="h-4 w-24 rounded"
        >
          <View className="h-4">
            <Text className="text-foreground font-bold">{displayValue}</Text>
          </View>
        </Skeleton>
        <Skeleton isLoading={txCount === null} className="h-4 w-12 rounded">
          <View className="h-4">
            <Text className="text-muted text-sm">{txCount} tx</Text>
          </View>
        </Skeleton>
      </View>
    </TouchableOpacity>
  );
}
