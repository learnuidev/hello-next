"use client";

import { cn } from "@/lib/utils";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { Icons } from "../ui/icons.v2";
import { isNonRomanLang } from "../_select-character/utils/is-non-roman-lang";
import { useMemo } from "react";
import { smartSplit } from "./utils/smart-split";
import { CharacterItem } from "../_select-character/character-item";

function CurrentTranscriptionViewer({
  currentTranscription,
  showPinyin,
  romanOrPinyin,
  isNonRomanContent,
  lang,
}: any) {
  return (
    <div
      key={JSON.stringify(currentTranscription)}
      className={cn(
        "text-4xl font-bold text-center text-white",
        romanOrPinyin?.length < 16 ? "text-4x" : "text-lg"
      )}
    >
      {isNonRomanContent && showPinyin && (
        <p className={cn("text-[16px] lg:text-xl font-light text-gray-400")}>
          {romanOrPinyin}
        </p>
      )}

      <p
        className={cn(
          " dark:text-gray-200 text-black",
          currentTranscription?.lang === "zh"
            ? "text-4xl"
            : "lg:text-2xl text-[16px]"
        )}
      >
        {smartSplit({
          input: currentTranscription?.input || currentTranscription?.hanzi,
          lang,
        })?.map((item: string, idx: number) => {
          return (
            <CharacterItem
              disableClass
              key={`${idx}-youtube-player-active-transcription-${item}-${idx}`}
              character={item}
            />
          );
        })}
      </p>

      <p
        className={cn(
          "text-[16px] lg:text-xl font-light dark:text-gray-400 text-black"
        )}
      >
        {currentTranscription?.en}
      </p>
    </div>
  );
}

function KaraokeContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl  backdrop-blur-md rounded-xl">
        {children}
      </div>
    </div>
  );
}
function ActiveKaraokeContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center overflow-hidden my-4">{children}</div>
  );
}

function PastLyrics({ lastThreeLyrics, seekTo }: any) {
  return (
    <div
      className={cn(
        "overflow-y-auto flex justify-center flex-col text-xs items-center",
        "mb-24",
        "text-center"
      )}
    >
      {lastThreeLyrics.map((lyric: any, idx: any, ctx: any) => (
        <div
          onClick={() => {
            seekTo(lyric?.start);
          }}
          key={JSON.stringify(lyric) + `${idx}`}
          className={cn(
            "text-gray-600 lg:text-lg text-sm cursor-pointer hover:text-pink-500 dark:hover:text-white/75 transition-colors",
            "text-gray-700"
          )}
        >
          {lyric?.input || "n/a"}
        </div>
      ))}
    </div>
  );
}

function UpcomingLyrics({
  transcriptions,
  currentTime,
  isNonRomanContent,
  showPinyin,
  seekTo,
}: any) {
  return (
    <div className="overflow-y-auto mt-32 text-center flex flex-col items-center justify-center">
      {transcriptions
        ?.filter((trans: any) => {
          return trans.start > currentTime;
        })
        ?.slice(0, 1)
        .map((lyric: any, idx: any) => (
          <div
            key={JSON.stringify(lyric)}
            className={cn(
              "text-white/50 text-lg cursor-pointer dark:hover:text-white/75 transition-colors flex flex-col items-center justify-center",
              idx === 0
                ? "text-gray-600"
                : idx === 1
                  ? "text-gray-700"
                  : "text-gray-800"
            )}
            onClick={() => {
              seekTo(lyric?.start);
            }}
          >
            {isNonRomanContent && showPinyin && (
              <p className="text-sm lg:text-lg font-light text-gray-400">
                {lyric?.roman || lyric?.pinyin}
              </p>
            )}
            <p className="text-sm lg:text-lg">{lyric?.input || lyric?.hanzi}</p>

            <p className="lg:text-lg text-sm">{lyric?.en}</p>
          </div>
        ))}
    </div>
  );
}

export function KaraokeMode({
  // playerRef,
  play,
  seekTo,
  isPlaying,
  transcriptions,
  currentTime,
  focusMode,
  lang,
  audio,
}: {
  play: any;
  seekTo: any;
  transcriptions: any;
  isPlaying: any;
  currentTime: number;
  lang: string;
  focusMode?: any;
  audio?: any;
}) {
  const isFocusMode = typeof focusMode === "number" && !audio;
  const currentTranscription = isFocusMode
    ? transcriptions?.[focusMode]
    : transcriptions?.filter((trans: any) => trans?.end > currentTime)?.[0] ||
      transcriptions?.[0];

  console.log("CURR T", currentTranscription);

  const isIntro = transcriptions?.[0]?.start > currentTime + 1;

  const startingTime = transcriptions?.[0]?.start - currentTime || 0;

  const lastThreeLyrics = transcriptions
    ?.filter((item: any) => {
      return item?.start < currentTime && item?.end < currentTime;
    })
    ?.slice(-1);

  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

  const romanOrPinyin =
    currentTranscription?.lang === "zh"
      ? currentTranscription?.pinyin
      : currentTranscription?.roman;

  const isNonRomanContent = useMemo(() => {
    return isNonRomanLang(lang);
  }, [lang]);

  if (isFocusMode) {
    return (
      <div className="mt-32">
        <KaraokeContainer>
          {/* Current Lyric */}
          <ActiveKaraokeContainer>
            <CurrentTranscriptionViewer
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
      <PastLyrics lastThreeLyrics={lastThreeLyrics} seekTo={seekTo} />

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
            className="text-4xl"
            onClick={() => {
              play();
            }}
          >
            <Icons.music />

            <p className="mt-4 text-gray-400 text-2xl font-extralight">
              Starting in {parseInt(`${startingTime || 0}`)}
            </p>
          </button>
        ) : (
          <CurrentTranscriptionViewer
            currentTranscription={currentTranscription}
            showPinyin={showPinyin}
            romanOrPinyin={romanOrPinyin}
            isNonRomanContent={isNonRomanContent}
            lang={lang}
          />
        )}
      </ActiveKaraokeContainer>

      <UpcomingLyrics
        transcriptions={transcriptions}
        currentTime={currentTime}
        isNonRomanContent={isNonRomanContent}
        showPinyin={showPinyin}
        seekTo={seekTo}
      />
    </KaraokeContainer>
  );
}
