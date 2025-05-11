import { createIndexDBStore } from "@/libs/index-db/index-db";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

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

export const dynaStoreRuntime = create((set: any, get: any) => ({
  response: null,
  setResponse: (resp: any) => set({ response: resp }),
  wordIndex: 0,
  sentenceIndex: 0,
  setWordIndex: (val: number) => set({ wordIndex: val }),
  setSentenceIndex: (val: number) => set({ sentenceIndex: val }),
}));

export const useDyanStoreRuntime = () => {
  const wordIndex = dynaStoreRuntime((state) => state.wordIndex);
  const sentenceIndex = dynaStoreRuntime((state) => state.sentenceIndex);
  const setWordIndex = dynaStoreRuntime((state) => state.setWordIndex);
  const setSentenceIndex = dynaStoreRuntime((state) => state.setSentenceIndex);
  const response: any = dynaStoreRuntime((state) => state.response);
  const setResponse = dynaStoreRuntime((state) => state.setResponse);

  return {
    wordIndex,
    sentenceIndex,
    setWordIndex,
    setSentenceIndex,
    setResponse,
    response,
  };
};
