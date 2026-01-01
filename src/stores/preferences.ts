import { mmkvStorage } from "@/config/mmkv";
import { SortField, SortOrder, Unit } from "@/types/misc";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const ORDER: Unit[] = ["btc", "sats", "usd"];

type State = {
  unit: Unit;
  visible: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
  cycleUnit: () => void;
  toggleVisibility: () => void;
  selectSortField: (field: SortField) => void;
  toggleSortOrder: () => void;
};

export const usePreferencesStore = create<State>()(
  persist(
    (set, get) => ({
      unit: "btc",
      visible: true,
      sortField: "balance",
      sortOrder: "desc",

      cycleUnit: () => {
        const current = get().unit;
        const index = ORDER.indexOf(current);
        const next = ORDER[(index + 1) % ORDER.length];
        set({ unit: next });
      },

      toggleVisibility: () => {
        set({ visible: !get().visible });
      },

      selectSortField: (field) => {
        set({ sortField: field, sortOrder: "desc" });
      },

      toggleSortOrder: () => {
        set((state) => ({
          sortOrder: state.sortOrder === "asc" ? "desc" : "asc",
        }));
      },
    }),
    {
      name: "preferences",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
