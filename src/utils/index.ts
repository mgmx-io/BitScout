import { GetAddressResponse } from "@/types/api";
import { Unit } from "@/types/misc";
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

export function displayValue({
  sats,
  unit,
  visible,
  price,
}: {
  sats: Big;
  unit: Unit;
  visible: boolean;
  price: Big;
}) {
  if (!visible) return "* * * * *";

  switch (unit) {
    case "btc":
      return `${formatBtc(satsToBtc(sats))} BTC`;
    case "usd":
      return formatUsd(satsToUsd(sats, price));
    case "sats":
    default:
      return `${formatSats(sats)} sats`;
  }
}
