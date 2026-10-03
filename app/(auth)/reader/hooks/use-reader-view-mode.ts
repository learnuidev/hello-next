"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ReaderViewMode } from "../reader.types";

/**
 * Which view a reader text is opened in. Persisted so coming back to a text
 * (or opening the next one) keeps the way you were reading.
 */
export const useReaderViewModeStore = create(
  persist(
    (set: any) => ({
      viewMode: "read" as ReaderViewMode,
      setViewMode: (viewMode: ReaderViewMode) => set({ viewMode }),
    }),
    {
      name: "mandarino/reader-view-mode",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
