import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";

import { useCommonCharacterMode } from "@/stores/use-common-character-mode-store";

export const CommonCharacterButton = () => {
  const { commonCharacterMode, setCommonCharacterMode } =
    useCommonCharacterMode();

  return (
    <button
      className={cn(
        "text-xl",
        commonCharacterMode
          ? "dark:text-white text-black"
          : "dark:text-gray-500 text-gray-300"
      )}
      onClick={() => {
        setCommonCharacterMode();
      }}
    >
      {commonCharacterMode ? <Icons.fireDuoTone /> : <Icons.fireDuoTone />}
    </button>
  );
};
