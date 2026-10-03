"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ReaderItem, ReaderSnippet, ReaderSnippetLine } from "../reader.types";
import { generateReaderId } from "../utils/reader-id";

/**
 * The reader library. Everything is kept in localStorage for now, so there is
 * no user id in the storage key — one browser, one library.
 */
export const useReaderStore = create(
  persist(
    (set: any, get: any) => ({
      items: [] as ReaderItem[],

      /**
       * Saves a text and returns the stored item (uuid and all), so the caller
       * can navigate straight to `/reader/:id`.
       */
      addItem: ({ title, text }: { title: string; text: string }) => {
        const existingItems: ReaderItem[] = get().items;

        let id = generateReaderId();
        while (existingItems.some((item) => item.id === id)) {
          id = generateReaderId();
        }

        const item: ReaderItem = {
          id,
          title: title.trim(),
          text: text.trim(),
          createdAt: Date.now(),
        };

        set({ items: [item, ...existingItems] });

        return item;
      },

      /** Deletes a text, along with the snippets saved out of it. */
      deleteItem: (id: string) => {
        const positions: Record<string, number> = { ...(get().readingPositions || {}) };
        delete positions[id];

        set({
          items: get().items.filter((item: ReaderItem) => item.id !== id),
          readingList: (get().readingList || []).filter(
            (snippet: ReaderSnippet) => snippet.readerItemId !== id,
          ),
          readingPositions: positions,
        });
      },

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
      }: {
        text: string;
        readerItemId: string;
        readerItemTitle: string;
        /** The line it was taken out of, when it was taken out of one. */
        line?: ReaderSnippetLine;
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
      name: "mandarino/reader-items",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Newest first — the order the reader list is shown in. */
export const sortReaderItemsByCreatedAt = (items: ReaderItem[]) =>
  [...items].sort((a, b) => b.createdAt - a.createdAt);

export const READER_PAGE_SIZE = 10;
