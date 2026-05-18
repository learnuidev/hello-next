"use client";

import { useUpsetContentAnalyticsHandler } from "@/app/(auth)/convos/[content-id]/hooks/use-upsert-content-analytics-handler";
import { useFocusIndex } from "@/app/(auth)/convos/play-v3/hooks/use-focus-index";
import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";
import { isNonRomanLang } from "../_select-character/utils/is-non-roman-lang";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { useChinglishState } from "../settings-dialog/use-chinglish-state";
import { TextPercentageColorizerV2 } from "../text-percentage-colorizer-v2";
import { Icons } from "../ui/icons.v2";
import { useSelectedItem } from "./use-selected-item";
import { useReadModeState } from "../read-mode-button";
import { ReaderView } from "@/app/(auth)/convos/audiobook-player/components/reader-view";
import { EnglishTopView } from "@/app/(auth)/convos/audiobook-player/components/english-top-view";

function CurrentTranscriptionViewer({
  seekTo,
  contentId,
  currentTranscription,
  // showPinyin,
  romanOrPinyin,
  isNonRomanContent,
  containsChinglish,
  currentTime,
  lang,
}: any) {
  const { upsertContentAnalyticsHandler } =
    useUpsetContentAnalyticsHandler(contentId);

  const { selected, setSelected } = useSelectedItem();

  const { showChinglish, setShowChinglish } = useChinglishState();

  const showEn = useBrightModeStore((state) => state.showEn);
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const view =
    (showChinglish
      ? currentTranscription?.chinglish || currentTranscription?.en
      : currentTranscription?.en) || "";

  return (
    <MandoContextMenu lang={currentTranscription?.lang || ""}>
      <div
        key={JSON.stringify(currentTranscription)}
        className={cn(
          "my-0",
          "font-bold text-center",
          romanOrPinyin?.length < 16 ? "text-4x" : "text-lg",
        )}
      >
        {showEn && (
          <EnglishTopView currentTranscription={currentTranscription} />
        )}

        {isNonRomanContent && showPinyin && (
          <Link
            target="_blank"
            onClick={() => {
              upsertContentAnalyticsHandler();
            }}
            href={`/nmm/${currentTranscription?.input || currentTranscription?.hanzi}?lang=${lang}`}
            className={cn(
              "text-[16px] font-light dark:text-gray-500 mb-0 block",
            )}
          >
            {currentTranscription?.pinyin || currentTranscription?.roman}
          </Link>
        )}

        <div
          onClick={() => {
            if (typeof currentTranscription?.start === "number") {
              seekTo(currentTranscription?.start);
            }

            const selectedText = getSelectedText();

            if (selectedText && selectedText?.length < 36) {
              setSelected(selectedText);
            } else {
              setSelected(
                currentTranscription.hanzi || currentTranscription?.input,
              );
            }
          }}
        >
          <TextPercentageColorizerV2
            className={
              currentTranscription.input?.length > 100
                ? "text-xl sm:text-4xl"
                : "text-3xl sm:text-4xl"
            }
            text={currentTranscription.input}
            startTime={currentTranscription.start}
            endTime={currentTranscription.end}
            currentTime={currentTime}
            words={currentTranscription.words}
          />
        </div>
      </div>
    </MandoContextMenu>
  );
}

function KaraokeContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 sm:mt-32 sm:my-24 flex flex-col justify-center items-center mx-4">
      <div className="w-full max-w-6xl  backdrop-blur-md rounded-xl">
        {children}
      </div>
    </div>
  );
}
function ActiveKaraokeContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex justify-center overflow-hidden sm:my-4 my-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function KaraokeMode({
  // playerRef,
  audioUrl,
  play,
  seekTo,
  isPlaying,
  transcriptions,
  currentTime,
  isFocusKaraokeMode,
  seekAndPlay,
  contentId,
  lang,
  audio,
  containsChinglish,
  currentTranscription,
  className,
}: {
  play: any;
  seekTo: any;
  seekAndPlay: any;
  transcriptions: any;
  isPlaying: any;
  currentTime: number;
  lang: string;
  focusMode?: any;
  audio?: any;
  contentId?: string;
  isFocusKaraokeMode?: boolean;
  audioUrl?: string;
  containsChinglish?: boolean;
  className?: string;
  currentTranscription: any;
}) {
  const { focusIndex, setFocusIndex } = useFocusIndex(contentId || "");

  const isIntro = transcriptions?.[0]?.start > currentTime + 1;

  const { readMode } = useReadModeState();

  const startingTime = transcriptions?.[0]?.start - currentTime || 0;

  const lastThreeLyrics = transcriptions
    ?.filter((item: any) => {
      return item?.start < currentTime && item?.end < currentTime;
    })
    ?.slice(-1);

  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const romanOrPinyin =
    currentTranscription?.lang === "zh"
      ? currentTranscription?.pinyin
      : currentTranscription?.roman;

  const isNonRomanContent = useMemo(() => {
    return isNonRomanLang(lang);
  }, [lang]);

  if (!currentTranscription) {
    return null;
  }

  if (readMode) {
    return (
      <div className="mt-32">
        <KaraokeContainer>
          <ActiveKaraokeContainer>
            <div className="max-w-7xl">
              <ReaderView
                className={cn(
                  currentTranscription.input?.length > 100
                    ? "text-xl sm:text-4xl"
                    : "text-3xl sm:text-4xl",
                  className,
                )}
                currentTime={currentTime}
                containsChinglish={!!containsChinglish}
                currentTranscription={currentTranscription}
                seekAndPlay={seekAndPlay}
                // className={className}
                contentId={contentId}
                lang={lang}
              />
            </div>
          </ActiveKaraokeContainer>
        </KaraokeContainer>
      </div>
    );
  }

  if (isFocusKaraokeMode && !audioUrl) {
    return (
      <div className="mt-32">
        <KaraokeContainer>
          <ActiveKaraokeContainer>
            <CurrentTranscriptionViewer
              currentTime={currentTime}
              seekTo={seekTo}
              contentId={contentId}
              currentTranscription={currentTranscription}
              showPinyin={showPinyin}
              romanOrPinyin={romanOrPinyin}
              isNonRomanContent={isNonRomanContent}
              lang={lang}
            />
          </ActiveKaraokeContainer>
        </KaraokeContainer>
      </div>
    );
  }

  return (
    <KaraokeContainer>
      <ActiveKaraokeContainer>
        {!isPlaying && currentTime === 0 ? (
          <button
            className="text-4xl mt-[-100px]"
            onClick={() => {
              play();
            }}
          >
            <Icons.play />
          </button>
        ) : isIntro ? (
          <button
            className="text-xl sm:text-4xl"
            onClick={() => {
              play();
            }}
          >
            <Icons.music />

            <p className="mt-0 sm:mt-4 text-gray-400 text-lg sm:text-2xl font-extralight">
              Starting in {parseInt(`${startingTime || 0}`)}
            </p>
          </button>
        ) : (
          <CurrentTranscriptionViewer
            currentTime={currentTime}
            seekTo={seekTo}
            currentTranscription={currentTranscription}
            showPinyin={showPinyin}
            romanOrPinyin={romanOrPinyin}
            isNonRomanContent={isNonRomanContent}
            containsChinglish={containsChinglish}
            lang={lang}
          />
        )}
      </ActiveKaraokeContainer>
    </KaraokeContainer>
  );
}
