import { useWallets } from "@/hooks/use-wallets";
import { useAppStore } from "@/stores";
import { BottomSheet, Button } from "heroui-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
import Icon from "./icon";

export function WalletSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectWallet, createWallet } = useAppStore();
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.selected)!;

  const handleSelect = (walletId: string) => {
    selectWallet(walletId);
    setIsOpen(false);
  };

  const handleCreateWallet = () => {
    createWallet();
    setIsOpen(false);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <TouchableOpacity className="bg-surface ml-4 h-8 flex-row items-center gap-2 rounded pr-2 pl-4">
          <Text className="text-foreground font-bold">{selected.name}</Text>
          <Icon
            name="unfold-more"
            size={18}
            colorClassName="accent-foreground"
          />
        </TouchableOpacity>
      </BottomSheet.Trigger>

      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg">
              Select a wallet
            </Text>
            <View className="gap-2">
              {wallets.map((wallet) => (
                <TouchableOpacity
                  key={wallet.id}
                  className={`flex-row items-center justify-between rounded-full px-4 py-3 ${
                    wallet.selected ? "bg-field" : "bg-surface"
                  }`}
                  onPress={() => handleSelect(wallet.id)}
                >
                  <Text className="text-foreground font-bold">
                    {wallet.name}
                  </Text>
                  {wallet.selected && (
                    <Icon
                      name="check"
                      size={18}
                      colorClassName="accent-foreground"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <Button variant="tertiary" onPress={handleCreateWallet}>
              <Icon name="add" size={18} colorClassName="accent-foreground" />
              <Button.Label>New wallet</Button.Label>
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
