import { useDisplayValue } from "@/hooks/use-display-value";
import { Tx } from "@/types/api";
import { computeTxValue, formatDate } from "@/utils";
import { Text, View } from "react-native";
import Icon2 from "./icon2";

type Props = Tx & { address: string };

export function TxItem(props: Props) {
  const { address, vin, vout, status } = props;
  const value = computeTxValue(vin, vout, address).toNumber();
  const displayValue = useDisplayValue(value);
  const income = value > 0;

  return (
    <View className="flex-row items-center justify-between gap-4 p-4">
      <Icon2
        name={income ? "arrow-collapse-down" : "arrow-expand-up"}
        size={20}
        colorClassName="accent-foreground"
      />
      <View className="flex-1">
        <Text className="text-foreground">{income ? "Received" : "Sent"}</Text>
        <Text className="text-muted text-xs">
          {formatDate(status.block_time)}
        </Text>
      </View>
      <Text className="text-foreground font-bold">{displayValue}</Text>
    </View>
  );
}
