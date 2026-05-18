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

  const view =
    (showChinglish
      ? currentTranscription?.chinglish || currentTranscription?.en
      : currentTranscription?.en) || "";

  return (
    <div
      className={cn("sticky top-0 z-30 dark:text-gray-300 mb-12", className)}
    >
      <div className="pb-4">
        <div
          className={cn(
            `flex justify-between items-center w-full`,
            view.length > 400
              ? "h-36 sm:text-xl text-md"
              : view.length > 200
                ? "h-24 sm:text-xl text-md"
                : "h-16 text-xl",
          )}
        >
          <p className="space-x-2 font-extralight pb-[4px] overflow">
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
