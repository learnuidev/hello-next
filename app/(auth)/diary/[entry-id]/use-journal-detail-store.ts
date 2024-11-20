import { create } from "zustand";

export const useJournalDetailStore = create((set: any, get: any) => ({
  showHanzi: false,
  setShowHanzi: (mode: any) => set({ showHanzi: mode }),
}));
