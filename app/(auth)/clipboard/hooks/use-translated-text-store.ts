import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useTranslatedTextStore = createIndexDBStore({
  name: "mandarino/translatedText",
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
