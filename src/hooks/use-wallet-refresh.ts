import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useWalletRefresh() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["prices"] }),
        queryClient.invalidateQueries({ queryKey: ["address"] }),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  return {
    refresh,
    refreshing,
  };
}
