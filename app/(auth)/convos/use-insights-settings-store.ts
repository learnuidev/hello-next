"use client";

import { create } from "zustand";

export type ConvoInsightsTab = "character" | "word" | "sentence" | "unknown";
export type LearnStatusFilter = "all" | "learned" | "unlearned" | "forgotten";
export type HskLevelFilter = "all" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "na";
export type DisplayMode = "grid" | "list";

export const useInsightsSettingsStore = create((set: any, get: any) => ({
  sortType: "timeline",
  setSortType: (f: any) =>
    typeof f === "function"
      ? set({ sortType: f(get().sortType) })
      : set({ sortType: f }),
  type: "character" as ConvoInsightsTab,
  setType: (f: any) =>
    typeof f === "function" ? set({ type: f(get().type) }) : set({ type: f }),
  displayMode: "grid" as DisplayMode,
  setDisplayMode: (f: any) =>
    typeof f === "function"
      ? set({ displayMode: f(get().displayMode) })
      : set({ displayMode: f }),
  searchQuery: "",
  setSearchQuery: (f: any) =>
    typeof f === "function"
      ? set({ searchQuery: f(get().searchQuery) })
      : set({ searchQuery: f }),
  learnStatus: "all" as LearnStatusFilter,
  setLearnStatus: (f: any) =>
    typeof f === "function"
      ? set({ learnStatus: f(get().learnStatus) })
      : set({ learnStatus: f }),
  hskLevel: "all" as HskLevelFilter,
  setHskLevel: (f: any) =>
    typeof f === "function"
      ? set({ hskLevel: f(get().hskLevel) })
      : set({ hskLevel: f }),
}));
