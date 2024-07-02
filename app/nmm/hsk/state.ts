import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useHskViewStore = create(
  persist(
    (set: any, get: any) => ({
      view: {
        1: "all",
        2: "all",
        3: "all",
        4: "all",
        5: "all",
        6: "all",
        7: "all",
        8: "all",
        9: "all",
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
      name: "mandarino/hsk-filter-type-3", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
