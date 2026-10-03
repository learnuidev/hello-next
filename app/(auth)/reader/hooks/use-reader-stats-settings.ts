"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ReaderStatsViewType = "character" | "word";
export type ReaderStatsDisplayMode = "grid" | "list";
export type ReaderStatsFrequencySort = "none" | "most" | "least";
/** What the insights show: everything, or only what you have learned so far. */
export type ReaderStatsLearnStatus =
  | "all"
  | "learned"
  | "unlearned"
  | "forgotten";

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

      learnStatus: "all" as ReaderStatsLearnStatus,
      setLearnStatus: (learnStatus: ReaderStatsLearnStatus) =>
        set({ learnStatus }),
    }),
    {
      name: "mandarino/reader-stats-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/**
 * Whether a character belongs under a filter, by what the app knows about it.
 *
 * A character with a status of `forgotten` is still one you have met, so it
 * only shows under "learned" once it is not forgotten any more — the same way
 * nmm's own insight filters behave.
 */
export const matchesReaderLearnStatus = (
  learnedChar: any,
  learnStatus: ReaderStatsLearnStatus,
) => {
  const status = learnedChar?.status;

  if (learnStatus === "learned") {
    return !!learnedChar && status !== "forgotten";
  }

  if (learnStatus === "forgotten") {
    return status === "forgotten";
  }

  if (learnStatus === "unlearned") {
    return !learnedChar;
  }

  return true;
};
