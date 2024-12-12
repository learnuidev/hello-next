"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons.v2";

const lyrics = [
  "Is this the real life?",
  "Is this just fantasy?",
  "Caught in a landslide",
  "No escape from reality",
  "Open your eyes",
  "Look up to the skies and see",
  "I'm just a poor boy, I need no sympathy",
  "Because I'm easy come, easy go",
  "Little high, little low",
  "Any way the wind blows doesn't really matter to me, to me",
  "Mama, just killed a man",
  "Put a gun against his head",
  "Pulled my trigger, now he's dead",
  "Mama, life had just begun",
  "But now I've gone and thrown it all away",
];

export function KaraokeMode({
  playerRef,
  isPlaying,
  transcriptions,
  currentTime,
}: {
  transcriptions: any;
  isPlaying: any;
  currentTime: number;
  playerRef: any;
}) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  console.log("TRANSCRIPTIONS", transcriptions);

  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start < currentTime && trans?.end > currentTime
  );

  const currentTranscriptionIndex = transcriptions?.findIndex(
    (trans: any) => trans?.id === currentTranscription?.id
  );

  const isIntro = transcriptions?.[0]?.start > currentTime + 1;

  const startingTime = transcriptions?.[0]?.start - currentTime || 0;

  console.log("IS INTRO", isIntro);

  return (
    <div className="w-[700px] bg-gradient-to-b from-black to-black flex flex-col justify-center p-4">
      <div className="w-full max-w-2xl bg-black/50 backdrop-blur-md rounded-xl p-4 shadow-2xl">
        {/* Past Lyrics */}
        <div className="h-24 overflow-y-auto flex justify-center flex-col text-xs items-center">
          {transcriptions
            ?.filter((item: any) => {
              return item?.start < currentTime && item?.end < currentTime;
            })
            ?.slice(-3)

            .map((lyric: any, idx: any, ctx: any) => (
              <div
                onClick={() => {
                  playerRef.current.seekTo(lyric?.start, "seconds");

                  try {
                    playerRef.current?.player?.player?.play();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                key={JSON.stringify(lyric) + `${idx}`}
                className={cn(
                  "text-gray-600 text-lg cursor-pointer hover:text-white/75 transition-colors",
                  ctx?.length === 1
                    ? "text-gray-600"
                    : ctx?.length === 2
                      ? "text-gray-600"
                      : idx === 0
                        ? "text-gray-800"
                        : idx === 1
                          ? "text-gray-700"
                          : "text-gray-600"
                )}
              >
                {lyric?.input}
              </div>
            ))}
        </div>

        {/* Current Lyric */}
        <div className="h-44 flex justify-center overflow-hidden my-4">
          {!isPlaying && currentTime === 0 ? (
            <button
              className="text-4xl"
              onClick={() => {
                try {
                  playerRef.current?.player?.player?.play();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Icons.play />
            </button>
          ) : isIntro ? (
            <button
              className="text-4xl"
              onClick={() => {
                try {
                  playerRef.current?.player?.player?.play();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Icons.music />

              <p className="mt-4 text-gray-400 text-2xl font-extralight">
                Starting in {parseInt(`${startingTime || 0}`)}
              </p>
            </button>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(currentTranscription)}
                initial={{ y: 50, opacity: 0.4 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-4xl font-bold text-center text-white w-[700px]"
              >
                <p className="text-xl font-light text-gray-400">
                  {currentTranscription?.pinyin || currentTranscription?.roman}
                </p>
                <p>
                  {currentTranscription?.input || currentTranscription?.hanzi}
                </p>

                <p className="text-xl">{currentTranscription?.en}</p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Upcoming Lyrics */}
        <div className="h-32 overflow-y-auto mt-4 flex flex-col items-center justify-center">
          {transcriptions
            ?.filter((trans: any) => {
              return trans.start > currentTime;
            })
            ?.slice(0, 3)
            .map((lyric: any, idx: any) => (
              <div
                key={JSON.stringify(lyric)}
                className={cn(
                  "text-white/50 text-lg cursor-pointer hover:text-white/75 transition-colors",
                  idx === 0
                    ? "text-gray-600"
                    : idx === 1
                      ? "text-gray-700"
                      : "text-gray-800"
                )}
                onClick={() => {
                  playerRef.current.seekTo(lyric?.start, "seconds");

                  try {
                    playerRef.current?.player?.player?.play();
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {lyric?.input}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function LyricProgress({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <motion.div
        className="bg-blue-600 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}
