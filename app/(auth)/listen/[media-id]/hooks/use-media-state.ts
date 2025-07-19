"use client";

import { create } from "zustand";

export const useMediaStore = create((set: any, get: any) => ({
  mode: "ai",
  setMode: (f: "ai" | "human") => set({ mode: f }),
}));

export const useMediaState = () => {
  const mode = useMediaStore((state) => state.mode);
  const setMode = useMediaStore((state) => state.setMode);

  return {
    mode,
    setMode,
  };
};
