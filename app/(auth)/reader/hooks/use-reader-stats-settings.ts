"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ReaderStatsViewType = "character" | "word";
export type ReaderStatsDisplayMode = "grid" | "list";
export type ReaderStatsFrequencySort = "none" | "most" | "least";

/**
 * The reader's own analytics settings, kept apart from the app's insight store
 * so sorting a text here does not rearrange an nmm lesson's insights.
 */
export const useReaderStatsSettings = create(
  persist(
    (set: any) => ({
      viewType: "character" as ReaderStatsViewType,
      setViewType: (viewType: ReaderStatsViewType) => set({ viewType }),

      displayMode: "grid" as ReaderStatsDisplayMode,
      setDisplayMode: (displayMode: ReaderStatsDisplayMode) =>
        set({ displayMode }),

      frequencySort: "most" as ReaderStatsFrequencySort,
      setFrequencySort: (frequencySort: ReaderStatsFrequencySort) =>
        set({ frequencySort }),
    }),
    {
      name: "mandarino/reader-stats-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
