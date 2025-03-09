"use client";

import { languages } from "@/app/next/features/phrase/languages";
import { useMemo, useState } from "react";
import { defaultState } from "../constants/default-state";

import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useFocusedStore = createIndexDBStore({
  name: "clipboard/focused-store",
  handler: (set: any, get: any) => ({
    focused: null,
    setFocused: (f: any) =>
      typeof f === "function"
        ? set({ focused: f(get().focused) })
        : set({ focused: f }),
  }),
});

export const useClipboardFocus = () => {
  const focused: any = useFocusedStore((state) => state.focused);
  const setFocused = useFocusedStore((state) => state.setFocused);

  return { focused, setFocused };
};
