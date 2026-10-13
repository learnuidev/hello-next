"use client";

import { create } from "zustand";

import {
  ReaderInteraction,
  ReaderInteractionInput,
  ReaderInteractionType,
} from "@/domain/reader/reader-interactions.types";

export interface ReaderInteractionDraft {
  readerItemId: string;
  readerItemTitle: string;
  kind: "reader" | "convo";
  type: ReaderInteractionType;
  text: string;
  sentence: string;
  lineIndex: number | null;
  lang: string;
}

const keyFor = (draft: {
  readerItemId: string;
  kind: string;
  type: ReaderInteractionType;
  text: string;
  sentence: string;
}) =>
  [draft.readerItemId, draft.kind, draft.type, draft.text, draft.sentence].join(
    "::",
  );

interface ReaderInteractionsState {
  interactions: Record<string, ReaderInteraction>;
  /** Set whenever a local action changes a record, so the syncer knows to run. */
  dirty: boolean;

  recordLookup: (draft: ReaderInteractionDraft) => void;
  toggleBookmark: (draft: ReaderInteractionDraft) => void;
  hydrate: (items: ReaderInteraction[]) => void;
  ingestBookmarks: (
    items: ReaderInteractionDraft[],
    opts?: { markDirty?: boolean },
  ) => void;
  markClean: () => void;
  snapshot: () => ReaderInteractionInput[];
}

/**
 * How a text was actually read: which words were tapped (and how many times),
 * and which words and lines were bookmarked. In-memory only — the syncer pushes
 * it to the backend and re-hydrates it on the next visit.
 */
export const useReaderInteractionsStore = create<ReaderInteractionsState>(
  (set, get) => ({
    interactions: {},
    dirty: false,

    recordLookup: (draft) => {
      const key = keyFor(draft);
      const existing = get().interactions[key];

      const now = Date.now();

      const record: ReaderInteraction = existing
        ? { ...existing, lookupCount: existing.lookupCount + 1, updatedAt: now }
        : {
            id: "",
            ...draft,
            lookupCount: 1,
            bookmarked: false,
            createdAt: now,
            updatedAt: now,
          };

      set({
        interactions: { ...get().interactions, [key]: record },
        dirty: true,
      });
    },

    toggleBookmark: (draft) => {
      const key = keyFor(draft);
      const existing = get().interactions[key];

      const now = Date.now();

      const record: ReaderInteraction = existing
        ? { ...existing, bookmarked: !existing.bookmarked, updatedAt: now }
        : {
            id: "",
            ...draft,
            lookupCount: 0,
            bookmarked: true,
            createdAt: now,
            updatedAt: now,
          };

      set({
        interactions: { ...get().interactions, [key]: record },
        dirty: true,
      });
    },

    /** Merges backend records in, never over a locally changed one. */
    hydrate: (items) => {
      const local = get().interactions;
      const merged = { ...local };

      items.forEach((item) => {
        const key = keyFor(item);

        if (!merged[key]) {
          merged[key] = item;
        }
      });

      set({ interactions: merged });
    },

    /**
     * Pulls bookmarks kept in localStorage-era reading lists into the ledger,
     * marked bookmarked so the syncer can push them up. `markDirty: false` is
     * for the case where they were just sent to the server directly and only
     * need to appear in the local view.
     */
    ingestBookmarks: (items, opts) => {
      const markDirty = opts?.markDirty ?? true;
      const local = get().interactions;
      const merged = { ...local };
      const now = Date.now();

      items.forEach((item) => {
        const key = keyFor(item);
        const existing = merged[key];

        merged[key] = existing
          ? { ...existing, bookmarked: true, updatedAt: now }
          : {
              id: "",
              ...item,
              lookupCount: 0,
              bookmarked: true,
              createdAt: now,
              updatedAt: now,
            };
      });

      set({
        interactions: merged,
        dirty: markDirty ? true : get().dirty,
      });
    },

    markClean: () => set({ dirty: false }),

    snapshot: () =>
      Object.values(get().interactions).map(({ id, ...rest }) => rest),
  }),
);
