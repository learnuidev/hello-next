"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons.v2";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";

export function KaraokeMode({
  // playerRef,
  play,
  seekTo,
  isPlaying,
  transcriptions,
  currentTime,
}: {
  play: any;
  seekTo: any;
  transcriptions: any;
  isPlaying: any;
  currentTime: number;
}) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  const currentTranscription =
    transcriptions?.filter((trans: any) => trans?.end > currentTime)?.[0] ||
    transcriptions?.[0];

  const currentTranscriptionIndex = transcriptions?.findIndex(
    (trans: any) => trans?.id === currentTranscription?.id
  );

  const isIntro = transcriptions?.[0]?.start > currentTime + 1;

  const startingTime = transcriptions?.[0]?.start - currentTime || 0;

  const lastThreeLyrics = transcriptions
    ?.filter((item: any) => {
      return item?.start < currentTime && item?.end < currentTime;
    })
    ?.slice(-1);

  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

  const romanOrPinyin =
    currentTranscription?.roman || currentTranscription?.pinyin;

  return (
    <div className="mt-4  flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl  backdrop-blur-md rounded-xl p-4">
        {/* Past Lyrics */}
        {true && (
          <div
            className={cn(
              "overflow-y-auto flex justify-center flex-col text-xs items-center",
              "mb-24"
            )}
          >
            {lastThreeLyrics.map((lyric: any, idx: any, ctx: any) => (
              <div
                onClick={() => {
                  seekTo(lyric?.start);
                }}
                key={JSON.stringify(lyric) + `${idx}`}
                className={cn(
                  "text-gray-600 text-lg cursor-pointer hover:text-white/75 transition-colors",
                  "text-gray-700"
                )}
              >
                {lyric?.input || "n/a"}
              </div>
            ))}
          </div>
        )}

        {/* Current Lyric */}
        <div className="flex justify-center overflow-hidden my-4">
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
            // <AnimatePresence mode="wait">
            <div
              key={JSON.stringify(currentTranscription)}
              // initial={{ y: 50, opacity: 0.4 }}
              // animate={{ y: 0, opacity: 1 }}
              // exit={{ y: -50, opacity: 0 }}
              // transition={{ duration: 0.5, ease: "easeInOut" }}
              className={cn(
                "text-4xl font-bold text-center text-white w-[700px]",
                romanOrPinyin?.length < 16 ? "text-4x" : "text-lg"
              )}
            >
              {showPinyin && (
                <p className={cn("text-xl font-light text-gray-400")}>
                  {romanOrPinyin}
                </p>
              )}

              <p
                className={cn(
                  " dark:text-gray-200 text-black",
                  currentTranscription?.lang === "zh" ? "text-4xl" : "text-2xl"
                )}
              >
                {currentTranscription?.input || currentTranscription?.hanzi}
              </p>

              <p
                className={cn(
                  "text-xl font-light dark:text-gray-400 text-black"
                )}
              >
                {currentTranscription?.en}
              </p>
            </div>
            // </AnimatePresence>
          )}
        </div>

        {/* Upcoming Lyrics */}
        {true && (
          <div className="overflow-y-auto mt-32 flex flex-col items-center justify-center">
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
                  {showPinyin && (
                    <p className="text-lg font-light text-gray-400">
                      {lyric?.roman || lyric?.pinyin}
                    </p>
                  )}
                  <p>{lyric?.input || lyric?.hanzi}</p>

                  <p className="text-lg">{lyric?.en}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
