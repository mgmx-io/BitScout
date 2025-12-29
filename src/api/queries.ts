import { useAddresses } from "@/hooks/use-addresses";
import { GetHistoricalPriceRequest } from "@/types/api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getAddress, getHistoricalPrice, getPrices } from "./endpoints";

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

export function useGetAddresses() {
  const addresses = useAddresses().map((a) => a.address);

  return useQueries({
    queries: addresses.map((address) => ({
      queryKey: ["address", address],
      queryFn: () => getAddress({ address }),
    })),
  });
}
