import { useGetTx } from "@/api/queries";
import { Feedback, formatDate } from "@/utils";
import * as Clipboard from "expo-clipboard";
import { BottomSheet, Divider, useToast } from "heroui-native";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
import Icon from "./icon";
import Icon2 from "./icon2";

type Props = {
  txId: string | null;
  setSelectedTxId: (txId: string | null) => void;
};

export function TxDetail(props: Props) {
  const { txId, setSelectedTxId } = props;
  const { toast } = useToast();
  const query = useGetTx(txId);
  const isOpen = Boolean(txId);
  const tx = query.data;

  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedTxId(null);
  };

  const handleCopyTxId = async () => {
    if (!txId) return;
    Feedback.selection();
    await Clipboard.setStringAsync(txId);
    toast.show({
      variant: "default",
      label: "ID copied to clipboard",
      icon: <Icon name="check" size={20} colorClassName="accent-success" />,
    });
  };

  const handleOpenExplorer = async () => {
    if (!txId) return;
    Feedback.selection();
    const url = `https://mempool.space/tx/${txId}`;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) throw new Error("Cannot open URL");
      await Linking.openURL(url);
    } catch {
      toast.show({
        variant: "default",
        label: "Unable to open explorer",
        description: url,
        icon: <Icon name="error" size={20} colorClassName="accent-danger" />,
      });
    }
  };

  const statusLabel = tx
    ? tx.status.confirmed
      ? `Confirmed · Block ${tx.status.block_height ?? "?"}`
      : "Pending confirmation"
    : undefined;

  const blockTimeLabel = tx
    ? tx.status.block_time
      ? formatDate(tx.status.block_time)
      : tx.status.confirmed
        ? "Unknown time"
        : "Awaiting confirmation"
    : undefined;

  const feeLabel = tx ? `${tx.fee} sats` : undefined;

  const sizeLabel = tx ? `${tx.size} bytes` : undefined;

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={handleOpenChange}>
      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4 p-4">
            <View className="gap-2">
              <Text className="text-foreground text-xl font-bold">
                Transaction detail
              </Text>
              <Text className="text-muted text-xs">{txId}</Text>
            </View>

            <View className="bg-surface-secondary gap-2 rounded p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-muted text-xs">Status</Text>
                <Text className="text-foreground text-sm font-semibold">
                  {statusLabel}
                </Text>
              </View>
              <Divider />
              <View className="flex-row items-center justify-between">
                <Text className="text-muted text-xs">Confirmed at</Text>
                <Text className="text-foreground text-sm font-semibold">
                  {blockTimeLabel}
                </Text>
              </View>
              <Divider />
              <View className="flex-row items-center justify-between">
                <Text className="text-muted text-xs">Fee</Text>
                <Text className="text-foreground text-sm font-semibold">
                  {feeLabel}
                </Text>
              </View>
              <Divider />
              <View className="flex-row items-center justify-between">
                <Text className="text-muted text-xs">Size</Text>
                <Text className="text-foreground text-sm font-semibold">
                  {sizeLabel}
                </Text>
              </View>
            </View>

            <View className="gap-2">
              <TouchableOpacity
                className="bg-surface-secondary flex-row items-center gap-2 rounded-full p-2"
                onPress={handleCopyTxId}
              >
                <View className="bg-surface items-center justify-center rounded-full p-2">
                  <Icon2
                    name="content-copy"
                    size={20}
                    colorClassName="accent-foreground"
                  />
                </View>
                <Text className="text-foreground font-bold">Copy ID</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-surface-secondary flex-row items-center gap-2 rounded-full p-2"
                onPress={handleOpenExplorer}
              >
                <View className="bg-surface items-center justify-center rounded-full p-2">
                  <Icon2
                    name="apple-safari"
                    size={20}
                    colorClassName="accent-foreground"
                  />
                </View>
                <Text className="text-foreground font-bold">
                  View in explorer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
