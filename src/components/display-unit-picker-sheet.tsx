import { usePreferencesStore } from "@/stores/preferences";
import { DisplayUnit } from "@/types/misc";
import { Feedback, UNITS } from "@/utils";
import { BottomSheet } from "heroui-native";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
import Icon from "./icon";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DisplayUnitPickerSheet({ isOpen, onOpenChange }: Props) {
  const { displayUnit, fiatCurrency, setDisplayUnit } = usePreferencesStore();

  const handleSelect = (id: DisplayUnit) => {
    Feedback.selection();
    setDisplayUnit(id);
    onOpenChange(false);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg font-bold">
              Select display unit
            </Text>
            <View className="gap-2">
              {UNITS.map((option) => {
                const isSelected = option === displayUnit;
                return (
                  <TouchableOpacity
                    key={option}
                    className={`flex-row items-center justify-between rounded-full px-4 py-3 ${
                      isSelected ? "bg-surface-secondary" : "bg-surface"
                    }`}
                    onPress={() => handleSelect(option)}
                  >
                    <Text className="text-foreground font-bold">
                      {option === "fiat" ? fiatCurrency : option}
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
