"use client";

import { create } from "zustand";

export type ConvoInsightsTab = "character" | "word" | "sentence";
export type LearnStatusFilter = "all" | "learned" | "unlearned" | "forgotten";

export const useInsightsSettingsStore = create((set: any, get: any) => ({
  sortType: "timeline",
  setSortType: (f: any) =>
    typeof f === "function"
      ? set({ sortType: f(get().sortType) })
      : set({ sortType: f }),
  type: "character" as ConvoInsightsTab,
  setType: (f: any) =>
    typeof f === "function" ? set({ type: f(get().type) }) : set({ type: f }),
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
}));
