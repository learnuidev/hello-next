import { create } from "zustand";

interface FontSizeState {
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

/** The size everything is laid out at when the reader has not touched it. */
export const DEFAULT_FONT_SIZE = 16;
/**
 * The ends of the control. They are a range of *scales* — three quarters of a
 * size up to twice it — rather than pixel sizes, which is why the ceiling is
 * low: those numbers are multiplied by every surface's own base size.
 */
export const MIN_FONT_SIZE = 12;
export const MAX_FONT_SIZE = 32;

/** How much bigger or smaller than that default things should be drawn. */
export const fontScale = (fontSize: number) =>
  fontSize / DEFAULT_FONT_SIZE;

export const useFontSizeStore = create<FontSizeState>((set, get) => ({
  fontSize: DEFAULT_FONT_SIZE,
  setFontSize: (fontSize) => set({ fontSize }),
  increaseFontSize: () =>
    set((state) => ({
      fontSize: Math.min(state.fontSize + 2, MAX_FONT_SIZE),
    })),
  decreaseFontSize: () =>
    set((state) => ({
      fontSize: Math.max(state.fontSize - 2, MIN_FONT_SIZE),
    })),
}));

/**
 * The reader's text size, as a multiplier.
 *
 * The stored number is the reader's own taste, not a pixel size: every surface
 * that can be resized — the sing-along lyric, the reader's characters and their
 * guide, the paragraph view — multiplies its own base size by this, so one
 * control moves all of them together and each keeps its own proportions.
 */
export const useFontScale = () =>
  useFontSizeStore((state) => fontScale(state.fontSize));
