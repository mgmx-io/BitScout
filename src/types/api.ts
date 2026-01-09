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

export type GetValidateAddressResponse = {
  isvalid: boolean;
  address?: string;
  scriptPubKey?: string;
  isscript?: boolean;
  iswitness?: boolean;
  error?: string;
  error_locations?: number[];
};

export type TxOutput = {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address?: string;
  value: number;
};

export type TxVin = {
  txid: string;
  vout: number;
  prevout: TxOutput | null;
  scriptsig: string;
  scriptsig_asm: string;
  is_coinbase: boolean;
  sequence: number;
  witness?: string[];
};

export type TxStatus = {
  confirmed: boolean;
  block_height?: number;
  block_hash?: string;
  block_time?: number;
};

export type Tx = {
  txid: string;
  version: number;
  locktime: number;
  vin: TxVin[];
  vout: TxOutput[];
  size: number;
  weight: number;
  sigops: number;
  fee: number;
  status: TxStatus;
};

export type GetTxsResponse = Tx[];

export type GetTxResponse = Tx;
