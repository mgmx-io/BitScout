import { Component, type PropsWithChildren } from "react";
import { Text, View } from "react-native";

type State = {
  hasError: boolean;
};

function Fallback() {
  return (
    <View className="m-safe bg-background flex-1 p-4">
      <Text className="text-foreground text-2xl font-bold">Congrats!</Text>
      <Text className="text-foreground">
        You managed to break the app. Please restart it.
      </Text>
    </View>
  );
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.error("Unhandled error caught by ErrorBoundary:", error);
  }

  public render() {
    if (this.state.hasError) return <Fallback />;
    return this.props.children;
  }
}

export default ErrorBoundary;
