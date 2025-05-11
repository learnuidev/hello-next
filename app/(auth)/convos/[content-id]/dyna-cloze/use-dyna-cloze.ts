import { createIndexDBStore } from "@/libs/index-db/index-db";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

const useDynaClozeStore = createIndexDBStore({
  name: "dynacloze",

  handler: (set: any, get: any) => ({
    learned: {},
    learnMode: "timeline",
    setLearnMode: (f: "stocastic" | "timeline") => set({ learnMode: f }),

    setLearned: (f: any) =>
      typeof f === "function"
        ? set({ learned: f(get().learned) })
        : set({ learned: f }),
  }),
});

export const useDynaCloze = (contentId: string) => {
  const learned: any = useDynaClozeStore((state) => state.learned);
  const _setLearned = useDynaClozeStore((state) => state.setLearned);

  const learnMode = useDynaClozeStore((state) => state.learnMode);
  const setLearnMode = useDynaClozeStore((state) => state.setLearnMode);

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
    learnMode,
    setLearnMode,
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
  showEn: false,
  setShowEn: (show: boolean) => set({ showEn: show }),
}));

export const useDyanStoreRuntime = () => {
  const wordIndex: number = dynaStoreRuntime((state) => state.wordIndex);
  const sentenceIndex = dynaStoreRuntime((state) => state.sentenceIndex);
  const setWordIndex = dynaStoreRuntime((state) => state.setWordIndex);
  const setSentenceIndex = dynaStoreRuntime((state) => state.setSentenceIndex);
  const response: any = dynaStoreRuntime((state) => state.response);
  const setResponse = dynaStoreRuntime((state) => state.setResponse);
  const showEn = dynaStoreRuntime((state) => state.showEn);
  const setShowEn = dynaStoreRuntime((state) => state.setShowEn);

  return {
    wordIndex,
    sentenceIndex,
    setWordIndex,
    setSentenceIndex,
    setResponse,
    response,
    showEn,
    setShowEn,
  };
};
