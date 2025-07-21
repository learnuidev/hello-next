"use client";

import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import {
  MediaTranslation,
  SpeechMarkChunk,
  useGetMediaQuery,
} from "../../hooks/use-get-media-query";

import { useMediaState } from "../hooks/use-media-state";
import { useContainsHumanMode } from "../hooks/use-contains-human-mode";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { useListenState } from "../../hooks/use-listen-state";

function filterRange(interval: number, currentChunk?: SpeechMarkChunk | null) {
  if (!currentChunk) {
    return {
      min: 0,
      max: interval,
    };
  }

  const { end } = currentChunk;

  // Round up to nearest multiple of interval
  const max = Math.ceil(end / interval) * interval;
  const min = max - interval;

  return {
    max,
    min,
  };
}

function averageEnSize(translations: MediaTranslation[]) {
  const total = translations.reduce((acc, curr) => acc + curr?.en?.length, 0);

  return total / translations?.length;
}

function getMaxAndMinTranslationsSlice(
  translations: MediaTranslation[],
  index: number,
  isSmall: boolean
) {
  const averageSize = averageEnSize(translations);

  const batchSize = isSmall ? 120 : 500;

  const chunkSize = Math.ceil(batchSize / averageSize);
  const chunkIndex = Math.floor(index / chunkSize);

  return {
    min: chunkIndex * chunkSize,
    max: (chunkIndex + 1) * chunkSize,
  };
}

export function Reader({
  mediaId,
  playNext,
  autoPlay = false,
}: {
  mediaId: string;
  playNext?: () => void;
  autoPlay?: boolean;
}) {
  const { playbackRate } = useListenState();

  const isSmall = useIsSmall();

  const { data } = useGetMediaQuery(mediaId);

  const containsHumanMode = useContainsHumanMode(mediaId);

  const { mode, setMode } = useMediaState();

  const audioUrl = containsHumanMode
    ? mode === "ai"
      ? data?.mediaFile?.audioUrl
      : data?.customAudioUrl
    : data?.mediaFile?.audioUrl;

  const mediaChunks = containsHumanMode
    ? mode === "ai"
      ? data?.mediaFile?.speechMarks?.chunks
      : data?.mediaFile?.humanAudioTimestamps?.words
    : data?.mediaFile?.speechMarks?.chunks;

  const textItem = data?.text;

  // const textItem = containsHumanMode
  //   ? mode === "ai"
  //     ? data?.text?.split("").filter(Boolean).join("")
  //     : data?.mediaFile?.humanAudioTimestamps?.text
  //         ?.split("")
  //         .filter(Boolean)
  //         .join("")
  //   : data?.text?.split("").filter(Boolean).join("");

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(mediaId);
  const playerRef = useRef(null) as any;

  const currentTimeInThousand = currentTime * 1000;

  const currentChunk = currentTime
    ? mediaChunks?.find(
        (chunk) =>
          chunk?.startTime <= currentTimeInThousand &&
          chunk?.endTime >= currentTimeInThousand
      ) ||
      mediaChunks?.filter(
        (chunk) => chunk?.endTime > currentTimeInThousand
      )?.[0]
    : null;

  const currentTranslation = currentChunk
    ? data?.mediaFile?.translations?.find(
        (translation) =>
          translation?.startChunkIndex <= currentChunk?.start &&
          translation?.endChunkIndex >= currentChunk?.end
      )
    : null;

  const currentTranslationIndex = currentTranslation
    ? data?.mediaFile?.translations?.findIndex(
        (val) => val === currentTranslation
      ) || 0
    : 0;

  const maxMinTranslationsSlice = getMaxAndMinTranslationsSlice(
    data?.mediaFile?.translations || [],
    currentTranslationIndex,
    isSmall
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = useCallback(() => {
    if (playerRef?.current?.player?.isPlaying) {
      playerRef?.current?.player?.player?.pause();
    } else {
      playerRef?.current?.player?.player.play();
    }
  }, [playerRef]);

  const { theme, setTheme } = useTheme();

  const seekBefore = useCallback(() => {
    return true;
  }, []);

  const onReady = useCallback(() => {
    const timeToStart = 7 * 60 + 12.6;

    if (autoPlay) {
      try {
        playerRef.current?.player?.player?.play();
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === "Space") {
        // Vishal 07-12-2024-10-20: prevents the browser from scrolling down

        event.preventDefault();
        togglePlay();
        return null;
      }

      if (event.code === "ArrowLeft") {
        seekBefore();
        return null;
      }

      // if (event.code === "ArrowRight" && !editMode) {
      //   seekAfter();
      //   return null;
      // }

      // if (["l"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
      //   setToggleLoops((val: any) => {
      //     const exist = val?.find(
      //       (item: any) => item?.end === currentTranscription?.end
      //     );
      //     if (exist) {
      //       return val?.filter((item: any) => {
      //         return item?.end !== currentTranscription?.end;
      //       });
      //     }
      //     return val.concat(currentTranscription);
      //   });
      //   event.preventDefault();
      // }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [togglePlay, seekBefore]);

  const seekAndPlay = (time: any) => {
    playerRef.current.seekTo(time, "seconds");

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  };

  const interval = isSmall ? 80 : data?.lang === "zh" ? 400 : 500;

  return (
    <main className="max-w-6xl m-auto p-4">
      <header className="mb-8">
        {data?.mediaFile?.audioUrl && (
          <ReactPlayer
            onEnded={() => {
              if (playNext) {
                playNext();
              }
              console.log("play ended");
            }}
            onReady={onReady}
            ref={playerRef}
            url={audioUrl}
            height={"40px"}
            width={"100%"}
            controls
            playbackRate={playbackRate}
            // playbackRate={containsHumanMode && mode === "ai" ? 0.8 : 1}
          />
        )}

        {/* <div>{JSON.stringify(currentTranslation, null, 4)}</div> */}
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 h-auto sm:min-h-[800px] rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <div className="p-2 sm:px-12 sm:py-12  rounded">
          <p className="text-lg sm:text-xl sm:leading-[36px] text-justify">
            {textItem?.split("").map((item, idx, ctx) => {
              if (ctx?.length > interval) {
                const range = filterRange(interval, currentChunk);
                if (!(idx >= range.min && idx <= range.max)) {
                  return null;
                }
              }
              return (
                <span
                  onClick={() => {
                    const currentChunkItem = mediaChunks?.find(
                      (chunk) => chunk?.start <= idx && chunk?.end >= idx
                    );

                    if (currentChunkItem) {
                      // alert(idx);
                      // alert(JSON.stringify(currentChunkItem));
                      seekAndPlay(currentChunkItem.startTime / 1000);
                    }
                  }}
                  className={cn(
                    "transition-all",
                    currentTranslation
                      ? currentTranslation?.startChunkIndex <= idx &&
                        currentTranslation?.endChunkIndex >= idx
                        ? "text-white dark:text-gray-500 dark:bg-[rgb(14,15,16)] bg-gray-200"
                        : "text-gray-500"
                      : "",

                    currentChunk
                      ? currentChunk?.start >= idx && currentChunk?.end >= idx
                        ? "text-black  dark:text-white"
                        : "text-gray-500"
                      : ""
                  )}
                  key={`listen-${item}-${idx}`}
                >
                  {item}
                </span>
              );
            })}
          </p>
        </div>

        <div className="p-2 sm:px-12 sm:py-12 rounded">
          <p className="text-lg sm:text-xl sm:leading-[36px] transition-all">
            {data?.mediaFile?.translations
              ?.slice(maxMinTranslationsSlice.min, maxMinTranslationsSlice.max)
              ?.map((item) => {
                return (
                  <span
                    onClick={() => {
                      const findChunks = mediaChunks?.filter((chunk) => {
                        return (
                          item?.startChunkIndex <= chunk?.start &&
                          item?.endChunkIndex >= chunk?.end
                        );
                      });

                      if (findChunks && findChunks?.length > 0) {
                        seekAndPlay(findChunks?.[0]?.startTime / 1000);
                      }
                    }}
                    className={cn(
                      "transition-all",
                      currentTranslation
                        ? JSON.stringify(item) ===
                          JSON.stringify(currentTranslation)
                          ? "dark:text-white text-black"
                          : "dark:text-gray-500"
                        : ""
                    )}
                    key={JSON.stringify(item)}
                  >
                    {item?.en}{" "}
                  </span>
                );
              })}
          </p>
        </div>
      </section>
    </main>
  );
}
