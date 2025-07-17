"use client";

import ReactPlayer from "react-player";
import {
  MediaTranslation,
  SpeechMarkChunk,
  useGetMediaQuery,
} from "../hooks/use-get-media-query";
import { useMediaParams } from "./hooks/use-media-params";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function filterRange(currentChunk?: SpeechMarkChunk | null) {
  const interval = 400;

  if (!currentChunk) {
    return {
      min: 0,
      max: 400,
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
  index: number
) {
  const averageSize = averageEnSize(translations);

  console.log("AVG SIZE", averageSize);
  const chunkSize = Math.ceil(500 / averageSize);
  const chunkIndex = Math.floor(index / chunkSize);

  return {
    min: chunkIndex * chunkSize,
    max: (chunkIndex + 1) * chunkSize,
  };
}

export default function MediaDetails() {
  const { mediaId } = useMediaParams();

  const { data } = useGetMediaQuery(mediaId);

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(mediaId);
  const playerRef = useRef(null) as any;

  const currentTimeInThousand = currentTime * 1000;

  const currentChunk = currentTime
    ? data?.mediaFile?.speechMarks?.chunks?.find(
        (chunk) =>
          chunk?.startTime <= currentTimeInThousand &&
          chunk?.endTime >= currentTimeInThousand
      )
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

  console.log("CURRENT T INDEX", currentTranslationIndex);

  const maxMinTranslationsSlice = getMaxAndMinTranslationsSlice(
    data?.mediaFile?.translations || [],
    currentTranslationIndex
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

  const seekBefore = useCallback(() => {
    return true;
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

  return (
    <main className="max-w-6xl m-auto p-4">
      <header className="mb-8">
        {data?.mediaFile?.audioUrl && (
          <ReactPlayer
            ref={playerRef}
            url={data?.mediaFile?.audioUrl}
            height={"40px"}
            width={"100%"}
            controls
          />
        )}

        {/* <div>{JSON.stringify(currentTranslation, null, 4)}</div> */}
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 h-auto sm:min-h-[800px] rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <div className="p-2 sm:px-12 sm:py-12  rounded">
          <p className="text-xl leading-[36px]">
            {data?.text?.split("").map((item, idx, ctx) => {
              if (ctx?.length > 400) {
                const range = filterRange(currentChunk);
                if (!(idx >= range.min && idx <= range.max)) {
                  return null;
                }
              }
              return (
                <span
                  onClick={() => {
                    const currentChunkItem =
                      data?.mediaFile?.speechMarks?.chunks?.find(
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
          <p className="text-xl leading-[36px] transition-all">
            {data?.mediaFile?.translations
              ?.slice(maxMinTranslationsSlice.min, maxMinTranslationsSlice.max)
              ?.map((item) => {
                return (
                  <span
                    onClick={() => {
                      const findChunks =
                        data?.mediaFile?.speechMarks?.chunks?.filter(
                          (chunk) => {
                            return (
                              item?.startChunkIndex <= chunk?.start &&
                              item?.endChunkIndex >= chunk?.end
                            );
                          }
                        );

                      console.log("CHUNKS", findChunks);
                      if (findChunks?.length > 0) {
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
