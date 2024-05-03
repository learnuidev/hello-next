import { create } from "zustand";

export const useSearchState = create((set: any, get: any) => ({
  isSearchBarOpen: false,
  setSearchBarOpen: (mode: any) => set({ isSearchBarOpen: mode }),
}));
