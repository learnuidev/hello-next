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
import { motion } from "framer-motion";

import { useMediaState } from "../hooks/use-media-state";
import { useContainsHumanMode } from "../hooks/use-contains-human-mode";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { useListenState } from "../../hooks/use-listen-state";
import { useMediaStatsState } from "../hooks/use-media-stats-state";
import { useCountdown } from "@/hooks/use-countdown/use-countdown";
import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";

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

  const batchSize = isSmall ? 160 : 500;

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
  const isSmall = useIsSmall();

  const maxNumber = isSmall ? 6 : 10;
  const [minMax, setMinMax] = useState({ min: 0, max: maxNumber });
  const { playbackRate } = useListenState();

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

  const {
    count,
    startCountdown,
    stopCountdown,
    resetCountdown,
    isCountdownRunning,
  } = useCountdown({
    countStart: 2,
    intervalMs: 1000,

    onCountdownEnd: () => {
      if (playNext) {
        playNext();
      }
    },
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(playerRef?.current?.getCurrentTime());
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

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

  const { history, setHistory } = useMediaStatsState(mediaId);

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

  const totalDataText = data?.text?.split(`\n`)?.filter(Boolean) || [];

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
        setMinMax((prev) => {
          return {
            min: Math.max(0, prev?.min - maxNumber),
            max: Math.max(maxNumber, prev.max - maxNumber),
          };
        });
        return null;
      }

      if (event.code === "ArrowRight") {
        setMinMax((prev) => {
          return {
            min: Math.min(
              Math.max(0, prev?.min + maxNumber),
              totalDataText?.length - maxNumber
            ),
            max: Math.min(
              Math.max(maxNumber, prev.max + maxNumber),
              totalDataText?.length
            ),
          };
        });

        return null;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [seekBefore, togglePlay, setMinMax, maxNumber, totalDataText?.length]);

  const seekAndPlay = (time: any) => {
    playerRef.current.seekTo(time, "seconds");

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  };

  const slicedData = totalDataText?.slice(minMax.min, minMax.max);

  const slicedDataFirst = slicedData?.slice(0, maxNumber / 2);
  const slicedDataSecond = slicedData?.slice(maxNumber / 2, maxNumber);

  return (
    <main className="max-w-6xl m-auto p-4 relative">
      <header className="mb-8">
        <ReactPlayer
          onEnded={() => {
            if (playNext) {
              startCountdown();
            }
            console.log("play ended");
          }}
          progressInterval={20}
          onProgress={(value) => {
            setTime(value.playedSeconds);
          }}
          onReady={onReady}
          ref={playerRef}
          url={audioUrl}
          height={"40px"}
          width={"100%"}
          controls
          playbackRate={playbackRate}
        />
      </header>

      <MandoContextMenu lang={data?.lang || ""}>
        <section className="grid grid-cols-1 sm:grid-cols-2 h-auto sm:min-h-[800px] rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
          <div className="p-2 sm:px-12 sm:py-12 rounded flex gap-4 flex-col">
            {data?.mediaFile?.translations ? (
              data?.mediaFile?.translations
                ?.slice(
                  maxMinTranslationsSlice.min,
                  maxMinTranslationsSlice.max
                )
                ?.map((item, idx) => {
                  const slicedInput = item?.input?.slice(0, -1);
                  const startIndex =
                    item?.startChunkIndex === -1
                      ? data?.text?.indexOf(slicedInput)
                      : item?.startChunkIndex;
                  const endChunkIndex =
                    item?.startChunkIndex === -1
                      ? startIndex + slicedInput?.length
                      : item?.endChunkIndex;

                  const currentChunkItem = mediaChunks?.filter(
                    (chunk) =>
                      startIndex <= chunk?.start && chunk?.end <= endChunkIndex
                  );

                  return (
                    <div key={JSON.stringify(item)}>
                      {/* {containsHumanMode && mode === "human" ? ( */}
                      {true ? (
                        <p
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
                            "dark:hover:text-white hover:text-black",
                            "text-[16px] sm:text-xl sm:leading-[36px]",
                            "transition-all",
                            currentTranslation
                              ? JSON.stringify(item) ===
                                JSON.stringify(currentTranslation)
                                ? "dark:text-white text-black"
                                : "dark:text-gray-500 text-gray-400"
                              : ""
                          )}
                        >
                          {item?.input}
                        </p>
                      ) : (
                        <p className="text-[16px] sm:text-xl sm:leading-[36px]">
                          {currentChunkItem?.map((item) => {
                            return (
                              <span
                                className={cn(
                                  "dark:hover:text-white hover:text-black",
                                  "transition-all",
                                  currentTranslation
                                    ? currentTranslation?.startChunkIndex <=
                                        item?.start &&
                                      currentTranslation?.endChunkIndex >=
                                        item?.end
                                      ? "text-white dark:text-gray-500 dark:bg-[rgb(14,15,16)] bg-gray-200"
                                      : "text-gray-500"
                                    : "",

                                  currentChunk
                                    ? currentChunk?.start >= item?.start &&
                                      currentChunk?.end >= item?.end
                                      ? "text-black  dark:text-white"
                                      : "text-gray-500"
                                    : ""
                                )}
                                key={JSON.stringify(item)}
                                onClick={() => {
                                  setHistory({
                                    mediaId,
                                    startTime: item?.startTime,
                                    endTime: item?.endTime,
                                    startIndex: item?.start,
                                    endIndex: item?.end,
                                    input: item?.value,
                                    addedAt: Date.now(),
                                  });
                                  if (currentChunkItem) {
                                    // alert(idx);
                                    // alert(JSON.stringify(currentChunkItem));
                                    seekAndPlay(item?.startTime / 1000);
                                  }
                                }}
                              >
                                {item?.value}
                                {data?.lang !== "zh" && " "}
                              </span>
                            );
                          })}
                        </p>
                      )}
                    </div>
                  );
                })
            ) : (
              <div className="flex flex-col gap-4">
                {slicedDataFirst?.map((item) => {
                  return <p key={item}>{item}</p>;
                })}
              </div>
            )}
          </div>

          <div className="p-2 sm:px-12 sm:py-12 rounded">
            <div className="flex flex-col gap-4 text-[16px] sm:text-xl transition-all">
              {data?.mediaFile?.translations ? (
                data?.mediaFile?.translations
                  ?.slice(
                    maxMinTranslationsSlice.min,
                    maxMinTranslationsSlice.max
                  )
                  ?.map((item) => {
                    return (
                      <p
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
                              : "dark:text-gray-500 text-gray-400"
                            : ""
                        )}
                        key={JSON.stringify(item)}
                      >
                        {item?.en}{" "}
                      </p>
                    );
                  })
              ) : (
                <div className="flex flex-col gap-4 text-[16px]">
                  {slicedDataSecond?.map((item) => {
                    return <p key={item}>{item}</p>;
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </MandoContextMenu>

      {isCountdownRunning && (
        <motion.div
          initial={{ opacity: 0 }} // Start fully transparent
          animate={{ opacity: 1 }} // Animate to fully visible
          transition={{ duration: 0.5 }} // Duration in seconds
          className="fade-in transition-all fixed bottom-4 right-4 z-50 dark:bg-black dark:text-white bg-white text-black shadow-sm p-4 w-80"
        >
          <h4 className="text-gray-500"> Playing next chapter in...</h4>

          <p className="text-3xl">{count + 1}</p>

          <div className="mt-2 flex gap-4">
            {playNext && (
              <button
                onClick={() => {
                  if (playNext) {
                    playNext();
                  }
                }}
              >
                Play Next
              </button>
            )}

            <button
              onClick={() => {
                seekAndPlay(0);
                resetCountdown();
              }}
            >
              Repeat
            </button>
          </div>
        </motion.div>
      )}
    </main>
  );
}
