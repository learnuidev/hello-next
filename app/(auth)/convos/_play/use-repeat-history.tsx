import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useRepeatHistoryStore = createIndexDBStore({
  name: "mandarino/repeat-history",
  handler: (set: any, get: any) => ({
    history: [],
    setHistory: (event: any) => set({ history: get().history.concat(event) }),
    clearHistory: (event: any) => set({ history: [] }),
  }),
});
