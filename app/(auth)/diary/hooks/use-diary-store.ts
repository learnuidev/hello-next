import { create } from "zustand";

export const useDiaryStore = create((set: any, get: any) => ({
  createNew: false,
  setCreateNew: (mode: any) => set({ createNew: mode }),
  text: "",
  setText: (mode: any) => set({ text: mode }),

  correctedGrammar: "",
  setCorrectedGrammar: (mode: any) => set({ correctedGrammar: mode }),
  showGrammar: false,
  setShowGrammar: (mode: any) => set({ showGrammar: mode }),
}));
