import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useConvosStore = create(
  persist(
    (set) => ({
      convoId: null,
      setConvoId: (id: string) => set(() => ({ convoId: id })),
      removeConvoId: () => set(() => ({ convoId: null })),

      //    View Types: Used Display Differnt view types
      viewType: "insights",
      setViewType: (id: string) => set(() => ({ viewType: id })),
    }),

    {
      name: "convos-tabs-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
