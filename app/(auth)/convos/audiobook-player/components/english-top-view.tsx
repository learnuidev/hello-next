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
    <div className={cn("sticky top-0 z-30 ", className)}>
      <div className="pb-4 mt-8">
        <div
          className={cn(
            `flex justify-between items-center mt-2 w-full`,
            view.length > 400 ? "h-36" : view.length > 200 ? "h-24" : "h-16",
          )}
        >
          <p className="space-x-2 font-extralight pb-[4px] overflow sm:text-xl text-md">
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
