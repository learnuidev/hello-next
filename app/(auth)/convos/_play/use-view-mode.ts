import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useViewModeStore = create((set: any, get: any) => ({
  viewMode: "lesson",
  setViewMode: (mode: any) => set({ viewMode: mode }),
}));

export const useNewConvoStore = create((set: any, get: any) => ({
  step: "audio",
  setStep: (step: any) => set({ step }),
  convo: {
    id: `mandarino#resource#${new Date().getTime()}`,
    author: "",
    location: "",
    level: 1,
    course: "",
    title: "",
    audio: "",
  },
  setConvo: (key: any, value: any) =>
    set({ convo: { ...get().convo, [key]: value } }),
}));
