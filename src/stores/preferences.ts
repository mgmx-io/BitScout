import { mmkvStorage } from "@/config/mmkv";
import { DisplayUnit, FiatCurrency, SortField, SortOrder } from "@/types/misc";
import { UNITS } from "@/utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  displayUnit: DisplayUnit;
  fiatCurrency: FiatCurrency;
  visible: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
  cycleUnit: () => void;
  setDisplayUnit: (unit: DisplayUnit) => void;
  setFiatCurrency: (currency: FiatCurrency) => void;
  toggleVisibility: () => void;
  selectSortField: (field: SortField) => void;
  toggleSortOrder: () => void;
};

export const usePreferencesStore = create<State>()(
  persist(
    (set, get) => ({
      displayUnit: UNITS[0],
      fiatCurrency: "USD",
      visible: true,
      sortField: "balance",
      sortOrder: "desc",

      cycleUnit: () => {
        const current = get().displayUnit;
        const index = UNITS.indexOf(current);
        const next = UNITS[(index + 1) % UNITS.length];
        set({ displayUnit: next });
      },

      setDisplayUnit: (unit) => {
        set({ displayUnit: unit });
      },

      setFiatCurrency: (currency) => {
        set({ fiatCurrency: currency });
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
