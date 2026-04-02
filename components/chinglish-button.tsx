import { cn } from "@/lib/utils";

import { useChinglishState } from "./settings-dialog/use-chinglish-state";

export const ChinglishButton = ({
  className,
  disabled,
}: {
  className?: string;
  disabled?: boolean;
}) => {
  const { showChinglish, setShowChinglish } = useChinglishState();

  return (
    <button
      disabled={disabled}
      className={cn(
        "text-xl",
        showChinglish && !disabled
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
