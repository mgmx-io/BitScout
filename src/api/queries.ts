import { GetHistoricalPriceRequest } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { getHistoricalPrice, getPrices } from "./endpoints";

export function useGetPrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,
  });
}

export function useGetHistoricalPrice(request?: GetHistoricalPriceRequest) {
  return useQuery({
    queryKey: ["historical-price", request],
    queryFn: () => getHistoricalPrice(request),
  });
}
