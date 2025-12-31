import { useWallets } from "@/hooks/use-wallets";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./icon";

export function WalletSwitch() {
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.selected)!;

  return (
    <TouchableOpacity className="bg-surface ml-4 h-8 flex-row items-center gap-2 rounded pr-2 pl-4">
      <Text className="text-foreground font-bold">{selected.name}</Text>
      <Icon name="unfold-more" size={18} colorClassName="accent-foreground" />
    </TouchableOpacity>
  );
}
