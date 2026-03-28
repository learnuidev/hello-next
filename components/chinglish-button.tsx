import { cn } from "@/lib/utils";

import { useChinglishState } from "./settings-dialog/use-chinglish-state";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";

export const ChinglishButton = ({ className }: { className?: string }) => {
  const { showChinglish, setShowChinglish } = useChinglishState();

  const showEn = useBrightModeStore((state) => state.showEn);

  if (!showEn) {
    return null;
  }

  return (
    <button
      className={cn(
        "text-xl",
        showChinglish
          ? "dark:text-white text-black"
          : "dark:text-gray-500 text-gray-300",

        className
      )}
      onClick={() => {
        setShowChinglish((prev: any) => !prev);
      }}
    >
      C
    </button>
  );
};
