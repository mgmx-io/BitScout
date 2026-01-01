export type Unit = "btc" | "sats" | "usd";

export type SortField = "balance" | "txCount";

export type SortOrder = "asc" | "desc";

export type Address = {
  id: string;
  walletId: string;
  address: string;
};
