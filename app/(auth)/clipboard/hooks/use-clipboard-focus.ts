"use client";

import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useFocusedStore = createIndexDBStore({
  name: "clipboard/focused-store",
  handler: (set: any, get: any) => ({
    focused: null,
    focusedIndex: null,
    setFocusedIndex: (f: any) =>
      typeof f === "function"
        ? set({ focusedIndex: f(get().focusedIndex) })
        : set({ focusedIndex: f }),
    setFocused: (f: any) =>
      typeof f === "function"
        ? set({ focused: f(get().focused) })
        : set({ focused: f }),
  }),
});

export const useClipboardFocus = () => {
  const focused: any = useFocusedStore((state) => state.focused);
  const focusedIndex: any = useFocusedStore((state) => state.focusedIndex);
  const setFocused = useFocusedStore((state) => state.setFocused);
  const setFocusedIndex = useFocusedStore((state) => state.setFocusedIndex);

  return { focused, setFocused, focusedIndex, setFocusedIndex };
};
