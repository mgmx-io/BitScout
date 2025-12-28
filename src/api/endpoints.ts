import { api } from "@/config/api";
import { GetPricesResponse } from "@/types/api";

// https://mempool.space/api/v1/prices
export async function getPrices() {
  const { data } = await api.get<GetPricesResponse>("/v1/prices");
  return data;
}
