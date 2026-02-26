import { mmkvStorage } from "@/config/mmkv";
import { useAppStore } from "@/stores";
import type { PriceData } from "@/types/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Snapshot = {
  balance: number;
  prices: PriceData;
  timestamp: number;
  walletId: string;
};

const hasValidPrices = (prices?: PriceData | null) => {
  if (!prices) {
    return false;
  }

  return Object.values(prices).every(
    (price) => typeof price === "number" && Number.isFinite(price) && price > 0,
  );
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

      addSnapshot: ({ balance, prices }) => {
        const walletId = useAppStore.getState().selectedId;
        const timestamp = Date.now();

        set((state) => {
          state.snapshots.push({ timestamp, balance, walletId, prices });
          state.snapshots.sort((a, b) => a.timestamp - b.timestamp);
        });
      },

      getHistory: () => {
        const { selectedId } = useAppStore.getState();
        return get().snapshots.filter(
          (s) => s.walletId === selectedId && hasValidPrices(s.prices),
        );
      },
    })),
    {
      name: "snapshot",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
