import { CurrencyPickerSheet } from "@/components/currency-picker-sheet";
import { DisplayUnitPickerSheet } from "@/components/display-unit-picker-sheet";
import Icon from "@/components/icon";
import { Feedback } from "@/utils";
import { Divider } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const currencyOptions = [
  { id: "USD", label: "US dollar (USD)" },
  { id: "EUR", label: "Euro (EUR)" },
  { id: "GBP", label: "Pound sterling (GBP)" },
  { id: "CAD", label: "Canadian dollar (CAD)" },
  { id: "CHF", label: "Swiss franc (CHF)" },
  { id: "AUD", label: "Australian dollar (AUD)" },
  { id: "JPY", label: "Japanese yen (JPY)" },
];

const displayUnitOptions = [
  { id: "btc", label: "BTC" },
  { id: "sats", label: "Sats" },
  { id: "fiat", label: "Fiat" },
];

export function Settings() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedDisplayUnit, setSelectedDisplayUnit] = useState("btc");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isDisplayUnitOpen, setIsDisplayUnitOpen] = useState(false);

  const selectedDisplayUnitLabel =
    displayUnitOptions.find((option) => option.id === selectedDisplayUnit)
      ?.label ?? selectedDisplayUnit;

  const handleCurrencyPress = () => {
    Feedback.selection();
    setIsCurrencyOpen(true);
  };

  const handleCurrencySelect = (id: string) => {
    setSelectedCurrency(id);
    setIsCurrencyOpen(false);
  };

  const handleDisplayUnitPress = () => {
    Feedback.selection();
    setIsDisplayUnitOpen(true);
  };

  const handleDisplayUnitSelect = (id: string) => {
    setSelectedDisplayUnit(id);
    setIsDisplayUnitOpen(false);
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
          <Text className="text-muted">{selectedCurrency}</Text>
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
        options={currencyOptions}
        selectedId={selectedCurrency}
        onSelect={handleCurrencySelect}
        title="Select currency"
      />
      <DisplayUnitPickerSheet
        isOpen={isDisplayUnitOpen}
        onOpenChange={setIsDisplayUnitOpen}
        options={displayUnitOptions}
        selectedId={selectedDisplayUnit}
        onSelect={handleDisplayUnitSelect}
        title="Select display unit"
      />
    </ScrollView>
  );
}
