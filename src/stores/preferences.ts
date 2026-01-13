import { mmkvStorage } from "@/config/mmkv";
import { DisplayUnit, FiatCurrency, SortField, SortOrder } from "@/types/misc";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const ORDER: DisplayUnit[] = ["btc", "sats", "usd"];

type State = {
  displayUnit: DisplayUnit;
  fiatCurrency: FiatCurrency;
  visible: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
  cycleUnit: () => void;
  setFiatCurrency: (currency: FiatCurrency) => void;
  toggleVisibility: () => void;
  selectSortField: (field: SortField) => void;
  toggleSortOrder: () => void;
};

export const usePreferencesStore = create<State>()(
  persist(
    (set, get) => ({
      displayUnit: "btc",
      fiatCurrency: "USD",
      visible: true,
      sortField: "balance",
      sortOrder: "desc",

      cycleUnit: () => {
        const current = get().displayUnit;
        const index = ORDER.indexOf(current);
        const next = ORDER[(index + 1) % ORDER.length];
        set({ displayUnit: next });
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
