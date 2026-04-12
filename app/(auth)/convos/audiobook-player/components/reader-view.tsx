import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import pinyin from "pinyin";

import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { cn } from "@/lib/utils";
import { getPinyin, useSegmentTextQuery } from "@/libs/utils/segment-text";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { EnView } from "./en-view";
import { InputView } from "./input-view";
import { ReaderViewChinese } from "./reader-view-chinese";

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
  const { data: _segmentedData } = useSegmentTextQuery({
    text: currentTranscription?.input,
    lang: currentTranscription?.lang,
  });

  const data: any =
    currentTranscription?.words?.map((word) => {
      const pinyinItem = getPinyin(word?.input || "");

      return {
        ...word,
        pinyin: pinyinItem,
      };
    }) || _segmentedData;

  const showEn = useBrightModeStore((state) => state.showEn);

  const defautClassName = "mb-4  gap-0 space-y-0";

  return (
    <div>
      {currentTranscription?.lang === "zh" && data ? (
        <ReaderViewChinese
          currentTime={currentTime}
          className={className}
          data={data}
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

      {hideEnglish
        ? null
        : showEn && (
            <EnView
              currentTime={currentTime}
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
