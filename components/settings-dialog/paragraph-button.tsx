import { cn } from "@/lib/utils";

import { Icons } from "../ui/icons.v2";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ParagraphMode = "focus" | "paragraph";

interface ParagraphModeStore {
  paragraphMode: ParagraphMode;
  setParagraphMode: (mode: ParagraphMode) => void;
}

export const isParagraphModeStore = create<ParagraphModeStore>()(
  persist(
    (set, get: any) => ({
      paragraphMode: "focus",

      setParagraphMode: (mode: ParagraphMode) => {
        set({ paragraphMode: mode });
      },
    }),

    {
      name: "preview-mode-v3", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useParagraphMode = () => {
  const paragraphMode = isParagraphModeStore((state) => state.paragraphMode);
  const setParagraphMode = isParagraphModeStore(
    (state) => state.setParagraphMode
  );

  return {
    paragraphMode,
    setParagraphMode,
  };
};

export const ParagraphButton = ({ className }: { className?: string }) => {
  const { paragraphMode, setParagraphMode } = useParagraphMode();

  return (
    <button
      className={cn(
        "text-xl",
        paragraphMode ? "dark:text-white text-black" : "text-gray-500",
        className
      )}
      onClick={() => {
        if (paragraphMode === "focus") {
          setParagraphMode("paragraph");
        } else if (paragraphMode === "paragraph") {
          setParagraphMode("focus");
        }
      }}
    >
      {paragraphMode === "focus" ? <Icons.karaoke /> : <Icons.paragraph />}
    </button>
  );
};
