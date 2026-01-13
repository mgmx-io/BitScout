import { useGetPrices } from "@/api/queries";
import { usePreferencesStore } from "@/stores/preferences";
import {
  formatBtc,
  formatFiat,
  formatSats,
  satsToBtc,
  satsToFiat,
} from "@/utils";
import { Big } from "big.js";

export function useDisplayValue(sats: number | null) {
  const { displayUnit, fiatCurrency, visible } = usePreferencesStore();
  const { data, isPending, isError } = useGetPrices();
  if (sats === null) return null;
  const value = new Big(sats);
  if (!visible) return "* * * * *";
  if (displayUnit === "BTC") return `${formatBtc(satsToBtc(value))} BTC`;
  if (displayUnit === "sats") return `${formatSats(value)} sats`;
  if (isPending || isError) return null;
  const price = data?.[fiatCurrency];
  if (!price) return null;
  return formatFiat(satsToFiat(value, new Big(price)), fiatCurrency);
}
