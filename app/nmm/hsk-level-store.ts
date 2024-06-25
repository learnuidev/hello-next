import { create } from "zustand";

export const useHSKLevelStore = create((set: any, get: any) => ({
  level: 1,
  setLevel: (mode: any) => set({ level: mode }),
}));
