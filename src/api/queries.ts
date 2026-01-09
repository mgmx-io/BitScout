import { useAddresses } from "@/hooks/use-addresses";
import { GetHistoricalPriceRequest } from "@/types/api";
import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import {
  getAddress,
  getHistoricalPrice,
  getPrices,
  getTx,
  getTxs,
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

  const queries = useQueries({
    queries: addresses.map(({ address }) => ({
      queryKey: ["address", address],
      queryFn: () => getAddress(address),
    })),
  });

  return addresses.map((address, index) => ({
    ...address,
    query: queries[index],
  }));
}

export function useValidateAddress() {
  return useMutation({
    mutationFn: getValidateAddress,
  });
}

export function useGetTxs(address: string) {
  return useInfiniteQuery({
    queryKey: ["address", address, "txs"],
    queryFn: ({ pageParam }) => getTxs(address, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      const MAX_RESULTS = 50;
      if (lastPage.length < MAX_RESULTS) return undefined;
      return lastPage[lastPage.length - 1].txid;
    },
  });
}

export function useGetTx(txid: string | null) {
  return useQuery({
    queryKey: ["tx", txid],
    queryFn: () => getTx(txid!),
    enabled: !!txid,
  });
}
