import { focusManager } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState } from "react-native";

export function useFocusManager() {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      focusManager.setFocused(status === "active");
    });
    return subscription.remove;
  }, []);
}
