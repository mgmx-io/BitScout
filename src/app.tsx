import "@/global.css";

import { Navigation } from "@/components/navigation";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function App() {
  return (
    <GestureHandlerRootView>
      <HeroUINativeProvider>
        <Navigation />
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
