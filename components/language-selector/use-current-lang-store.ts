import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useCurrentLangStore = createIndexDBStore({
  name: "mandarino/current-lang",
  handler: (set: any, get: any) => ({
    currentLang: "zh-CN",
    setCurrentLang: (event: any) => set({ currentLang: event }),
  }),
});
