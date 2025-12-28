import { useAdapter } from "@/hooks/use-adapter";
import Root from "@/navigation/root";
import { createStaticNavigation } from "@react-navigation/native";

const Container = createStaticNavigation(Root);

export function Navigation() {
  const theme = useAdapter();
  return <Container theme={theme} />;
}
