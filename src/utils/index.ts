import { mmkvInstance } from "@/config/mmkv";
import { GetAddressResponse, Tx, TxOutput, TxVin } from "@/types/api";
import {
  DisplayUnit,
  FiatCurrency,
  FullAddress,
  SortField,
  SortOrder,
  TxGroup,
} from "@/types/misc";
import { Big } from "big.js";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import * as StoreReview from "expo-store-review";
import { Platform } from "react-native";

export const UNITS: DisplayUnit[] = ["BTC", "sats", "fiat"];

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

export function computeTxValue(
  inputs: TxVin[],
  outputs: TxOutput[],
  address: string,
) {
  let received = new Big(0);
  let sent = new Big(0);

  for (const output of outputs) {
    if (output.scriptpubkey_address === address) {
      received = received.plus(output.value);
    }
  }

  for (const input of inputs) {
    if (input.prevout?.scriptpubkey_address === address) {
      sent = sent.plus(input.prevout.value);
    }
  }

  return received.minus(sent);
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

export function formatFiat(num: Big, currency: FiatCurrency) {
  const val = new Big(num);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val.toNumber());
}

export function satsToBtc(sats: Big) {
  return sats.div(new Big(1e8));
}

export function satsToFiat(sats: Big, price: Big) {
  return satsToBtc(sats).times(price);
}

export function sortAddresses(
  addresses: FullAddress[],
  sortField: SortField,
  sortOrder: SortOrder,
) {
  const direction = sortOrder === "asc" ? 1 : -1;

  const sortable: { address: FullAddress; value: number }[] = [];
  const pending: FullAddress[] = [];

  for (const address of addresses) {
    const data = address.query.data;

    if (!data) {
      pending.push(address);
      continue;
    }

    const value = getSortValue(data, sortField);
    sortable.push({ address, value });
  }

  sortable.sort((a, b) => direction * (a.value - b.value));

  return [...sortable.map((x) => x.address), ...pending];
}

function getSortValue(data: GetAddressResponse, field: SortField): number {
  switch (field) {
    case "txCount":
      return computeTxCount(data) ?? 0;
    case "balance":
      return computeBalance(data) ?? 0;
    default:
      return 0;
  }
}

export class Feedback {
  static selection = () => {
    if (Platform.OS === "ios") Haptics.selectionAsync();
  };

  static soft = () => {
    if (Platform.OS === "ios")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  static light() {
    if (Platform.OS === "ios")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  static medium() {
    if (Platform.OS === "ios")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  static heavy() {
    if (Platform.OS === "ios")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  static success = () => {
    if (Platform.OS === "ios")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  static error = () => {
    if (Platform.OS === "ios")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };
}

export function formatYear(unix?: number) {
  if (!unix) return "Unconfirmed";
  const date = new Date(unix * 1000);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

export function groupTxs(arr?: Tx[]): TxGroup[] {
  if (!arr) return [];
  const grouped = arr.reduce<{ [key: string]: TxGroup }>((acc, item) => {
    const monthYear = formatYear(item.status.block_time);
    if (!acc[monthYear]) {
      acc[monthYear] = { title: monthYear, data: [] };
    }
    acc[monthYear].data.push(item);
    return acc;
  }, {});

  return Object.values(grouped);
}

export function formatDate(unix?: number) {
  if (!unix) return;
  const date = new Date(unix * 1000).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return date;
}

export async function authenticate() {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) return true;
    const result = await LocalAuthentication.authenticateAsync();
    return result.success;
  } catch {
    return true;
  }
}

export const HOUR = 1000 * 60 * 60;

export const DAY = HOUR * 24;

export async function promptInAppReview() {
  try {
    const key = "LAST_PROMPT_AT";
    const now = Date.now();
    const lastPromptAt = mmkvInstance.getNumber(key) ?? 0;
    const shouldPrompt = now - lastPromptAt >= DAY * 30;
    if (!shouldPrompt) return;
    const canPrompt = await StoreReview.hasAction();
    if (!canPrompt) return;
    await StoreReview.requestReview();
    mmkvInstance.set(key, now);
  } catch {}
}
