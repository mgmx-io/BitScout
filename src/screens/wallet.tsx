import { useGetAddresses } from "@/api/queries";
import { AddressCard } from "@/components/address-card";
import { AddressContext } from "@/components/address-context";
import { TrackAddress } from "@/components/track-address";
import { WalletEmpty } from "@/components/wallet-empty";
import { WalletHeader } from "@/components/wallet-header";
import { WalletSection } from "@/components/wallet-section";
import { useWalletRefresh } from "@/hooks/use-wallet-refresh";
import { usePreferencesStore } from "@/stores/preferences";
import { FullAddress } from "@/types/misc";
import { sortAddresses } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollShadow, Separator } from "heroui-native";
import { useCallback } from "react";
import { ListRenderItem, SectionList, View } from "react-native";

export function Wallet() {
  const { sortField, sortOrder } = usePreferencesStore();
  const { refresh, refreshing } = useWalletRefresh();
  const addresses = useGetAddresses();
  const sorted = sortAddresses(addresses, sortField, sortOrder);
  const sections = [{ data: sorted }];
  const empty = addresses.length === 0;

  const renderItem: ListRenderItem<FullAddress> = useCallback(
    ({ item }) => (
      <AddressContext {...item}>
        <AddressCard {...item} />
      </AddressContext>
    ),
    [],
  );

  let render;

  if (empty) {
    render = <WalletEmpty />;
  } else {
    render = (
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerClassName="grow pb-16"
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListHeaderComponent={WalletHeader}
        renderSectionHeader={() => <WalletSection />}
        ItemSeparatorComponent={Separator}
        refreshing={refreshing}
        onRefresh={refresh}
      />
    );
  }

  return (
    <View className="pb-safe flex-1 px-4">
      <ScrollShadow
        LinearGradientComponent={LinearGradient}
        className="grow"
        visibility="bottom"
      >
        {render}
      </ScrollShadow>
      <TrackAddress />
    </View>
  );
}
