import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useHskViewStore = create(
  persist(
    (set: any, get: any) => ({
      view: {
        1: "All",
        2: "All",
        3: "All",
        4: "All",
        5: "All",
        6: "All",
        7: "All",
        8: "All",
        9: "All",
      },
      setView: (level: number, event: any) =>
        set({
          view: {
            ...get().view,
            [level]: event,
          },
        }),
    }),
    {
      name: "mandarino/hsk-filter-type-4", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
