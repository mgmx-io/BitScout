import "@/global.css";

import { ErrorBoundary } from "@/components/error-boundary";
import { Navigation } from "@/components/navigation";
import { QueryProvider } from "@/components/query-provider";
import { useFocusManager } from "@/hooks/use-focus-manager";
import { useOnlineManager } from "@/hooks/use-online-manager";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function App() {
  useFocusManager();
  useOnlineManager();

  return (
    <ErrorBoundary>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <HeroUINativeProvider>
            <QueryProvider>
              <Navigation />
            </QueryProvider>
          </HeroUINativeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
