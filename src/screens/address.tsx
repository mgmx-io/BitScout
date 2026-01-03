import { useGetTxs } from "@/api/queries";
import { AddressSection } from "@/components/address-section";
import Icon from "@/components/icon";
import { TxItem } from "@/components/tx-item";
import { groupTxs } from "@/utils";
import { StaticScreenProps } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Divider, ScrollShadow } from "heroui-native";
import { ActivityIndicator, SectionList, Text, View } from "react-native";

type Props = StaticScreenProps<{ address: string; addressId: string }>;

export function Address(props: Props) {
  const { address } = props.route.params;
  const query = useGetTxs(address);
  const data = query.data?.pages.flat();
  const sections = groupTxs(data);

  const handleEndReached = () => {
    if (!query.data) return;
    if (query.isError) return;
    if (query.isPending) return;
    if (!query.hasNextPage) return;
    if (query.isFetchingNextPage) return;
    query.fetchNextPage();
  };

  if (query.isPending) {
    return <ActivityIndicator size="large" className="flex-1" />;
  }

  if (query.isError) {
    return (
      <View className="flex-1 items-center justify-center gap-2">
        <View className="flex-row items-center gap-2">
          <Icon
            name="error-outline"
            colorClassName="accent-foreground"
            size={20}
          />
          <Text className="text-foreground text-lg font-bold">
            Unable to load transactions
          </Text>
        </View>
        <Button
          variant="tertiary"
          onPress={() => query.refetch()}
          isDisabled={query.isRefetching}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View className="pb-safe flex-1 px-4">
      <ScrollShadow
        LinearGradientComponent={LinearGradient}
        className="grow"
        visibility="bottom"
      >
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.txid}
          contentContainerClassName="grow"
          renderItem={({ item }) => <TxItem address={address} {...item} />}
          renderSectionHeader={({ section }) => (
            <AddressSection title={section.title} />
          )}
          ItemSeparatorComponent={Divider}
          ListFooterComponent={() => {
            if (!query.isFetchingNextPage) return null;
            return <ActivityIndicator />;
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
        />
      </ScrollShadow>
    </View>
  );
}
