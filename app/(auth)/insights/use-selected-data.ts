import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useSelectedDataStore = create((set: any, get: any) => ({
  selectedData: null,
  setSelectedData: (mode: any) => set({ selectedData: mode }),
  resetSelectedData: () => set({ selectedData: null }),
}));
