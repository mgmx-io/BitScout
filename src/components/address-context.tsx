import * as ContextMenu from "@/components/context-menu";
import { useAppStore } from "@/stores";
import { Address } from "@/types/misc";
import * as Clipboard from "expo-clipboard";
import { useToast } from "heroui-native";
import { PropsWithChildren } from "react";
import { Linking, Text, View } from "react-native";
import Icon from "./icon";

type Props = Address;

export function AddressContext(props: PropsWithChildren<Props>) {
  const { id, address, children } = props;
  const { toast } = useToast();
  const { removeAddress } = useAppStore();

  const handleExplorer = async () => {
    const url = `https://mempool.space/address/${address}`;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        throw new Error("Cannot open URL");
      }
      await Linking.openURL(url);
    } catch {
      toast.show({
        variant: "default",
        label: "Unable to open explorer",
        description: url,
        icon: <Icon name="error" size={24} colorClassName="accent-danger" />,
      });
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(address);
    toast.show({
      variant: "default",
      label: "Address copied to clipboard!",
      description: address,
      icon: <Icon name="check" size={24} colorClassName="accent-success" />,
    });
  };

  const handleRemove = () => {
    removeAddress(id);
    toast.show({
      variant: "default",
      label: "Address removed!",
      description: address,
      icon: <Icon name="check" size={24} colorClassName="accent-success" />,
    });
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Preview>
          <View className="bg-surface p-4">
            <Text className="text-foreground font-bold">{address}</Text>
          </View>
        </ContextMenu.Preview>
        <ContextMenu.Item key="copy-address" onSelect={handleCopy}>
          <ContextMenu.ItemIcon ios={{ name: "clipboard" }} />
          <ContextMenu.ItemTitle>Copy address</ContextMenu.ItemTitle>
        </ContextMenu.Item>
        <ContextMenu.Item key="open-explorer" onSelect={handleExplorer}>
          <ContextMenu.ItemIcon ios={{ name: "safari" }} />
          <ContextMenu.ItemTitle>View in explorer</ContextMenu.ItemTitle>
        </ContextMenu.Item>
        <ContextMenu.Item
          key="remove-address"
          destructive
          onSelect={handleRemove}
        >
          <ContextMenu.ItemIcon ios={{ name: "trash" }} />
          <ContextMenu.ItemTitle>Remove address</ContextMenu.ItemTitle>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
