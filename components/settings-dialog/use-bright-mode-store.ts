import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBrightModeStore = create(
  persist(
    (set, get: any) => ({
      mode: false,
      setMode: (f: any) =>
        typeof f === "function"
          ? set({ mode: f(get().mode) })
          : set({ mode: f }),
    }),

    {
      name: "bright-mode-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
