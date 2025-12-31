import { AddressCard } from "@/components/address-card";
import { AddressContext } from "@/components/address-context";
import { TrackAddress } from "@/components/track-address";
import { WalletHeader } from "@/components/wallet-header";
import { useAddresses } from "@/hooks/use-addresses";
import { Divider } from "heroui-native";
import { FlatList, View } from "react-native";

export function Wallet() {
  const addresses = useAddresses();

  return (
    <View className="pb-safe flex-1 px-4">
      <FlatList
        data={addresses}
        contentContainerClassName="grow"
        renderItem={({ item }) => (
          <AddressContext {...item}>
            <AddressCard {...item} />
          </AddressContext>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={WalletHeader}
        ItemSeparatorComponent={Divider}
      />
      <TrackAddress />
    </View>
  );
}
