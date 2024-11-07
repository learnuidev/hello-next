import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTitaStore = create(
  persist(
    (set: any, get: any) => ({
      lang: "cmn-CN",
      setLang: (mode: any) => set({ lang: mode }),
      voice: "bo",
      setVoice: (char: any) => set({ voice: char }),
      resetVoice: () => set({ voice: null }),
      audioResource: null,
      setAudioResource: (char: any) => set({ audioResource: char }),
      resourceStatus: null,
      setResourceStatus: (char: any) => set({ resourceStatus: char }),
    }),
    {
      name: "mandarino/tita-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
