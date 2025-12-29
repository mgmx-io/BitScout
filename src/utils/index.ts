import { GetAddressResponse } from "@/types/api";

export function computeBalance(data: GetAddressResponse) {
  return (
    data.chain_stats.funded_txo_sum -
    data.chain_stats.spent_txo_sum +
    (data.mempool_stats.funded_txo_sum - data.mempool_stats.spent_txo_sum)
  );
}

export function buildWalletName(wallets: string[], selectedId: string) {
  const index = wallets.indexOf(selectedId);
  if (index === -1) return "Wallet #1";
  return `Wallet #${index + 1}`;
}
