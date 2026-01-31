import { useWallets } from "@/hooks/use-wallets";
import { useAppStore } from "@/stores";
import { Feedback } from "@/utils";
import { Button } from "heroui-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "./bottom-sheet";
import Icon from "./icon";
import { SelectableItem } from "./selectable-item";

export function WalletSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectWallet, createWallet } = useAppStore();
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.selected)!;

  const handleSelect = (walletId: string) => {
    Feedback.selection();
    selectWallet(walletId);
    setIsOpen(false);
  };

  const handleCreateWallet = () => {
    Feedback.selection();
    createWallet();
    setIsOpen(false);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <TouchableOpacity
          onPress={Feedback.selection}
          className="bg-surface ml-4 h-8 flex-row items-center gap-2 rounded pr-2 pl-4 shadow-xs"
        >
          <Text className="text-foreground font-bold">{selected.name}</Text>
          <Icon.Material
            name="unfold-more"
            size={20}
            colorClassName="accent-foreground"
          />
        </TouchableOpacity>
      </BottomSheet.Trigger>

      <BottomSheet.Portal>
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg">
              Select a wallet
            </Text>
            <View className="gap-2">
              {wallets.map((wallet) => (
                <SelectableItem
                  key={wallet.id}
                  isSelected={wallet.selected}
                  onPress={() => handleSelect(wallet.id)}
                >
                  <SelectableItem.Label>{wallet.name}</SelectableItem.Label>
                  <SelectableItem.Indicator isSelected={wallet.selected} />
                </SelectableItem>
              ))}
            </View>

            <Button variant="tertiary" onPress={handleCreateWallet}>
              <Icon.Material
                name="add"
                size={20}
                colorClassName="accent-foreground"
              />
              <Button.Label>New wallet</Button.Label>
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
