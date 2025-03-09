"use client";

import { defaultState } from "../constants/default-state";

import { createIndexDBStore } from "@/libs/index-db/index-db";

const useClipboardStateStore = createIndexDBStore({
  name: "clipboard/state-store-2",
  handler: (set: any, get: any) => ({
    state: defaultState,
    setState: (f: any) =>
      typeof f === "function"
        ? set({ state: f(get().state) })
        : set({ state: f }),
  }),
});

export const useClipboardState = () => {
  const state: any = useClipboardStateStore((state) => state.state);
  const setState = useClipboardStateStore((state) => state.setState);

  return { state, setState };
};
