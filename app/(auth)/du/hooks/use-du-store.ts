import { create } from "zustand";

export const useDuStore = create((set: any, get: any) => ({
  levels: [],
  setLevels: (f: any) =>
    typeof f === "function"
      ? set({ levels: f(get().levels) })
      : set({ levels: f }),
}));
