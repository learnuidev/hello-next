import { create } from "zustand";
import {
  LoopColorKey,
  nextLoopColor,
} from "../utils/loop-colors";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

/**
 * The dynamic loops a reader has saved, kept in local storage.
 *
 * A saved loop is its boundaries in *seconds* plus the lines they came from, so
 * it can be shown as "lines 12–18" without re-deriving anything, and reloaded
 * even if the transcriptions have been re-cut since — the times are what the
 * player needs, the line numbers are what the reader recognises.
 */

export type SavedLoop = {
  id: string;
  contentId: string;
  name: string;
  /** Which colour it wears, so a long list stays readable at a glance. */
  color?: LoopColorKey;
  start: number;
  end: number;
  startIndex: number;
  endIndex: number;
  createdAt: number;
};

type SavedLoopsState = {
  loops: SavedLoop[];
  /**
   * Saves a section. The same section saved twice is the same loop, so it is
   * renamed rather than duplicated — a loop you cannot find twice is worse than
   * one you cannot name twice.
   */
  saveLoop: (loop: Omit<SavedLoop, "id" | "createdAt" | "color">) => SavedLoop;
  /**
   * Moves an existing loop to a different stretch of the recording.
   *
   * Only its boundaries move: the name, the colour and the identity stay,
   * because this is the same loop the reader is moving rather than a new one —
   * which is exactly what saving it again cannot express.
   */
  updateLoopRange: (
    id: string,
    range: {
      start: number;
      end: number;
      startIndex: number;
      endIndex: number;
    },
  ) => void;
  renameLoop: (id: string, name: string) => void;
  recolorLoop: (id: string, color: LoopColorKey) => void;
  removeLoop: (id: string) => void;
};

const makeId = () =>
  `loop-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/**
 * Keeps saved loops working when there is nowhere to save them.
 *
 * Local storage is not always there — private windows, storage-blocked frames,
 * a full quota — and the one thing that must never happen is `saveLoop` throwing
 * and taking the player's UI down with it. Without a store to write to, the
 * loops live in memory for the session; with one, every write is still guarded,
 * because a quota error mid-save is not worth losing a loop over either.
 */
const memory = new Map<string, string>();

const memoryStorage: StateStorage = {
  getItem: (name) => memory.get(name) ?? null,
  setItem: (name, value) => {
    memory.set(name, value);
  },
  removeItem: (name) => {
    memory.delete(name);
  },
};

const guarded = (storage: StateStorage): StateStorage => ({
  getItem: (name) => {
    try {
      return storage.getItem(name);
    } catch (err) {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      storage.setItem(name, value);
    } catch (err) {
      // Full, or blocked: the loop is still here for this session.
    }
  },
  removeItem: (name) => {
    try {
      storage.removeItem(name);
    } catch (err) {
      // Nothing to do about it.
    }
  },
});

const getStorage = (): StateStorage => {
  try {
    const local = typeof window !== "undefined" ? window.localStorage : null;

    if (local) {
      // Touching it is the only way to know: some privacy modes only throw on
      // the first write.
      const probe = "__mandarino_storage_probe__";

      local.setItem(probe, "1");
      local.removeItem(probe);

      return guarded(local);
    }
  } catch (err) {
    // Fall through to memory.
  }

  return memoryStorage;
};

/** Two boundaries this close are the same boundary. */
const SAME_BOUNDARY = 0.05;

export const useSavedLoopsStore = create<SavedLoopsState>()(
  persist(
    (set, get) => ({
      loops: [],

      saveLoop: (loop) => {
        const name = loop.name.trim() || "Untitled loop";
        const existing = get().loops.find(
          (item) =>
            item.contentId === loop.contentId &&
            Math.abs(item.start - loop.start) < SAME_BOUNDARY &&
            Math.abs(item.end - loop.end) < SAME_BOUNDARY,
        );

        if (existing) {
          set({
            loops: get().loops.map((item) =>
              item.id === existing.id ? { ...item, name } : item,
            ),
          });

          return { ...existing, name };
        }

        const saved: SavedLoop = {
          ...loop,
          name,
          // Handed the next free colour rather than always the same one: six
          // loops saved in a row should not all look alike.
          color: nextLoopColor(
            get()
              .loops.filter((item) => item.contentId === loop.contentId)
              .map((item) => item.color),
          ),
          id: makeId(),
          createdAt: Date.now(),
        };

        set({ loops: [...get().loops, saved] });

        return saved;
      },

      updateLoopRange: (id, range) => {
        set({
          loops: get().loops.map((item) =>
            item.id === id ? { ...item, ...range } : item,
          ),
        });
      },

      renameLoop: (id, name) => {
        const cleaned = name.trim();

        if (!cleaned) {
          return;
        }

        set({
          loops: get().loops.map((item) =>
            item.id === id ? { ...item, name: cleaned } : item,
          ),
        });
      },

      recolorLoop: (id, color) => {
        set({
          loops: get().loops.map((item) =>
            item.id === id ? { ...item, color } : item,
          ),
        });
      },

      removeLoop: (id) =>
        set({ loops: get().loops.filter((item) => item.id !== id) }),
    }),
    {
      name: "mandarino/audiobook-loops",
      storage: createJSONStorage(getStorage),
    },
  ),
);
