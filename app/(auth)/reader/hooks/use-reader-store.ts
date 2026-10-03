"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ReaderItem } from "../reader.types";
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

      deleteItem: (id: string) => {
        set({
          items: get().items.filter((item: ReaderItem) => item.id !== id),
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
