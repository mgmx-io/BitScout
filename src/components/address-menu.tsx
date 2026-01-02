import { useAppStore } from "@/stores";
import { Feedback } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { BottomSheet, useToast } from "heroui-native";
import { useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
import Icon from "./icon";
import Icon2 from "./icon2";

const options = [
  {
    id: "copy",
    label: "Copy Address",
    icon: "content-copy",
  },
  {
    id: "explorer",
    label: "View in explorer",
    icon: "apple-safari",
  },
  {
    id: "remove",
    label: "Remove Address",
    icon: "delete-outline",
  },
] as const;

type OptionId = (typeof options)[number]["id"];

type Props = {
  address: string;
  addressId: string;
};

export function AddressMenu(props: Props) {
  const { address, addressId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { removeAddress } = useAppStore();
  const { goBack } = useNavigation();

  const handleCopy = async () => {
    Feedback.selection();
    await Clipboard.setStringAsync(address);
    toast.show({
      variant: "default",
      label: "Address copied to clipboard!",
      icon: <Icon name="check" size={20} colorClassName="accent-success" />,
    });
    setIsOpen(false);
  };

  const handleExplorer = async () => {
    Feedback.selection();
    const url = `https://mempool.space/address/${address}`;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        throw new Error("Cannot open URL");
      }
      await Linking.openURL(url);
      setIsOpen(false);
    } catch {
      toast.show({
        variant: "default",
        label: "Unable to open explorer",
        description: url,
        icon: <Icon name="error" size={20} colorClassName="accent-danger" />,
      });
      setIsOpen(false);
    }
  };

  const handleRemove = () => {
    Feedback.selection();
    removeAddress(addressId);
    toast.show({
      variant: "default",
      label: "Address removed!",
      icon: <Icon name="check" size={20} colorClassName="accent-success" />,
    });
    setIsOpen(false);
    goBack();
  };

  const optionHandlers = {
    copy: handleCopy,
    explorer: handleExplorer,
    remove: handleRemove,
  };

  const handleOptionPress = (id: OptionId) => () => {
    void optionHandlers[id]?.();
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <TouchableOpacity
          onPress={Feedback.selection}
          className="aspect-square h-full items-center justify-center"
        >
          <Icon2
            name="dots-vertical"
            size={20}
            colorClassName="accent-foreground"
          />
        </TouchableOpacity>
      </BottomSheet.Trigger>

      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-2">
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                className="bg-field flex-row items-center gap-2 rounded-full p-2"
                onPress={handleOptionPress(option.id)}
              >
                <View className="bg-surface items-center justify-center rounded-full p-2">
                  <Icon2
                    name={option.icon}
                    size={20}
                    colorClassName="accent-foreground"
                  />
                </View>
                <Text className="text-foreground font-bold">
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
