import { cn } from "@/lib/utils";
import { useReadModeStore } from "@/stores/use-readmode-store";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ReadModeState {
  readMode: boolean;
  setReadMode: (f: ((prev: boolean) => boolean) | boolean) => void;
}

const useReadMoreStore = create<ReadModeState>()(
  persist(
    (set, get) => ({
      readMode: false,
      setReadMode: (f) =>
        typeof f === "function"
          ? set({ readMode: f(get().readMode) })
          : set({ readMode: f }),
    }),
    {
      name: "read-mode-store-v1", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useReadModeState = () => {
  const readMode = useReadMoreStore((state) => state.readMode);
  const setReadMode = useReadMoreStore((state) => state.setReadMode);

  return {
    readMode,
    setReadMode,
  };
};

export const ReadModeButton = ({ className }: { className?: string }) => {
  const { readMode, setReadMode } = useReadModeState();

  return (
    <button
      className={cn(
        "text-xl",
        readMode
          ? "dark:text-white text-black"
          : "dark:text-gray-500 text-gray-300",

        className
      )}
      onClick={() => {
        setReadMode(!readMode);
      }}
    >
      R
    </button>
  );
};
