import { Feedback } from "@/utils";
import { BottomSheet } from "heroui-native";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
import Icon from "./icon";

type Option = {
  id: string;
  label: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  title: string;
};

export function DisplayUnitPickerSheet({
  isOpen,
  onOpenChange,
  options,
  selectedId,
  onSelect,
  title,
}: Props) {
  const handleSelect = (id: string) => {
    Feedback.selection();
    onSelect(id);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg font-bold">
              {title}
            </Text>
            <View className="gap-2">
              {options.map((option) => {
                const isSelected = option.id === selectedId;
                return (
                  <TouchableOpacity
                    key={option.id}
                    className={`flex-row items-center justify-between rounded-full px-4 py-3 ${
                      isSelected ? "bg-surface-secondary" : "bg-surface"
                    }`}
                    onPress={() => handleSelect(option.id)}
                  >
                    <Text className="text-foreground font-bold">
                      {option.label}
                    </Text>
                    {isSelected ? (
                      <Icon
                        name="check"
                        size={20}
                        colorClassName="accent-foreground"
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
