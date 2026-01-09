import { Tx } from "@/types/api";
import { BottomSheet } from "heroui-native";
import { Text, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";

type Props = {
  tx?: Tx | null;
  setSelectedTx: (tx: Tx | null) => void;
};

export function TxDetail(props: Props) {
  const { tx, setSelectedTx } = props;
  const isOpen = Boolean(tx);

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedTx(null);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={handleOpenChange}>
      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-1 px-4 py-6">
            <Text className="text-foreground text-xl font-bold">
              Transaction detail
            </Text>
            <Text className="text-muted text-xs">{tx?.txid}</Text>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
