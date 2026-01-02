import { Feedback } from "@/utils";
import { BottomSheet } from "heroui-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
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

export function AddressMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const optionPress = () => {
    Feedback.selection();
    setIsOpen(false);
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
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg font-bold">
              Address options
            </Text>
            <View className="gap-2">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  className="bg-field flex-row items-center gap-3 rounded-full px-4 py-3"
                  onPress={optionPress}
                >
                  <View className="bg-surface h-10 w-10 items-center justify-center rounded-full">
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
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
