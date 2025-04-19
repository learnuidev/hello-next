import { cn } from "@/lib/utils";

import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";

export const PinyinButton = () => {
  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);
  const setShowPinyin = useBrightModeStore((state: any) => state.setShowPinyin);

  return (
    <button
      className={cn(
        "text-xl",
        showPinyin
          ? "dark:text-white text-black"
          : "dark:text-gray-500 text-gray-300"
      )}
      onClick={() => {
        setShowPinyin((prev: any) => !prev);
      }}
    >
      P
    </button>
  );
};
