import { useGetPrices } from "@/api/queries";
import { usePreferencesStore } from "@/stores/preferences";
import {
  formatBtc,
  formatSats,
  formatUsd,
  satsToBtc,
  satsToUsd,
} from "@/utils";
import { Big } from "big.js";

export function useDisplayValue(sats: number | null) {
  const { unit, visible } = usePreferencesStore();
  const { data, isPending, isError } = useGetPrices();
  if (sats === null) return null;
  const value = new Big(sats);
  if (!visible) return "* * * * *";
  if (unit === "btc") return `${formatBtc(satsToBtc(value))} BTC`;
  if (unit === "sats") return `${formatSats(value)} sats`;
  if (isPending || isError || !data?.USD) return null;
  const price = new Big(data.USD);
  return formatUsd(satsToUsd(value, price));
}
