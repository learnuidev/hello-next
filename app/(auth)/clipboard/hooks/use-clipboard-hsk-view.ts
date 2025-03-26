"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

const useHskViewStore = createIndexDBStore({
  name: "clipboard/hsk-view-store",
  handler: (set: any, get: any) => ({
    hskView: false,
    setHskView: (f: any) =>
      typeof f === "function"
        ? set({ hskView: f(get().hskView) })
        : set({ hskView: f }),
  }),
});

export const useClipboardHskView = () => {
  const hskView: any = useHskViewStore((state) => state.hskView);
  const setHskView = useHskViewStore((state) => state.setHskView);

  return { hskView, setHskView };
};
