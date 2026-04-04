import { cn } from "@/lib/utils";

import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";

export const EnButton = ({ className }: { className?: string }) => {
  const showEn = useBrightModeStore((state) => state.showEn);
  const setShowEn = useBrightModeStore((state) => state.setShowEn);

  return (
    <button
      className={cn(
        "text-xl",
        showEn
          ? "dark:text-white text-black"
          : "dark:text-gray-500 text-gray-300",

        className
      )}
      onClick={() => {
        setShowEn((prev: any) => !prev);
      }}
    >
      E
    </button>
  );
};
