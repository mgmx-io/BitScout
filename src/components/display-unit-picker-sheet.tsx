import { usePreferencesStore } from "@/stores/preferences";
import { DisplayUnit } from "@/types/misc";
import { Feedback, UNITS } from "@/utils";
import { Separator } from "heroui-native";
import { Text, View } from "react-native";
import { BottomSheet } from "./bottom-sheet";
import { SelectableItem } from "./selectable-item";

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
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 font-bold">
              Select display unit
            </Text>
            <Separator />
            <View className="gap-2">
              {UNITS.map((option) => {
                const isSelected = option === displayUnit;
                return (
                  <SelectableItem
                    key={option}
                    isSelected={isSelected}
                    onPress={() => handleSelect(option)}
                  >
                    <SelectableItem.Label>
                      {option === "fiat" ? fiatCurrency : option}
                    </SelectableItem.Label>
                    <SelectableItem.Indicator isSelected={isSelected} />
                  </SelectableItem>
                );
              })}
            </View>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
