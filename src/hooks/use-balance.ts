import { useGetAddresses } from "@/api/queries";
import { computeBalance } from "@/utils";

export function useBalance() {
  const queries = useGetAddresses();
  const ready = queries.every((q) => q.isSuccess);
  if (!ready) return null;
  const balance = queries.reduce((sum, q) => sum + computeBalance(q.data)!, 0);
  return balance;
}
