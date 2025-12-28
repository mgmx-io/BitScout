import { useAppStore } from "@/stores";
import { useMemo } from "react";

export function useWalletAddresses() {
  const selectedWalletId = useAppStore((s) => s.selectedWalletId);
  const addresses = useAppStore((s) => s.addresses);

  return useMemo(
    () =>
      selectedWalletId
        ? addresses.filter((a) => a.walletId === selectedWalletId)
        : [],
    [selectedWalletId, addresses],
  );
}
