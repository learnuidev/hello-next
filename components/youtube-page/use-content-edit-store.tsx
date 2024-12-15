import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useContentEditStore = create(
  persist(
    (set: any, get: any) => ({
      editMode: false,
      setEditMode: (mode?: any) => set({ editMode: mode || !get().editMode }),
      times: [],
      resetTimes: () => set({ times: [] }),
      setTimes: (f: any) =>
        typeof f === "function"
          ? set({ times: f(get().times) })
          : set({ times: f }),
    }),
    {
      name: "mandario/transcript-item-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
