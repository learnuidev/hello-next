"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

const useClipboardWordsStore = createIndexDBStore({
  name: "clipboard/words",
  handler: (set: any, get: any) => ({
    words: {},
    setWords: (f: any) =>
      typeof f === "function"
        ? set({ words: f(get().words) })
        : set({ words: f }),
  }),
});

export const useClipboardWords = () => {
  const words: any = useClipboardWordsStore((state) => state.words);
  const setWords = useClipboardWordsStore((state) => state.setWords);

  return { words, setWords };
};
