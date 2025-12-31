import { BottomSheet } from "heroui-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetBlurOverlay } from "./blur-overlay";
import Icon from "./icon";

type SortField = "balance" | "txCount";
type SortOrder = "asc" | "desc";

const sortOptions: {
  id: SortField;
  label: string;
}[] = [
  {
    id: "balance",
    label: "Balance amount",
  },
  {
    id: "txCount",
    label: "Transaction count",
  },
];

export function WalletSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<SortField>("balance");
  const [selectedOrder, setSelectedOrder] = useState<SortOrder>("desc");

  const handleSelect = (field: SortField) => {
    if (selectedField === field) {
      setSelectedOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSelectedField(field);
    setSelectedOrder("desc");
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <View className="bg-background flex-row items-center justify-between px-4 py-2">
        <Text className="text-foreground text-lg font-bold">Addresses</Text>
        <BottomSheet.Trigger asChild>
          <TouchableOpacity className="bg-surface h-8 w-12 items-center justify-center rounded">
            <Icon name="sort" size={20} colorClassName="accent-foreground" />
          </TouchableOpacity>
        </BottomSheet.Trigger>
      </View>

      <BottomSheet.Portal>
        <BottomSheetBlurOverlay />
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg font-bold">
              Sort by
            </Text>

            <View className="gap-2">
              {sortOptions.map((option) => {
                const isSelected = selectedField === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    className={`flex-row items-center justify-between rounded-full px-4 py-3 ${
                      isSelected ? "bg-field" : "bg-surface"
                    }`}
                    onPress={() => handleSelect(option.id)}
                  >
                    <Text className="text-foreground font-bold">
                      {option.label}
                    </Text>
                    {isSelected && (
                      <Icon
                        name={selectedOrder === "asc" ? "north" : "south"}
                        size={20}
                        colorClassName="accent-foreground"
                      />
                    )}
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
