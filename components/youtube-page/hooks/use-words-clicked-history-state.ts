import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useMemo } from "react";
import { create } from "zustand";

export const useWordsClickedHistoryStore = createIndexDBStore({
  name: "content/words-clicked-v3",
  handler: (set: any, get: any) => ({
    history: [],

    removeHistoryForContentId: (contentId: string) => {
      const oldHistory = get().history;

      const historyWithContentIdRemoved = oldHistory?.filter(
        (item: any) => item?.contentId !== contentId
      );

      set({ history: historyWithContentIdRemoved });
    },
    setHistory: (f: any) => {
      const oldHistory = get().history;
      if (typeof f === "function") {
        set({ history: f(oldHistory) });
      } else {
        set({
          history: oldHistory.concat({
            ...f,
            createdAt: Date.now(),
            id: crypto.randomUUID(),
          }),
        });
      }
    },
  }),
});

export const useWordsClickedHistoryState = ({
  contentId,
}: {
  contentId: string;
}) => {
  const history = useWordsClickedHistoryStore((state) => state.history);
  const setWords = useWordsClickedHistoryStore((state) => state.setHistory);

  return useMemo(() => {
    return {
      words: history?.filter((item: any) => item?.contentId === contentId),
      setWords,
    };
  }, [contentId, history, setWords]);
};

interface TotalWordsFrequency {
  word: string;
  frequency: number;
  // id: string;
}
export const calculateTotalWordsFrequency = (
  words: any
): TotalWordsFrequency[] => {
  const wordsUnique = [...new Set(words?.map((word: any) => word?.word))]
    .map((wordItem) => {
      const totalWords: any = words?.filter(
        (item: any) => item?.word === wordItem
      );
      return {
        word: wordItem,
        frequency: totalWords?.length || 1,
        // id: totalWords?.[0]?.id,
      };
    })
    ?.sort((a, b) => b?.frequency - a?.frequency);

  return wordsUnique as TotalWordsFrequency[];
};
