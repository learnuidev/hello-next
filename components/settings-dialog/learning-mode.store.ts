import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLearningModeStore = create(
  persist<any>(
    (set) => ({
      mode: "hsk",
      setMode: (id: string) => set(() => ({ mode: id })),
    }),

    {
      name: "settings-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
