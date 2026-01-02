import { Text, View } from "react-native";

type Props = {
  title: string;
};

export function AddressSection(props: Props) {
  const { title } = props;

  return (
    <View className="bg-background p-4">
      <Text className="text-foreground font-bold">{title}</Text>
    </View>
  );
}
