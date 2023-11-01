import { create } from "zustand";

export const useSelectedCharacter = create((set: any, get: any) => ({
  character: null,
  setCharacter: (mode: any) => set({ character: mode }),
  resetCharacter: () => set({ character: null }),
}));
