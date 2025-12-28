import { useAppStore } from "@/stores";

export function useSelectedWallet() {
  return useAppStore(
    (s) => s.wallets.find((w) => w.id === s.selectedWalletId) ?? null,
  );
}
