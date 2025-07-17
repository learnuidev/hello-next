"use client";

import ReactPlayer from "react-player";
import { useGetMediaQuery } from "../hooks/use-get-media-query";
import { useMediaParams } from "./hooks/use-media-params";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function MediaDetails() {
  const { mediaId } = useMediaParams();

  const { data } = useGetMediaQuery(mediaId);

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(mediaId);
  const playerRef = useRef(null) as any;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 h-auto sm:h-[800px] rounded-2xl dark:bg-[rgb(21,22,23)] gap-4 p-4 justify-start">
        <div className="p-6 sm:px-16 sm:py-12  rounded">
          <p className="text-xl leading-[36px]">
            {data?.text?.split("").map((item, idx) => {
              return (
                <span
                  className={cn(
                    currentChunk
                      ? currentChunk?.start >= idx || currentChunk?.end >= idx
                        ? "text-white"
                        : "text-gray-300"
                      : "text-white",

                    currentTranslation
                      ? currentTranslation?.startChunkIndex < idx &&
                        currentTranslation?.endChunkIndex > idx
                        ? "bg-gray-700"
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

        <div className="p-6 sm:px-16 sm:py-12 rounded">
          <p className="text-xl leading-[36px]">
            {data?.mediaFile?.translations?.map((item) => {
              return (
                <span
                  className={cn(
                    JSON.stringify(item) === JSON.stringify(currentTranslation)
                      ? "text-white"
                      : "text-gray-400"
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
