import { useAddresses } from "@/hooks/use-addresses";
import { GetAddressResponse, GetHistoricalPriceRequest } from "@/types/api";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  getAddress,
  getHistoricalPrice,
  getPrices,
  getValidateAddress,
} from "./endpoints";

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

export function useGetAddress(address: string) {
  return useQuery({
    queryKey: ["address", address],
    queryFn: () => getAddress(address),
  });
}

export function useGetAddresses() {
  const addresses = useAddresses();

  return useQueries({
    queries: addresses.map((entry) => ({
      queryKey: ["address", entry.address],
      queryFn: () => getAddress(entry.address),
      select: (data: GetAddressResponse) => ({ ...data, ...entry }),
    })),
  });
}

export function useValidateAddress() {
  return useMutation({
    mutationFn: getValidateAddress,
  });
}
