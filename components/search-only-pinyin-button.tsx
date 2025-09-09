import { cn } from "@/lib/utils";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useReadModeState } from "./read-mode-button";

interface SearchOnlyPinyin {
  showPinyin: boolean;
  setShowPinyin: (f: ((prev: boolean) => boolean) | boolean) => void;
}

export const useSearchOnlyPinyinStore = create<SearchOnlyPinyin>()(
  persist(
    (set, get) => ({
      showPinyin: false,
      mode: false,
      setShowPinyin: (f) =>
        typeof f === "function"
          ? set({ showPinyin: f(get().showPinyin) })
          : set({ showPinyin: f }),
    }),
    {
      name: "searchOnlyPinyin", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export function useSearchOnlyPinyinState() {
  const showPinyin = useSearchOnlyPinyinStore((state) => state.showPinyin);
  const setShowPinyin = useSearchOnlyPinyinStore(
    (state) => state.setShowPinyin
  );

  return {
    showSearchOnlyPinyin: showPinyin,
    setShowSearchOnlyPinyin: setShowPinyin,
  };
}

export const SearchOnlyPinyinButton = ({
  className,
}: {
  className?: string;
}) => {
  const { showSearchOnlyPinyin, setShowSearchOnlyPinyin } =
    useSearchOnlyPinyinState();

  const { readMode, setReadMode } = useReadModeState();

  if (readMode) {
    return (
      <button
        className={cn(
          "text-xl",
          showSearchOnlyPinyin
            ? "dark:text-white text-black"
            : "dark:text-gray-500 text-gray-300",

          className
        )}
        onClick={() => {
          setShowSearchOnlyPinyin((prev: any) => !prev);
        }}
      >
        S
      </button>
    );
  }
};
