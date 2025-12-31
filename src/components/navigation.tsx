import { useAdapter } from "@/hooks/use-adapter";
import Root from "@/navigation/root";
import { createStaticNavigation } from "@react-navigation/native";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

const Container = createStaticNavigation(Root);

export function Navigation() {
  const theme = useAdapter();
  return (
    <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
      <Container theme={theme} />
    </SafeAreaListener>
  );
}
