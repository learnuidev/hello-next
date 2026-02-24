import { cn } from "@/lib/utils";

import { Icons } from "../ui/icons.v2";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const isParagraphModeStore = create(
  persist(
    (set, get: any) => ({
      paragraphMode: false,

      toggleParagraphMode: () => {
        const mode = get().paragraphMode;

        set({ paragraphMode: !get().paragraphMode });
      },
    }),

    {
      name: "preview-mode", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useParagraphMode = () => {
  const paragraphMode = isParagraphModeStore(
    (state: any) => state.paragraphMode
  );
  const toggleParagraphMode = isParagraphModeStore(
    (state: any) => state.toggleParagraphMode
  );

  return {
    paragraphMode,
    toggleParagraphMode,
  };
};

export const ParagraphButton = ({ className }: { className?: string }) => {
  const { paragraphMode, toggleParagraphMode } = useParagraphMode();

  return (
    <button
      className={cn(
        "text-xl",
        paragraphMode ? "dark:text-white text-black" : "text-gray-500",
        className
      )}
      onClick={() => {
        toggleParagraphMode();
      }}
    >
      <Icons.paragraph />
    </button>
  );
};
