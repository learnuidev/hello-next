import { create } from "zustand";

export const clozeReviewTimerStore = create((set, get: any) => ({
  reviewCounts: {},
  setReviewCount: (characterId: string, count: any) =>
    set(() => ({
      reviewCounts: {
        ...get().reviewCounts,
        [characterId]: {
          ...get().reviewCounts?.[characterId],
          ...count,
        },
      },
    })),
  resetReviewCount: (characterId: string) => () =>
    set(() => ({
      reviewCounts: {
        ...get().reviewCounts,
        [characterId]: { startTime: null, endTime: null },
      },
    })),
}));

export const useClozeReviewTimer = (characterId: string) => {
  const review = clozeReviewTimerStore((state: any) => state.reviewCounts);
  const startTime: any = review?.[characterId]?.startTime || Date.now();
  const endTime: any = review?.[characterId]?.endTime || Date.now();

  const setReviewCount = clozeReviewTimerStore(
    (state: any) => state.setReviewCount
  );

  const setStartTime = () => {
    setReviewCount(characterId, { startTime: Date.now() + startTime });
  };

  const setEndTime = () => {
    setReviewCount(characterId, { endTime: Date.now() + endTime });
  };

  const resetTime = () => {
    setReviewCount(characterId, { startTime: null, endTime: null });
  };

  return {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    resetTime,
  };
};
