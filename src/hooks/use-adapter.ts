import { DefaultTheme } from "@react-navigation/native";
import { useThemeColor } from "heroui-native";
import { useUniwind } from "uniwind";

export function useAdapter(): ReactNavigation.Theme {
  const { theme } = useUniwind();
  const primary = useThemeColor("accent");
  const text = useThemeColor("foreground");
  const background = useThemeColor("background");
  const card = useThemeColor("surface");
  const border = useThemeColor("border");

  return {
    colors: {
      background,
      primary,
      border,
      card,
      text,
      notification: primary,
    },
    dark: theme === "dark",
    fonts: DefaultTheme.fonts,
  };
}
