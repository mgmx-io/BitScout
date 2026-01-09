import { BottomSheet } from "heroui-native";
import { Text, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";

type Props = {
  txId?: string | null;
  setSelectedTxId: (txId: string | null) => void;
};

export function TxDetail(props: Props) {
  const { txId, setSelectedTxId } = props;
  const isOpen = Boolean(txId);

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedTxId(null);
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
            <Text className="text-muted text-xs">{txId}</Text>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
