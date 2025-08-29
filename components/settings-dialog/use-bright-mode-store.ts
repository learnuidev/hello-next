import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BrightModeState {
  showPinyin: boolean;
  mode: boolean;
  setMode: (f: ((prev: boolean) => boolean) | boolean) => void;
  setShowPinyin: (f: ((prev: boolean) => boolean) | boolean) => void;
}

export const useBrightModeStore = create<BrightModeState>()(
  persist(
    (set, get) => ({
      showPinyin: false,
      mode: false,
      setMode: (f) =>
        typeof f === "function"
          ? set({ mode: f(get().mode) })
          : set({ mode: f }),
      setShowPinyin: (f) =>
        typeof f === "function"
          ? set({ showPinyin: f(get().showPinyin) })
          : set({ showPinyin: f }),
    }),
    {
      name: "bright-mode-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
