import { createIndexDBStore } from "@/libs/index-db/index-db";

import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";

const useDynaClozeSentenceStore = createIndexDBStore({
  name: "dynacloze/sentence",
  handler: (set: any, get: any) => ({
    learned: {},
    setLearned: (f: any) =>
      typeof f === "function"
        ? set({ learned: f(get().learned) })
        : set({ learned: f }),
  }),
});

export const useDynaClozeSentence = () => {
  const learned: any = useDynaClozeSentenceStore((state) => state.learned);
  const _setLearned = useDynaClozeSentenceStore((state) => state.setLearned);
  const { data: userPreferences } = useGetUserPreferenceQuery();
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const queryClient = useQueryClient();

  const learnMode = userPreferences?.clozeMode || "stocastic";
  const setLearnMode = (mode: "stocastic" | "timeline") => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return { ...old, clozeMode: mode };
    });
    updateUserPreferenceMutation?.mutate({
      clozeMode: mode,
    });
  };

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
  showParent: false,
  setShowParent: (show: boolean) => set({ showParent: show }),
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
  const showParent = dynaStoreRuntime((state) => state.showParent);
  const setShowParent = dynaStoreRuntime((state) => state.setShowParent);

  return {
    wordIndex,
    sentenceIndex,
    setWordIndex,
    setSentenceIndex,
    setResponse,
    response,
    showEn,
    setShowEn,
    showParent,
    setShowParent,
  };
};
