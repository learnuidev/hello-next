import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useReadModeStore = createIndexDBStore({
  name: "clipboard/read-mode-store",
  handler: (set: any, get: any) => ({
    selected: null,
    setFocusedWord: (f: any) =>
      typeof f === "function"
        ? set({ selected: f(get().selected) })
        : set({ selected: f }),
  }),
});
