import { useGetHistoricalPriceMutation } from "@/api/queries";
import { useBalance } from "@/hooks/use-balance";
import { useAppStore } from "@/stores";
import { useSnapshotStore } from "@/stores/snapshot";
import { useEffect, useRef } from "react";

export function useSnapshot() {
  const balance = useBalance();
  const selectedId = useAppStore((s) => s.selectedId);
  const addSnapshot = useSnapshotStore((s) => s.addSnapshot);
  const { mutate } = useGetHistoricalPriceMutation();
  const prevBalance = useRef<number | null>(null);
  const prevWalletId = useRef<string>(selectedId);

  useEffect(() => {
    // Reset when wallet changes
    if (prevWalletId.current !== selectedId) {
      prevBalance.current = null;
      prevWalletId.current = selectedId;
    }

    // Save if balance is loaded and different from previous
    if (balance !== null && balance !== prevBalance.current) {
      const timestamp = Math.floor(Date.now() / 1000);

      mutate(
        { timestamp },
        {
          onSuccess: ({ prices, exchangeRates }) => {
            addSnapshot({
              balance,
              prices: prices[0],
              rates: exchangeRates,
            });
            prevBalance.current = balance;
          },
          onError: (error) => {
            console.error("Failed to fetch historical price:", error);
          },
        },
      );
    }
  }, [balance, selectedId, addSnapshot, mutate]);
}
