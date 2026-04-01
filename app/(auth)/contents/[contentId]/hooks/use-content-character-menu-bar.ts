import { create } from "zustand";

interface ContentCharacterMenuBarState {
  show: boolean;
  text: string;
  position: { x: number; y: number };
  startTime: number | null;
  setShowMenuBar: (params: {
    text: string;
    position: { x: number; y: number };
    startTime: number | null;
  }) => void;
  hideMenuBar: () => void;
}

export const useContentCharacterMenuBarStore =
  create<ContentCharacterMenuBarState>((set, get) => ({
    show: false,
    text: "",
    position: { x: 0, y: 0 },
    startTime: null,
    setShowMenuBar: ({ text, position, startTime }) =>
      set({
        show: true,
        text,
        position: get().show ? get().position : position,
        startTime,
      }),
    hideMenuBar: () =>
      set({ show: false, text: "", position: { x: 0, y: 0 }, startTime: null }),
  }));
