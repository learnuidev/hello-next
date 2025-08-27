import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const modes = {
  normal: {
    current: "normal",
    next: "focus",
  },
  focus: {
    current: "focus",
    next: "melanin",
  },
  melanin: {
    current: "melanin",
    next: "normal",
  },
} as any;

export const usePreviewModeStore = create(
  persist(
    (set, get: any) => ({
      currentMode: {
        current: "normal",
        next: "focus",
      },

      setNextMode: () => {
        const mode = get().currentMode;

        const nextMode = modes?.[mode?.next];
        set({ currentMode: nextMode });
      },
    }),

    {
      name: "preview-mode", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const usePreviewMode = () => {
  const currentMode = usePreviewModeStore((state: any) => state.currentMode);
  const setNextMode = usePreviewModeStore((state: any) => state.setNextMode);

  return {
    currentMode,
    setNextMode,
  };
};
