import { useAddresses } from "@/hooks/use-addresses";
import { usePreferencesStore } from "@/stores/preferences";
import { SortField } from "@/types/misc";
import { Feedback } from "@/utils";
import { Chip } from "heroui-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "./bottom-sheet";
import Icon from "./icon";
import { SelectableItem } from "./selectable-item";

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
  const addresses = useAddresses();
  const { sortField, sortOrder, selectSortField, toggleSortOrder } =
    usePreferencesStore();

  const handleSelect = (field: SortField) => {
    Feedback.selection();

    if (sortField === field) {
      toggleSortOrder();
      return;
    }

    selectSortField(field);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <View className="bg-background flex-row items-center justify-between px-4 py-2">
        <View className="flex-row items-center">
          <Text className="text-foreground font-bold">Addresses</Text>
          <Chip variant="tertiary">
            <Chip.Label>{addresses.length}</Chip.Label>
          </Chip>
        </View>
        <BottomSheet.Trigger asChild>
          <TouchableOpacity
            onPress={Feedback.selection}
            className="bg-surface h-8 w-12 items-center justify-center rounded shadow-xs"
          >
            <Icon name="sort" size={20} colorClassName="accent-foreground" />
          </TouchableOpacity>
        </BottomSheet.Trigger>
      </View>

      <BottomSheet.Portal>
        <BottomSheet.Content backgroundClassName="bg-surface">
          <View className="gap-4">
            <Text className="text-foreground px-4 text-lg font-bold">
              Sort by
            </Text>

            <View className="gap-2">
              {sortOptions.map((option) => {
                const isSelected = sortField === option.id;
                return (
                  <SelectableItem
                    key={option.id}
                    isSelected={isSelected}
                    onPress={() => handleSelect(option.id)}
                  >
                    <SelectableItem.Label>{option.label}</SelectableItem.Label>
                    <SelectableItem.Indicator
                      isSelected={isSelected}
                      icon={sortOrder === "asc" ? "north" : "south"}
                    />
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
