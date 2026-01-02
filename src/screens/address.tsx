import { useGetTxs } from "@/api/queries";
import { AddressSection } from "@/components/address-section";
import { TxItem } from "@/components/tx-item";
import { groupTxs } from "@/utils";
import { StaticScreenProps } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Divider, ScrollShadow, Spinner, useThemeColor } from "heroui-native";
import { SectionList, View } from "react-native";

type Props = StaticScreenProps<{ address: string; addressId: string }>;

export function Address(props: Props) {
  const { address } = props.route.params;
  const query = useGetTxs(address);
  const data = query.data?.pages.flat();
  const sections = groupTxs(data);
  const foreground = useThemeColor("foreground");

  const handleEndReached = () => {
    if (!query.data) return;
    if (query.isError) return;
    if (query.isPending) return;
    if (!query.hasNextPage) return;
    if (query.isFetchingNextPage) return;
    query.fetchNextPage();
  };

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
            return (
              <Spinner className="self-center">
                <Spinner color={foreground} size="lg" />
              </Spinner>
            );
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
        />
      </ScrollShadow>
    </View>
  );
}
