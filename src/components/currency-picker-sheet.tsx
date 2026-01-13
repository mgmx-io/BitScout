import { usePreferencesStore } from "@/stores/preferences";
import { FiatCurrency } from "@/types/misc";
import { Feedback } from "@/utils";
import { BottomSheet } from "heroui-native";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
import Icon from "./icon";

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
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg font-bold">
              Select currency
            </Text>
            <View className="gap-2">
              {currencyOptions.map((option) => {
                const isSelected = option.id === fiatCurrency;
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
