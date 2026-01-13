import { CurrencyPickerSheet } from "@/components/currency-picker-sheet";
import { DisplayUnitPickerSheet } from "@/components/display-unit-picker-sheet";
import Icon from "@/components/icon";
import { usePreferencesStore } from "@/stores/preferences";
import { Feedback } from "@/utils";
import { Divider } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export function Settings() {
  const { displayUnit, fiatCurrency } = usePreferencesStore();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isDisplayUnitOpen, setIsDisplayUnitOpen] = useState(false);

  const selectedDisplayUnitLabel =
    displayUnit === "fiat" ? fiatCurrency : displayUnit;

  const handleCurrencyPress = () => {
    Feedback.selection();
    setIsCurrencyOpen(true);
  };

  const handleDisplayUnitPress = () => {
    Feedback.selection();
    setIsDisplayUnitOpen(true);
  };

  return (
    <ScrollView contentContainerClassName="grow p-4">
      <TouchableOpacity
        onPress={handleCurrencyPress}
        className="flex-row items-center justify-between px-2 py-4"
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-foreground font-bold">Fiat currency</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-muted">{fiatCurrency}</Text>
          <Icon
            name="chevron-right"
            size={20}
            colorClassName="accent-foreground"
          />
        </View>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity
        onPress={handleDisplayUnitPress}
        className="flex-row items-center justify-between px-2 py-4"
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-foreground font-bold">Display unit</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-muted">{selectedDisplayUnitLabel}</Text>
          <Icon
            name="chevron-right"
            size={20}
            colorClassName="accent-foreground"
          />
        </View>
      </TouchableOpacity>
      <CurrencyPickerSheet
        isOpen={isCurrencyOpen}
        onOpenChange={setIsCurrencyOpen}
      />
      <DisplayUnitPickerSheet
        isOpen={isDisplayUnitOpen}
        onOpenChange={setIsDisplayUnitOpen}
      />
    </ScrollView>
  );
}
