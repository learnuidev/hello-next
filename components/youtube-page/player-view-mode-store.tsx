import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ViewModeState {
  viewMode: string;
  setViewMode: (mode: any) => void;

  active: number;
  setActive: (active: number) => void;

  activeTimeLimit: number;
  setActiveTimeLimit: (activeTimeLimit: number) => void;

  activeLengthLimit: number;
  setActiveLengthLimit: (activeLengthLimit: number) => void;

  toggleLoop: any | null;
  setToggleLoop: (toggleLoop: any | null) => void;

  toggleLoops: any[];
  setToggleLoops: (toggleLoops: any[]) => void;

  qaMode: boolean;
  setQaMode: (qaMode: boolean) => void;

  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;

  isVideoHidden: boolean;
  setIsVideoHidden: (isVideoHidden: boolean) => void;

  focusMode: boolean;
  setFocusMode: (focusMode: boolean) => void;
}

const MAX_LIMIT = 9000;
const THIRTY = 30;
const SIXTY = 60;
const NINTY = 90;

export const usePlayerViewModeStore = create(
  persist(
    (set: any, get: any) => ({
      viewMode: "para",
      setViewMode: (viewMode: any) =>
        typeof viewMode === "function"
          ? set({ viewMode: viewMode(get().viewMode) })
          : set({ viewMode }),

      active: NINTY,
      setActive: (active: any) => set({ active }),

      activeTimeLimit: NINTY,
      setActiveTimeLimit: (activeTimeLimit: any) => set({ activeTimeLimit }),

      activeLengthLimit: 10,
      setActiveLengthLimit: (activeLengthLimit: any) => set({ activeLengthLimit }),

      toggleLoop: null,
      setToggleLoop: (toggleLoop: any) => set({ toggleLoop }),

      toggleLoops: [],
      setToggleLoops: (toggleLoops: any) =>
        typeof toggleLoops === "function"
          ? set({ toggleLoops: toggleLoops(get().toggleLoops) })
          : set({ toggleLoops }),

      qaMode: false,
      setQaMode: (qaMode: any) => set({ qaMode }),

      isPlaying: false,
      setIsPlaying: (isPlaying: any) => set({ isPlaying }),

      isVideoHidden: false,
      setIsVideoHidden: (isVideoHidden: any) =>
        typeof isVideoHidden === "function"
          ? set({ isVideoHidden: isVideoHidden(get().isVideoHidden) })
          : set({ isVideoHidden }),

      focusMode: false,
      setFocusMode: (focusMode: any) => set({ focusMode }),
    }),
    {
      name: "mandarino/youtube-view-mode",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
