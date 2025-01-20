import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useCurrentLangStore = createIndexDBStore({
  name: "mandarino/current-lang-2",
  handler: (set: any, get: any) => ({
    currentLang: "zh",
    setCurrentLang: (event: any) => set({ currentLang: event }),
  }),
});
