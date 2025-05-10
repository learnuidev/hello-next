import { createIndexDBStore } from "@/libs/index-db/index-db";

const useDynaClozeStore = createIndexDBStore({
  name: "dynacloze",
  handler: (set: any, get: any) => ({
    learned: {},
    setLearned: (f: any) =>
      typeof f === "function"
        ? set({ learned: f(get().learned) })
        : set({ learned: f }),
  }),
});

export const useDynaCloze = (contentId: string) => {
  const learned: any = useDynaClozeStore((state) => state.learned);
  const _setLearned = useDynaClozeStore((state) => state.setLearned);

  const setLearned = (key: string) => {
    _setLearned((learned: any) => {
      return {
        ...learned,
        [key]: true,
      };
    });
  };

  const isLearned = (key: string) => {
    return !!learned?.[key];
  };

  return {
    learned,
    setLearned,
    isLearned,
  };
};
