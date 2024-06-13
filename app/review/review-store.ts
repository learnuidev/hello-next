import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useReviewStore = create(
  persist(
    (set) => ({
      viewType: "year",
      setViewType: (id: string) => set(() => ({ viewType: id })),
    }),

    {
      name: "review-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
