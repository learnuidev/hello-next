import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const reviewCounterStore = create(
  persist(
    (set, get: any) => ({
      reviewCounts: {},
      setReviewCount: (date: string) => (count: number) =>
        set(() => ({
          reviewCounts: {
            ...get().reviewCounts,
            [date]: count,
          },
        })),
      resetReviewCount: (date: string) => () =>
        set(() => ({
          reviewCounts: {
            ...get().reviewCounts,
            [date]: 0,
          },
        })),
    }),

    {
      name: "review-counter-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
