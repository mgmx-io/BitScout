import { useValidateAddress } from "@/api/queries";
import { useAppStore } from "@/stores";
import { compactAddress, Feedback } from "@/utils";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import { BottomSheet, Button, Spinner, useToast } from "heroui-native";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
import Icon from "./icon";

export function TrackAddress() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { trackAddress } = useAppStore();
  const { mutate, isPending } = useValidateAddress();
  const { toast } = useToast();
  const isEmpty = useMemo(() => value.trim().length === 0, [value]);

  const handleError = (error: string) => {
    toast.show({
      variant: "default",
      label: error,
      icon: <Icon name="error" size={20} colorClassName="accent-danger" />,
      onShow: () => {
        Feedback.error();
        setValue("");
      },
    });
  };

  const handleSuccess = (addr: string) => {
    trackAddress(addr);
    setIsOpen(false);
    setValue("");
    toast.show({
      variant: "default",
      label: "Address added",
      description: addr,
      icon: <Icon name="check" size={20} colorClassName="accent-success" />,
      onShow: () => {
        Feedback.success();
        setValue("");
      },
    });
  };

  const submitAddress = (addrRaw: string) => {
    const addr = addrRaw.trim();
    if (!addr) return;

    mutate(addr, {
      onSuccess({ isvalid }) {
        if (isvalid) {
          handleSuccess(addr);
        } else {
          handleError("Invalid address");
        }
      },
      onError() {
        handleError("Unable to verify address");
      },
    });
  };

  const handleSubmit = () => submitAddress(value);

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    setValue(text);
    submitAddress(text);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <Button
          onPress={Feedback.selection}
          className="absolute right-4 bottom-4 z-10"
          variant="tertiary"
        >
          <Icon name="add" size={20} colorClassName="accent-foreground" />
          <Button.Label>Address</Button.Label>
        </Button>
      </BottomSheet.Trigger>

      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg">
              Enter a public Bitcoin address
            </Text>
            <View className="bg-field h-12 flex-row items-center rounded-full pr-2 pl-4">
              <BottomSheetTextInput
                value={value}
                onChangeText={setValue}
                className="text-field-foreground flex-1"
                placeholder={compactAddress(
                  "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
                )}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={handleSubmit}
              />
              <TouchableOpacity
                className="bg-surface aspect-square h-10 items-center justify-center rounded-full px-2"
                onPress={handlePaste}
                disabled={isPending}
              >
                <Icon
                  name="content-paste"
                  size={20}
                  colorClassName="accent-field-placeholder"
                />
              </TouchableOpacity>
            </View>
            <Button
              variant="tertiary"
              onPress={handleSubmit}
              isDisabled={isPending || isEmpty}
            >
              {isPending ? <Spinner /> : "Submit"}
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
