"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

export const usePinyinViewStore = createIndexDBStore({
  name: "clipboard/pinyin-view-store",
  handler: (set: any, get: any) => ({
    pinyinView: false,
    setPinyinView: (f: any) =>
      typeof f === "function"
        ? set({ pinyinView: f(get().pinyinView) })
        : set({ pinyinView: f }),
  }),
});

export const useClipboardPinyinView = () => {
  const pinyinView: any = usePinyinViewStore((state) => state.pinyinView);
  const setPinyinView = usePinyinViewStore((state) => state.setPinyinView);

  return { pinyinView, setPinyinView };
};
