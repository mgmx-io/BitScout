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
