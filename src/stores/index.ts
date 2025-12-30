import { mmkvStorage } from "@/config/mmkv";
import { Address } from "@/types/misc";
import * as crypto from "expo-crypto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  addresses: Address[];
  selectedId: string;
  createWallet: () => void;
  selectWallet: (walletId: string) => void;
  trackAddress: (address: string) => void;
  removeAddress: (addressId: string) => void;
};

export const useAppStore = create<State>()(
  persist(
    immer((set, get) => ({
      addresses: [],
      selectedId: crypto.randomUUID(),

      createWallet: () => {
        set((s) => {
          s.selectedId = crypto.randomUUID();
        });
      },

      selectWallet: (walletId: string) => {
        set((s) => {
          s.selectedId = walletId;
        });
      },

      trackAddress: (address: string) => {
        const walletId = get().selectedId;

        set((s) => {
          const exists = s.addresses.some(
            (a) => a.walletId === walletId && a.address === address,
          );
          if (exists) return;

          s.addresses.push({
            id: crypto.randomUUID(),
            walletId,
            address,
          });
        });
      },

      removeAddress: (addressId: string) => {
        set((s) => {
          s.addresses = s.addresses.filter((a) => a.id !== addressId);
        });
      },
    })),
    {
      name: "app",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
