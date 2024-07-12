import { create } from "zustand";

export const useTitaStore = create((set: any, get: any) => ({
  lang: "cmn-CN",
  setLang: (mode: any) => set({ lang: mode }),
  voice: "",
  setVoice: (char: any) => set({ voice: char }),
  resetVoice: () => set({ voice: null }),
}));
