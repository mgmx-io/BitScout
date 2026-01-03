import { useGetAddresses } from "@/api/queries";
import { computeBalance } from "@/utils";

export function useBalance() {
  const addresses = useGetAddresses();

  const loading = addresses.some((a) => a.query.isPending);
  if (loading) return null;

  return addresses.reduce((sum, a) => {
    const data = a.query.data;
    if (!data) return sum;

    return sum + (computeBalance(data) ?? 0);
  }, 0);
}
