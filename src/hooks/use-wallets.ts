import { useAppStore } from "@/stores";
import { useMemo } from "react";

export function useWallets() {
  const addresses = useAppStore((s) => s.addresses);
  const selectedId = useAppStore((s) => s.selectedId);

  return useMemo(() => {
    const ids = new Set<string>();

    for (const a of addresses) {
      ids.add(a.walletId);
    }

    if (selectedId) {
      ids.add(selectedId);
    }

    return Array.from(ids);
  }, [addresses, selectedId]);
}
