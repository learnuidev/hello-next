import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import { useReadModeStore } from "@/stores/use-readmode-store";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";
import { useCommonCharacterMode } from "@/stores/use-common-character-mode-store";

export const BrightModeButton = ({ className }: { className?: string }) => {
  const readMode = useReadModeStore((state) => state.readMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);

  const brightMode = useBrightModeStore((state) => state.mode);
  const setBrightMode = useBrightModeStore((state) => state.setMode);

  const { setCommonCharacterMode } = useCommonCharacterMode();

  return (
    <button
      className={cn(
        "text-xl",
        !brightMode
          ? "dark:text-white text-black"
          : "dark:text-gray-500 text-gray-300",

        className
      )}
      onClick={() => {
        setBrightMode((prev: any) => !prev);
        setReadMode(!readMode);
        setCommonCharacterMode(false);
      }}
    >
      {!brightMode ? <Icons.glassesRoundSolid /> : <Icons.glassesRound />}
    </button>
  );
};
