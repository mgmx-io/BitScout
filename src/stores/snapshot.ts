import { mmkvStorage } from "@/config/mmkv";
import { useAppStore } from "@/stores";
import type { ExchangeRates, PriceData } from "@/types/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Snapshot = {
  balance: number;
  prices: PriceData;
  rates: ExchangeRates;
  timestamp: number;
  walletId: string;
};

type State = {
  snapshots: Snapshot[];
  addSnapshot: (snapshot: Omit<Snapshot, "timestamp" | "walletId">) => void;
  getHistory: () => Snapshot[];
};

export const useSnapshotStore = create<State>()(
  persist(
    immer((set, get) => ({
      snapshots: [],

      addSnapshot: ({ balance, prices, rates }) => {
        const walletId = useAppStore.getState().selectedId;
        const timestamp = Date.now();

        set((state) => {
          state.snapshots.push({ timestamp, balance, walletId, prices, rates });
          state.snapshots.sort((a, b) => a.timestamp - b.timestamp);
        });
      },

      getHistory: () => {
        const { selectedId } = useAppStore.getState();
        return get().snapshots.filter((s) => s.walletId === selectedId);
      },
    })),
    {
      name: "snapshot",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
