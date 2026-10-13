"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * The reader's local-only state.
 *
 * The texts live on the server (`domain/reader`) and the words and lines you
 * keep now live in the interactions ledger, which the insights tab reads and
 * which syncs to the account. What is left here is the one thing that is not a
 * record at all but a placemark: where focused read was left in each text, so
 * opening a text again carries on at the line you stopped at.
 */
export const useReaderStore = create(
  persist(
    (set: any, get: any) => ({
      /**
       * Where focused read was left in each text, by text id, so opening a text
       * again carries on at the line you stopped at.
       */
      readingPositions: {} as Record<string, number>,

      setReadingPosition: (readerItemId: string, sentenceIndex: number) => {
        const positions: Record<string, number> = get().readingPositions || {};

        // Writing the same line back is what a re-render would otherwise do
        // forever, so it stops here.
        if (positions[readerItemId] === sentenceIndex) {
          return;
        }

        set({
          readingPositions: { ...positions, [readerItemId]: sentenceIndex },
        });
      },
    }),
    {
      name: "mandarino/reader-local-state",
      // Left at 1 on purpose: the reading list an older build wrote here is
      // what the bookmarks-sync banner migrates, so the key is not rewritten
      // out from under it.
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Newest first — the order the reader list is shown in. */
export const sortReaderItemsByCreatedAt = <T extends { createdAt: number }>(
  items: T[],
) => [...items].sort((a, b) => b.createdAt - a.createdAt);

export const READER_PAGE_SIZE = 10;
