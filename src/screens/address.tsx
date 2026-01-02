import { useGetTxs } from "@/api/queries";
import { StaticScreenProps } from "@react-navigation/native";
import { Text, View } from "react-native";

type Props = StaticScreenProps<{ address: string }>;

export function Address(props: Props) {
  const { address } = props.route.params;
  const query = useGetTxs(address);
  const data = query.data?.pages.flat();
  console.log(JSON.stringify(data, null, 2));

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-accent">Address</Text>
    </View>
  );
}
