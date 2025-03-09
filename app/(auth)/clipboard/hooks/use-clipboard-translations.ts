"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

const useClipboardTranslationsStore = createIndexDBStore({
  name: "clipboard/translations",
  handler: (set: any, get: any) => ({
    translations: {},
    setTranslations: (f: any) =>
      typeof f === "function"
        ? set({ translations: f(get().translations) })
        : set({ translations: f }),
  }),
});

export const useClipboardTranslations = () => {
  const translations: any = useClipboardTranslationsStore(
    (state) => state.translations
  );
  const setTranslations = useClipboardTranslationsStore(
    (state) => state.setTranslations
  );

  return { translations, setTranslations };
};
