import { create } from "zustand";

export const useDiaryStore = create((set: any, get: any) => ({
  createNew: false,
  setCreateNew: (mode: any) => set({ createNew: mode }),
}));
