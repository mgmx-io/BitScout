import "@/global.css";

import { Navigation } from "@/components/navigation";
import { QueryProvider } from "@/components/query-provider";
import { useFocusManager } from "@/hooks/use-focus-manager";
import { useOnlineManager } from "@/hooks/use-online-manager";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function App() {
  useFocusManager();
  useOnlineManager();

  return (
    <GestureHandlerRootView>
      <HeroUINativeProvider>
        <QueryProvider>
          <Navigation />
        </QueryProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
