import { useAppStore } from "@/stores";
import { useMemo } from "react";

export function useAddresses() {
  const selectedId = useAppStore((s) => s.selectedId);
  const addresses = useAppStore((s) => s.addresses);

  return useMemo(
    () => addresses.filter((a) => a.walletId === selectedId),
    [selectedId, addresses],
  );
}
