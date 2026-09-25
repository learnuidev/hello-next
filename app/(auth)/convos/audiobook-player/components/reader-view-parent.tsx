import { EnglishTopView } from "@/app/(auth)/convos/audiobook-player/components/english-top-view";
import { useReadModeState } from "@/components/read-mode-button";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { findActiveLineIndex, useFollowStage } from "../hooks/use-follow-stage";
import { useSmoothPlayhead } from "../hooks/use-smooth-playhead";
import { useTranscriptionHighlight } from "../hooks/use-transcription-highlight";
import { ReaderStyles } from "./karaoke/reader-styles";
import { stageBlurFilter } from "./karaoke/stage-tuning";
import { ReaderParagraphLine, ReaderTextLine } from "./reader-line";

/**
 * The reader.
 *
 * The whole book goes on one sheet — never a one, two or four sentence page —
 * and the sheet scrolls itself the way the sing-along view does: the line being
 * read is parked at a fixed height in the stage and the text glides past it.
 *
 * Lines around the playhead are mounted first and the rest of the book follows
 * in passes, because a book is long enough that building all of it before the
 * first paint would stall the audio playing behind it.
 */
export const ReaderViewParent = ({
  loop,
  content,
  currentTranscription,
  currentTime,
  isVideoHidden,
  isPlaying,
  playerRef,
}: {
  currentTranscription: ContentTranscription;
  content: IContent;
  currentTime: number;
  isPlaying: boolean;
  isVideoHidden: boolean;
  loop?: ContentTranscription;
  /** react-player, used as the high resolution clock for the sweep. */
  playerRef?: { current: any } | null;
}) => {
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const { data: contentUnknowns } = useListContentUnknownsQuery(content.id);

  const { readMode } = useReadModeState();

  const { isFocusMode, activeClassName } = useTranscriptionHighlight({
    background: "dark:bg-[rgb(9,10,11)]",
  });

  // The book in play order: `content.transcriptions` is not guaranteed to be
  // sorted, and the sheet follows the audio through it in order.
  const lines = useMemo(
    () =>
      (content?.transcriptions || [])
        .filter(Boolean)
        .slice()
        .sort(
          (a: any, b: any) => (Number(a?.start) || 0) - (Number(b?.start) || 0),
        ),
    [content?.transcriptions],
  );

  // The line the audio is on: the one that started most recently, which is the
  // sing-along rule — it holds through the silences between sentences.
  const activeIndex = useMemo(
    () => findActiveLineIndex(lines, currentTime),
    [lines, currentTime],
  );

  const {
    stageRef,
    topSpacer,
    bottomSpacer,
    mounted,
    following,
    onManualScroll,
    resumeFollowing,
  } = useFollowStage({
    bookKey: content?.id || "",
    total: lines.length,
    activeIndex,
  });

  // Read mode reads along with the audio, so it needs the same high resolution
  // playhead the karaoke view uses: `currentTime` only arrives every 100ms,
  // which is what makes a fill step instead of glide.
  const timeRef = useSmoothPlayhead({
    playerRef,
    currentTime,
    isPlaying,
    enabled: readMode,
  });

  const visible = lines.slice(mounted.start, mounted.end);
  const isIntro = activeIndex < 0;

  // Before the first sentence starts nothing is being read, so the focus rests
  // on the first line: the sheet opens readable and in focus, and as playback
  // begins the blur follows the playhead one line at a time instead of
  // appearing across the whole book at once.
  const focusIndex = isIntro ? 0 : activeIndex;

  if (lines.length === 0) {
    return (
      <div className={cn("px-4 pb-24", "max-w-4xl", isVideoHidden ? "mx-auto" : "")}>
        <ReaderStyles />
        <EnglishTopView currentTranscription={currentTranscription} />
      </div>
    );
  }

  return (
    <div
      className={cn("px-4 pb-24", "max-w-4xl", isVideoHidden ? "mx-auto" : "")}
    >
      <ReaderStyles />

      <EnglishTopView currentTranscription={currentTranscription} />

      <div className="relative">
        <div
          ref={stageRef}
          onWheel={onManualScroll}
          onTouchStart={onManualScroll}
          onPointerDown={onManualScroll}
          className={cn(
            "mn-r-stage overflow-y-auto overscroll-contain",
            // Roomier on desktop, the way the sing-along sheet sizes itself: a
            // compact stage beside the video, a proper one without it.
            isVideoHidden
              ? "h-[58vh] min-h-[400px] max-h-[640px] sm:h-[76vh] sm:min-h-[520px] sm:max-h-[900px]"
              : "h-[46vh] min-h-[300px] max-h-[420px] sm:h-[56vh] sm:max-h-[560px]",
          )}
        >
          <div style={{ height: topSpacer }} />

          {visible.map((transcription: any, offset: number) => {
            const index = mounted.start + offset;
            const isActive = index === activeIndex;
            const key = transcription?.id || `${index}`;

            // The stage reads its own markup: which line this is, and which one
            // the audio is on, is what the follow loop anchors to. The blur is
            // the page falling away from the line being read — a step per line,
            // and the same value for every line past the last step, so a line
            // change only rewrites the lines around the playhead.
            return (
              <div
                key={key}
                data-r-line={index}
                data-r-line-active={isActive ? "1" : undefined}
                style={{ filter: stageBlurFilter(index - focusIndex) }}
              >
                {readMode ? (
                  <ReaderTextLine
                    transcription={transcription}
                    isActive={isActive}
                    className={isActive ? activeClassName : "opacity-50"}
                    lang={content?.lang}
                    contentId={content?.id}
                    timeRef={timeRef}
                  />
                ) : (
                  <ReaderParagraphLine
                    transcription={transcription}
                    isActive={isActive}
                    isFocusMode={isFocusMode}
                    activeClassName={activeClassName}
                    inactiveClassName="opacity-50"
                    contentUnknowns={contentUnknowns}
                    showPinyin={showPinyin}
                    lang={content?.lang}
                  />
                )}
              </div>
            );
          })}

          <div style={{ height: bottomSpacer }} />
        </div>

        {/* The sheet follows the audio on its own; this is the way back after
            reading ahead or behind by hand. */}
        {!isIntro && !following && (
          <button
            onClick={resumeFollowing}
            className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs text-black backdrop-blur-md transition hover:bg-white dark:border-white/15 dark:bg-black/35 dark:text-white dark:hover:bg-black/50"
          >
            Back to current line
          </button>
        )}
      </div>
    </div>
  );
};
