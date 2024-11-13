import { create } from "zustand";

export const reviewCounterStore = create((set, get: any) => ({
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
}));
