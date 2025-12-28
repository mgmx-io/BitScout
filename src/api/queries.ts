import { useQuery } from "@tanstack/react-query";
import { getPrices } from "./endpoints";

export function useGetPrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,
  });
}
