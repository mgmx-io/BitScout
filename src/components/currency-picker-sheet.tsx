import { usePreferencesStore } from "@/stores/preferences";
import { FiatCurrency } from "@/types/api";
import { Feedback } from "@/utils";
import { Separator } from "heroui-native";
import { Text, View } from "react-native";
import { BottomSheet } from "./bottom-sheet";
import { SelectableItem } from "./selectable-item";

type Option = {
  id: FiatCurrency;
  label: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const currencyOptions: Option[] = [
  { id: "USD", label: "US dollar (USD)" },
  { id: "EUR", label: "Euro (EUR)" },
  { id: "GBP", label: "Pound sterling (GBP)" },
  { id: "CAD", label: "Canadian dollar (CAD)" },
  { id: "CHF", label: "Swiss franc (CHF)" },
  { id: "AUD", label: "Australian dollar (AUD)" },
  { id: "JPY", label: "Japanese yen (JPY)" },
];

export function CurrencyPickerSheet({ isOpen, onOpenChange }: Props) {
  const { fiatCurrency, setFiatCurrency } = usePreferencesStore();

  const handleSelect = (id: FiatCurrency) => {
    Feedback.selection();
    setFiatCurrency(id);
    onOpenChange(false);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 font-bold">
              Select currency
            </Text>
            <Separator />
            <View className="gap-2">
              {currencyOptions.map((option) => {
                const isSelected = option.id === fiatCurrency;
                return (
                  <SelectableItem
                    key={option.id}
                    isSelected={isSelected}
                    onPress={() => handleSelect(option.id)}
                  >
                    <SelectableItem.Label>{option.label}</SelectableItem.Label>
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
