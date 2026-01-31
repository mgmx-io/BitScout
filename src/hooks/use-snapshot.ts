import { useBalance } from "@/hooks/use-balance";
import { useAppStore } from "@/stores";
import { useSnapshotStore } from "@/stores/snapshot";
import { useEffect, useRef } from "react";

export function useSnapshot() {
  const balance = useBalance();
  const selectedId = useAppStore((s) => s.selectedId);
  const addSnapshot = useSnapshotStore((s) => s.addSnapshot);
  const prevBalanceRef = useRef<number | null>(null);
  const prevWalletIdRef = useRef<string>(selectedId);

  useEffect(() => {
    // Reset when wallet changes
    if (prevWalletIdRef.current !== selectedId) {
      prevBalanceRef.current = null;
      prevWalletIdRef.current = selectedId;
    }

    // Save if balance is loaded and different from previous
    if (balance !== null && balance !== prevBalanceRef.current) {
      addSnapshot(balance);
      prevBalanceRef.current = balance;
    }
  }, [balance, selectedId, addSnapshot]);
}
