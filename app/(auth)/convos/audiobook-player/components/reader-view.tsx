import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { CurrentTranscriptionProps } from "../audiobook-player.types";
import { useReadModeSweep } from "../hooks/use-read-mode-sweep";
import { EnglishTopView } from "./english-top-view";
import { InputView } from "./input-view";
import { ReaderViewChinese } from "./reader-view-chinese";
import { SweepTiming } from "./karaoke/sweep";

/**
 * The romanisation of a line that is read whole rather than word by word.
 *
 * It is the only guide on such a line, so it fills with the line itself — one
 * reading, one box — which keeps the pronunciation and the characters under it
 * lighting up together.
 */
const RomanGuide = ({
  text,
  active,
  timeRef,
  timing,
}: {
  text?: string;
  active: boolean;
  timeRef?: React.MutableRefObject<number> | null;
  timing: SweepTiming | null;
}) => {
  const sweeping = active && !!timeRef && !!timing;

  const sweepRef = useReadModeSweep<HTMLParagraphElement>({
    active,
    timeRef,
    timings: [timing],
  });

  if (!text) {
    return null;
  }

  return (
    <p
      ref={sweepRef}
      data-r-word={sweeping ? 0 : undefined}
      data-r-glyph={sweeping ? 0 : undefined}
      data-r-glyphs={sweeping ? 1 : undefined}
      className={cn("mn-r-text-guide mn-r-guide-gap", sweeping && "mn-r-sweep")}
    >
      {text}
    </p>
  );
};

export function ReaderView({
  currentTime = 0,
  hideEnglish = false,
  isActive: activeProp,
  currentTranscription,
  seekAndPlay,
  containsChinglish,
  className,
  contentId,
  lang,
  timeRef,
}: CurrentTranscriptionProps) {
  const showEn = useBrightModeStore((state) => state.showEn);

  const defautClassName = "mn-r-line-gap  gap-0 space-y-0";

  // The line being read fills in as it is spoken — the same animation the
  // karaoke view runs — while every other line keeps its static highlight. The
  // sheet that renders the whole book decides which line that is; the start/end
  // test is the fallback for callers showing a single transcription.
  const isActive =
    activeProp ??
    (currentTranscription?.start < currentTime &&
      currentTranscription?.end > currentTime);

  const lineTiming = useMemo<SweepTiming | null>(() => {
    const start = Number(currentTranscription?.start);
    const end = Number(currentTranscription?.end);

    return Number.isFinite(start) && Number.isFinite(end) && end > start
      ? { start, end }
      : null;
  }, [currentTranscription?.start, currentTranscription?.end]);

  return (
    <div>
      {hideEnglish
        ? null
        : showEn && (
            <EnglishTopView currentTranscription={currentTranscription} />
          )}

      <div className="mb-4">
        {currentTranscription?.lang === "zh" && currentTranscription?.words ? (
          <ReaderViewChinese
            currentTime={currentTime}
            isActive={isActive}
            className={className}
            data={currentTranscription?.words || []}
            containsChinglish={containsChinglish}
            currentTranscription={currentTranscription}
            seekAndPlay={seekAndPlay}
            contentId={contentId}
            lang={lang}
            timeRef={timeRef}
          />
        ) : (
          <div className={cn(defautClassName, className)}>
            {isNonRomanLang(currentTranscription?.lang) ? (
              <RomanGuide
                active={isActive}
                timeRef={timeRef}
                timing={lineTiming}
                text={
                  currentTranscription?.lang === "zh"
                    ? currentTranscription?.pinyin
                    : currentTranscription?.roman
                }
              />
            ) : null}
            <InputView
              currentTime={currentTime}
              isActive={isActive}
              containsChinglish={containsChinglish}
              currentTranscription={currentTranscription}
              seekAndPlay={seekAndPlay}
              className={className}
              contentId={contentId}
              lang={lang}
              timeRef={timeRef}
            />
          </div>
        )}
      </div>
    </div>
  );
}
