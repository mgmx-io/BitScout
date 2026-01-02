import { GetAddressResponse, Tx } from "./api";

export type Address = {
  id: string;
  walletId: string;
  address: string;
};

export type FullAddress = Address & GetAddressResponse;

export type Unit = "btc" | "sats" | "usd";

export type SortField = "balance" | "txCount";

export type SortOrder = "asc" | "desc";

export type TxGroup = {
  title: string;
  data: Tx[];
};
