import "@/global.css";

import { Navigation } from "@/components/navigation";
import { QueryProvider } from "@/components/query-provider";
import { useFocusManager } from "@/hooks/use-focus-manager";
import { useOnlineManager } from "@/hooks/use-online-manager";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaListener,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

export function App() {
  useFocusManager();
  useOnlineManager();

  return (
    <GestureHandlerRootView>
      <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
        <SafeAreaProvider>
          <HeroUINativeProvider>
            <QueryProvider>
              <Navigation />
            </QueryProvider>
          </HeroUINativeProvider>
        </SafeAreaProvider>
      </SafeAreaListener>
    </GestureHandlerRootView>
  );
}
