import { create } from "zustand";

interface CorrectionSettingsState {
  sourceLang: string;
  targetLang: string;
  setSourceLang: (lang: string) => void;
  setTargetLang: (lang: string) => void;
}

export const useCorrectionSettingsStore = create<CorrectionSettingsState>(
  (set) => ({
    sourceLang: "en-US",
    targetLang: "zh-CN",
    setSourceLang: (lang: string) => set({ sourceLang: lang }),
    setTargetLang: (lang: string) => set({ targetLang: lang }),
  })
);
