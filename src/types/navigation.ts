import Root from "@/navigation/root";
import type { StaticParamList } from "@react-navigation/native";

type RootStackParamList = StaticParamList<typeof Root>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
