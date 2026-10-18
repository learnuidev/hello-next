import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Whether tapping a transcription opens the mini dictionary.
 *
 * Off by default: in a reading view the tap that lands on a line is almost
 * always the reader wanting to hear *that* line, so the plain behaviour is to
 * play it. Looking a word up is the deliberate act, and it asks to be turned on
 * rather than interrupting every tap.
 */
interface MiniDictionaryState {
  showMiniDictionary: boolean;
  setShowMiniDictionary: (f: ((prev: boolean) => boolean) | boolean) => void;
}

const useMiniDictionaryStore = create<MiniDictionaryState>()(
  persist(
    (set, get) => ({
      showMiniDictionary: false,
      setShowMiniDictionary: (f) =>
        typeof f === "function"
          ? set({ showMiniDictionary: f(get().showMiniDictionary) })
          : set({ showMiniDictionary: f }),
    }),
    {
      name: "mini-dictionary-store-v1", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export const useMiniDictionaryState = () => {
  const showMiniDictionary = useMiniDictionaryStore(
    (state) => state.showMiniDictionary,
  );
  const setShowMiniDictionary = useMiniDictionaryStore(
    (state) => state.setShowMiniDictionary,
  );

  return { showMiniDictionary, setShowMiniDictionary };
};
