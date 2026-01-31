import { mmkvStorage } from "@/config/mmkv";
import { useAppStore } from "@/stores";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Snapshot = {
  timestamp: number;
  balance: number;
  walletId: string;
};

type State = {
  snapshots: Snapshot[];
  addSnapshot: (balance: number) => void;
  getHistory: () => Snapshot[];
};

export const useSnapshotStore = create<State>()(
  persist(
    immer((set, get) => ({
      snapshots: [],

      addSnapshot: (balance) => {
        const { selectedId } = useAppStore.getState();
        const timestamp = Date.now();

        set((state) => {
          state.snapshots.push({ timestamp, balance, walletId: selectedId });
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
