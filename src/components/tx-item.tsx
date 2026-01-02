import { Tx } from "@/types/api";
import { Text, View } from "react-native";

type Props = Tx;

export function TxItem(props: Props) {
  const { txid } = props;

  return (
    <View className="p-4">
      <Text className="text-foreground">{txid}</Text>
    </View>
  );
}
