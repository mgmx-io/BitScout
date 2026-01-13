import { UseQueryResult } from "@tanstack/react-query";
import { ExchangeRate, GetAddressResponse, Tx } from "./api";

export type Address = {
  id: string;
  walletId: string;
  address: string;
};

export type FullAddress = Address & {
  query: UseQueryResult<GetAddressResponse, Error>;
};

export type DisplayUnit = "btc" | "sats" | "usd";

export type FiatCurrency = keyof ExchangeRate;

export type SortField = "balance" | "txCount";

export type SortOrder = "asc" | "desc";

export type TxGroup = {
  title: string;
  data: Tx[];
};
