import { useWallets } from "@/hooks/use-wallets";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./icon";

export function WalletSwitch() {
  const wallets = useWallets();
  const selected = wallets.find((wallet) => wallet.selected)!;

  return (
    <TouchableOpacity className="flex-row items-center gap-2 pr-2 pl-4">
      <Text className="text-foreground font-bold">{selected.name}</Text>
      <Icon name="unfold-more" size={18} colorClassName="accent-foreground" />
    </TouchableOpacity>
  );
}
