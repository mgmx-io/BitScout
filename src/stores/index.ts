import { mmkvStorage } from "@/config/mmkv";
import { Address, Wallet } from "@/types/misc";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  wallets: Wallet[];
  addresses: Address[];
  selectedWalletId: string | null;
};

export const useAppStore = create<State>()(
  persist(
    (_) => ({
      wallets: [
        {
          id: "wallet-1",
          name: "Wallet #1",
        },
      ],
      addresses: [
        {
          id: "address-1",
          walletId: "wallet-1",
          address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        },
      ],
      selectedWalletId: "wallet-1",
    }),
    {
      name: "app",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
