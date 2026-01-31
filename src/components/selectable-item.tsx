import { ComponentProps, ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./icon";

type RootProps = {
  children: ReactNode;
  isSelected: boolean;
  onPress: () => void;
};

const Root = ({ children, isSelected, onPress }: RootProps) => (
  <TouchableOpacity
    className={`flex-row items-center justify-between rounded-full px-4 py-3 ${
      isSelected ? "bg-surface-secondary" : "bg-surface"
    }`}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const Label = ({ children }: { children: ReactNode }) => (
  <Text className="text-foreground font-bold">{children}</Text>
);

type IndicatorProps = {
  isSelected: boolean;
  icon?: ComponentProps<typeof Icon.Material>["name"];
};

const Indicator = ({ isSelected, icon = "check" }: IndicatorProps) =>
  isSelected ? (
    <Icon.Material name={icon} size={20} colorClassName="accent-foreground" />
  ) : null;

export const SelectableItem = Object.assign(Root, {
  Label,
  Indicator,
});
