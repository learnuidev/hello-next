"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

const useClipboardViewModeStore = createIndexDBStore({
  name: "clipboard/view-mode-store",
  handler: (set: any, get: any) => ({
    mode: "edit",
    setMode: (f: any) =>
      typeof f === "function" ? set({ mode: f(get().mode) }) : set({ mode: f }),
  }),
});

export const useClipboardViewMode = () => {
  const mode: any = useClipboardViewModeStore((state) => state.mode);
  const setMode = useClipboardViewModeStore((state) => state.setMode);

  return { mode, setMode };
};
