"use client";

import { create } from "zustand";

export const useInsightsSettingsStore = create((set: any, get: any) => ({
  sortType: "timeline",
  setSortType: (f: any) =>
    typeof f === "function"
      ? set({ sortType: f(get().sortType) })
      : set({ sortType: f }),
  type: "character",
  setType: (f: any) =>
    typeof f === "function" ? set({ type: f(get().type) }) : set({ type: f }),
}));
