import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

import { cn } from "@/lib/utils";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { InputView } from "./input-view";
import { EnView } from "./en-view";

export function StandardView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
  className,
  contentId,
  lang,
}: CurrentTranscriptionProps) {
  const defautClassName = "mb-4 sm:mb-16 gap-0 space-y-0";

  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showEn = useBrightModeStore((state) => state.showEn);

  return (
    <div className="text-start">
      {showPinyin && (
        <p className=" dark:text-gray-500 text-gray-800 mb-4">
          {currentTranscription?.pinyin || currentTranscription?.roman}
        </p>
      )}

      <div className={cn(defautClassName, className)}>
        <InputView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
          contentId={contentId}
          lang={lang}
        />
      </div>

      {showEn && (
        <EnView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
          contentId={contentId}
          lang={lang}
        />
      )}
    </div>
  );
}
