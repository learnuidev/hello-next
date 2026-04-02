import { create } from "zustand";

interface FontSizeState {
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

export const useFontSizeStore = create<FontSizeState>((set, get) => ({
  fontSize: 16,
  setFontSize: (fontSize) => set({ fontSize }),
  increaseFontSize: () =>
    set((state) => ({
      fontSize: Math.min(state.fontSize + 2, 48),
    })),
  decreaseFontSize: () =>
    set((state) => ({
      fontSize: Math.max(state.fontSize - 2, 20),
    })),
}));
