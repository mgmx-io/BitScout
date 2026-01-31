import { mmkvStorage } from "@/config/mmkv";
import { FiatCurrency } from "@/types/api";
import { DisplayUnit, SortField, SortOrder } from "@/types/misc";
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
  setDisplayUnit: (displayUnit: DisplayUnit) => void;
  setFiatCurrency: (fiatCurrency: FiatCurrency) => void;
  toggleVisibility: () => void;
  selectSortField: (sortField: SortField) => void;
  toggleSortOrder: () => void;
};

export const usePreferencesStore = create<State>()(
  persist(
    (set, get) => ({
      displayUnit: "BTC",
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

      setDisplayUnit: (displayUnit) => {
        set({ displayUnit });
      },

      setFiatCurrency: (fiatCurrency) => {
        set({ fiatCurrency });
      },

      toggleVisibility: () => {
        set({ visible: !get().visible });
      },

      selectSortField: (sortField) => {
        set({ sortField, sortOrder: "desc" });
      },

      toggleSortOrder: () => {
        set({ sortOrder: get().sortOrder === "asc" ? "desc" : "asc" });
      },
    }),
    {
      name: "preferences",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
