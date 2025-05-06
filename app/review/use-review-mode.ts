"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useReviewModeStore = createIndexDBStore({
  name: "mando/review-mode-store",
  handler: (set: any, get: any) => ({
    reviewMode: null,
    setReviewMode: (f: any) =>
      typeof f === "function"
        ? set({ reviewMode: f(get().reviewMode) })
        : set({ reviewMode: f }),
    hskLevel: "0",
    setHskLevel: (f: any) =>
      typeof f === "function"
        ? set({ hskLevel: f(get().hskLevel) })
        : set({ hskLevel: f }),
  }),
});

export const useReviewModeView = () => {
  const reviewMode: any = useReviewModeStore((state) => state.reviewMode);
  const setReviewMode = useReviewModeStore((state) => state.setReviewMode);

  return { reviewMode, setReviewMode };
};

export const useHskLevel = () => {
  const hskLevel: any = useReviewModeStore((state) => state.hskLevel);
  const setHskLevel = useReviewModeStore((state) => state.setHskLevel);

  return { setHskLevel, hskLevel };
};
