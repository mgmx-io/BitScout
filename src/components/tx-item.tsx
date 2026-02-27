import { useDisplayValue } from "@/hooks/use-display-value";
import { Tx } from "@/types/api";
import { Feedback, computeTxValue, formatDate } from "@/utils";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "./icon";

type Props = Tx & {
  address: string;
  onPress: (txId: string) => void;
};

export function TxItem(props: Props) {
  const { address, vin, vout, status, txid, onPress } = props;
  const value = computeTxValue(vin, vout, address).toNumber();
  const displayValue = useDisplayValue(value);
  const income = value > 0;

  const handlePress = () => {
    Feedback.selection();
    onPress(txid);
  };

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between gap-4 p-4"
      onPress={handlePress}
    >
      <Icon.Community
        name={income ? "arrow-collapse-down" : "arrow-expand-up"}
        size={20}
        colorClassName="accent-foreground"
      />
      <View className="flex-1">
        <Text className="text-foreground font-normal">
          {income ? "Received" : "Sent"}
        </Text>
        <Text className="text-muted text-xs font-normal">
          {formatDate(status.block_time)}
        </Text>
      </View>
      <Text className="text-foreground font-bold">{displayValue}</Text>
    </TouchableOpacity>
  );
}
