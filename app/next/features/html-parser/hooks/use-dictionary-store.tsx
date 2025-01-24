import { createIndexDBStore } from "@/libs/index-db/index-db";

interface Meanings {
  hanzi: string;
  en: string;
  pinyin: string;
}

export const useDictionaryStore = createIndexDBStore({
  name: "mandarino/dictionary-store-v2",
  handler: (set: any, get: any) => ({
    dictionary: {},
    getDictionary: (id: string) => get().dictionary?.[id],
    setDictionary: (id: string, event: any) =>
      set({
        dictionary: {
          ...get().dictionary,
          [id]: event,
        },
      }),
  }),
});
