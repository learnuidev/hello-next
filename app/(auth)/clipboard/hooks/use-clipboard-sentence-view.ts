"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useSentenceViewStore = createIndexDBStore({
  name: "clipboard/sentence-view-store",
  handler: (set: any, get: any) => ({
    sentenceView: true,
    setSentenceView: (f: any) =>
      typeof f === "function"
        ? set({ sentenceView: f(get().sentenceView) })
        : set({ sentenceView: f }),
  }),
});

export const useClipboardSentenceView = () => {
  const sentenceView: any = useSentenceViewStore((state) => state.sentenceView);
  const setSentenceView = useSentenceViewStore(
    (state) => state.setSentenceView
  );

  return { sentenceView, setSentenceView };
};
