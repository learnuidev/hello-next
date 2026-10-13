"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ReaderSnippet, ReaderSnippetLine } from "../reader.types";
import { generateReaderId } from "../utils/reader-id";

/**
 * The reader's local-only state.
 *
 * The texts themselves live on the server now (`domain/reader`), but two things
 * stay in the browser because they are not records so much as the reader's own
 * placemarks: where focused read was left in each text, and the reading list of
 * words and lines picked out while reading. These were never going to be rows —
 * they are a scroll position and a scrapbook — so they keep the same localStorage
 * shape they always had, under a key of their own.
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

        set({ readingPositions: { ...positions, [readerItemId]: sentenceIndex } });
      },

      /**
       * The reading list: words and lines saved out of a text while reading it.
       */
      readingList: [] as ReaderSnippet[],

      /** Saves a snippet, keeping the reading list newest first and free of duplicates. */
      saveToReadingList: ({
        text,
        readerItemId,
        readerItemTitle,
        line,
        kind,
      }: {
        text: string;
        readerItemId: string;
        readerItemTitle: string;
        /** The line it was taken out of, when it was taken out of one. */
        line?: ReaderSnippetLine;
        /** What it points back at; a reader text by default. */
        kind?: "reader" | "convo";
      }) => {
        const trimmed = text.trim();

        if (!trimmed) {
          return null;
        }

        const existing: ReaderSnippet[] = get().readingList || [];

        const alreadySaved = existing.find(
          (snippet) =>
            snippet.text === trimmed &&
            snippet.readerItemId === readerItemId &&
            // The line is part of what was saved, not decoration on it: the
            // same word kept out of another line is another thing to come back
            // to, and it carries its own way back.
            snippet.line?.lineIndex === line?.lineIndex,
        );

        if (alreadySaved) {
          return alreadySaved;
        }

        const snippet: ReaderSnippet = {
          id: generateReaderId(),
          text: trimmed,
          readerItemId,
          readerItemTitle,
          kind: kind || "reader",
          ...(line ? { line } : {}),
          createdAt: Date.now(),
        };

        set({ readingList: [snippet, ...existing] });

        return snippet;
      },

      removeFromReadingList: (id: string) => {
        set({
          readingList: (get().readingList || []).filter(
            (snippet: ReaderSnippet) => snippet.id !== id,
          ),
        });
      },
    }),
    {
      name: "mandarino/reader-local-state",
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
