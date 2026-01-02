import { useDisplayValue } from "@/hooks/use-display-value";
import { Tx } from "@/types/api";
import { computeTxValue } from "@/utils";
import { Text, View } from "react-native";

type Props = Tx & { address: string };

export function TxItem(props: Props) {
  const { address, vin, vout } = props;
  const value = computeTxValue(vin, vout, address);
  const displayValue = useDisplayValue(value.toNumber());

  return (
    <View className="p-4">
      <Text className="text-foreground">{displayValue}</Text>
    </View>
  );
}
