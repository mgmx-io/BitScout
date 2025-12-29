export type GetPricesResponse = ExchangeRate & {
  time: number;
};

export type ExchangeRate = {
  USD: number;
  EUR: number;
  GBP: number;
  CAD: number;
  CHF: number;
  AUD: number;
  JPY: number;
};

export type GetHistoricalPriceResponse = {
  prices: GetPricesResponse[];
  exchangeRates: ExchangeRate;
};

export type GetHistoricalPriceRequest = {
  currency?: keyof ExchangeRate;
  timestamp?: number;
};

export type GetAddressRequest = {
  address: string;
};

export type AddressStats = {
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
  tx_count: number;
};

export type GetAddressResponse = {
  address: string;
  chain_stats: AddressStats;
  mempool_stats: AddressStats;
};
