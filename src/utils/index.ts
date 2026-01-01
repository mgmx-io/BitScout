import { GetAddressResponse } from "@/types/api";
import { Address, SortField, SortOrder } from "@/types/misc";
import { Big } from "big.js";

export function computeBalance(data: GetAddressResponse | null) {
  if (data === null) return null;
  return (
    data.chain_stats.funded_txo_sum -
    data.chain_stats.spent_txo_sum +
    (data.mempool_stats.funded_txo_sum - data.mempool_stats.spent_txo_sum)
  );
}

export function computeTxCount(data: GetAddressResponse | null) {
  if (data === null) return null;
  return data.chain_stats.tx_count + data.mempool_stats.tx_count;
}

export function compactAddress(address: string) {
  const len = 6;
  return address.slice(0, len) + " ... " + address.slice(-len);
}

export function formatSats(num: Big) {
  const val = new Big(num);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val.toNumber());
}

export function formatBtc(num: Big) {
  const val = new Big(num);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  }).format(val.toNumber());
}

export function formatUsd(num: Big) {
  const val = new Big(num);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val.toNumber());
}

export function satsToBtc(sats: Big) {
  return sats.div(new Big(1e8));
}

export function satsToUsd(sats: Big, price: Big) {
  return satsToBtc(sats).times(price);
}

export function sortAddresses(
  addresses: (Address & GetAddressResponse)[],
  sortField: SortField,
  sortOrder: SortOrder,
) {
  return [...addresses].sort((a, b) => {
    const valueA =
      (sortField === "txCount" ? computeTxCount(a) : computeBalance(a)) ?? 0;
    const valueB =
      (sortField === "txCount" ? computeTxCount(b) : computeBalance(b)) ?? 0;

    return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  });
}
