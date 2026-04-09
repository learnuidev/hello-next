import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { ContentTranscription } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";

export const EnglishTopView = ({
  className,
  children,
  currentTranscription,
}: {
  className?: string;
  children?: React.ReactNode;
  currentTranscription?: ContentTranscription;
}) => {
  const showEn = useBrightModeStore((state) => state.showEn);

  const { showChinglish, setShowChinglish } = useChinglishState();

  if (!showEn) {
    return null;
  }

  return (
    <div
      className={cn(
        "sticky top-0 py-4 bg-gray-50 z-30 dark:bg-[rgb(13,14,15)]",
        className
      )}
    >
      <div className="mb-8">{children}</div>
      <div className="pb-4">
        <div
          className={cn(
            `flex justify-between items-center mt-2 w-full px-2`,
            "sm:h-36 h-24"
          )}
        >
          <p className="space-x-2 font-extralight pb-[4px] overflow sm:text-lg text-md">
            {showEn
              ? showChinglish
                ? currentTranscription?.chinglish || currentTranscription?.en
                : currentTranscription?.en
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};
