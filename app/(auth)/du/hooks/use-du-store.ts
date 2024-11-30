import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useDuStore = create(
  persist(
    (set: any, get: any) => ({
      cookie: "",

      setCookie: (cookie: string) => set({ cookie }),

      levels: [],
      setLevels: (f: any) =>
        typeof f === "function"
          ? set({ levels: f(get().levels) })
          : set({ levels: f }),
    }),
    {
      name: "mandarino/du-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
