import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useHtmlHistoryStore = create(
  persist(
    (set: any, get: any) => ({
      history: [],
      removeHistory: (id: string) => {
        set({ history: get().history?.filter((item: any) => item?.id !== id) });
      },
      setHistory: (event: any) =>
        typeof event === "function"
          ? set({ history: event(get().history) })
          : set({ history: get().history.concat(event) }),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "mandarino/html-history", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
