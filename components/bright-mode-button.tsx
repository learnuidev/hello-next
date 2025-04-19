import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import { useReadModeStore } from "@/stores/use-readmode-store";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";

export const BrightModeButton = () => {
  const readMode = useReadModeStore((state) => state.readMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);

  const brightMode = useBrightModeStore((state: any) => state.mode);
  const setBrightMode = useBrightModeStore((state: any) => state.setMode);

  return (
    <button
      className={cn(
        "text-xl",
        !brightMode
          ? "dark:text-white text-black"
          : "dark:text-gray-500 text-gray-300"
      )}
      onClick={() => {
        setBrightMode((prev: any) => !prev);
        setReadMode(!readMode);
      }}
    >
      <Icons.glassesRound />
    </button>
  );
};
