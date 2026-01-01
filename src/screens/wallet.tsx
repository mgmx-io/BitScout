import { useGetAddresses } from "@/api/queries";
import { AddressCard } from "@/components/address-card";
import { AddressContext } from "@/components/address-context";
import { TrackAddress } from "@/components/track-address";
import { WalletHeader } from "@/components/wallet-header";
import { WalletSection } from "@/components/wallet-section";
import { usePreferencesStore } from "@/stores/preferences";
import { sortAddresses } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Divider, ScrollShadow } from "heroui-native";
import { SectionList, View } from "react-native";

export function Wallet() {
  const { sortField, sortOrder } = usePreferencesStore();
  const queries = useGetAddresses();
  const addresses = queries.map((q) => q.data).filter((a) => a !== undefined);
  const sorted = sortAddresses(addresses, sortField, sortOrder);
  const sections = [{ data: sorted }];

  return (
    <View className="pb-safe flex-1 px-4">
      <ScrollShadow
        LinearGradientComponent={LinearGradient}
        className="grow"
        visibility="bottom"
      >
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerClassName="grow pb-16"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <AddressContext {...item}>
              <AddressCard {...item} />
            </AddressContext>
          )}
          ListHeaderComponent={WalletHeader}
          renderSectionHeader={() => <WalletSection />}
          ItemSeparatorComponent={Divider}
        />
      </ScrollShadow>
      <TrackAddress />
    </View>
  );
}
