import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BrightModeState {
  showChinglish: boolean;

  setShowChinglish: (f: ((prev: boolean) => boolean) | boolean) => void;
}

const useChinglishStore = create<BrightModeState>()(
  persist(
    (set, get) => ({
      showChinglish: false,
      setShowChinglish: (f) =>
        typeof f === "function"
          ? set({ showChinglish: f(get().showChinglish) })
          : set({ showChinglish: f }),
    }),
    {
      name: "chinglish-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useChinglishState = () => {
  const showChinglish = useChinglishStore((state) => state.showChinglish);
  const setShowChinglish = useChinglishStore((state) => state.setShowChinglish);

  return { showChinglish, setShowChinglish };
};
