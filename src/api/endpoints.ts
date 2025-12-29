import { api } from "@/config/api";
import {
  GetAddressResponse,
  GetHistoricalPriceRequest,
  GetHistoricalPriceResponse,
  GetPricesResponse,
  GetValidateAddressResponse,
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

// https://mempool.space/api/address/1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv
export async function getAddress(address: string) {
  const { data } = await api.get<GetAddressResponse>(`/address/${address}`);
  return data;
}

// https://mempool.space/api/v1/validate-address/1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY
export async function getValidateAddress(address: string) {
  const { data } = await api.get<GetValidateAddressResponse>(
    `/v1/validate-address/${address}`,
  );
  return data;
}
