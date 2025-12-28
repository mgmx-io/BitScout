import { api } from "@/config/api";
import {
  GetHistoricalPriceRequest,
  GetHistoricalPriceResponse,
  GetPricesResponse,
} from "@/types/api";

// https://mempool.space/api/v1/prices
export async function getPrices() {
  const { data } = await api.get<GetPricesResponse>("/v1/prices");
  return data;
}

// https://mempool.space/api/v1/historical-price?currency=EUR&timestamp=1500000000
export async function getHistoricalPrice(request?: GetHistoricalPriceRequest) {
  const { data } = await api.get<GetHistoricalPriceResponse>(
    "/v1/historical-price",
    {
      params: request,
    },
  );
  return data;
}
