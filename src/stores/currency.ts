import { mmkvStorage } from "@/config/mmkv";
import { Unit } from "@/types/misc";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const ORDER: Unit[] = ["btc", "sats", "usd"];

type State = {
  unit: Unit;
  visible: boolean;
  cycleUnit: () => void;
  toggleVisibility: () => void;
};

export const useCurrencyStore = create<State>()(
  persist(
    (set, get) => ({
      unit: "btc",
      visible: true,

      cycleUnit: () => {
        const current = get().unit;
        const index = ORDER.indexOf(current);
        const next = ORDER[(index + 1) % ORDER.length];
        set({ unit: next });
      },

      toggleVisibility: () => {
        set({ visible: !get().visible });
      },
    }),
    {
      name: "currency",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
