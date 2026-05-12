import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { cn } from "@/lib/utils";
import { getPinyin } from "@/libs/utils/segment-text";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { EnView } from "./en-view";
import { InputView } from "./input-view";
import { ReaderViewChinese } from "./reader-view-chinese";
import { EnglishTopView } from "./english-top-view";

export function ReaderView({
  currentTime,
  hideEnglish = false,
  currentTranscription,
  seekAndPlay,
  containsChinglish,
  className,
  contentId,
  lang,
}: CurrentTranscriptionProps) {
  const showEn = useBrightModeStore((state) => state.showEn);

  const defautClassName = "mb-4  gap-0 space-y-0";

  return (
    <div>
      {hideEnglish
        ? null
        : showEn && (
            <EnglishTopView currentTranscription={currentTranscription} />
            // <EnView
            //   currentTime={currentTime}
            //   containsChinglish={containsChinglish}
            //   currentTranscription={currentTranscription}
            //   seekAndPlay={seekAndPlay}
            //   contentId={contentId}
            //   lang={lang}
            // />
          )}

      <div className="mb-4">
        {currentTranscription?.lang === "zh" && currentTranscription?.words ? (
          <ReaderViewChinese
            currentTime={currentTime}
            className={className}
            data={currentTranscription?.words || []}
            containsChinglish={containsChinglish}
            currentTranscription={currentTranscription}
            seekAndPlay={seekAndPlay}
            contentId={contentId}
            lang={lang}
          />
        ) : (
          <div className={cn(defautClassName, className)}>
            {isNonRomanLang(currentTranscription?.lang) ? (
              <p>
                {currentTranscription?.lang === "zh"
                  ? currentTranscription?.pinyin
                  : currentTranscription?.roman}
              </p>
            ) : null}
            <InputView
              currentTime={currentTime}
              containsChinglish={containsChinglish}
              currentTranscription={currentTranscription}
              seekAndPlay={seekAndPlay}
              contentId={contentId}
              lang={lang}
            />
          </div>
        )}
      </div>
    </div>
  );
}
