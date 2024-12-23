"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LyricLine {
  text: string;
  startTime: number; // in milliseconds
  endTime: number; // in milliseconds
}

// export const lyrics: LyricLine[] = [
//   {
//     text: "When I find myself in times of trouble",
//     startTime: 0,
//     endTime: 4000,
//   },
//   { text: "Mother Mary comes to me", startTime: 4000, endTime: 8000 },
//   {
//     text: "Speaking words of wisdom, let it be",
//     startTime: 8000,
//     endTime: 12000,
//   },
//   { text: "And in my hour of darkness", startTime: 12000, endTime: 16000 },
//   {
//     text: "She is standing right in front of me",
//     startTime: 16000,
//     endTime: 20000,
//   },
//   {
//     text: "Speaking words of wisdom, let it be",
//     startTime: 20000,
//     endTime: 24000,
//   },
//   { text: "Let it be, let it be", startTime: 24000, endTime: 28000 },
//   { text: "Let it be, let it be", startTime: 28000, endTime: 32000 },
//   {
//     text: "Whisper words of wisdom, let it be",
//     startTime: 32000,
//     endTime: 36000,
//   },
// ];

export function KaraokeModeV3({
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
  //   const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start < currentTime && trans?.end > currentTime
  );

  //   const currentLyricIndex = 1

  const finishedLyrics =
    transcriptions?.filter((item: any) => item?.start > currentTime)?.[0] ||
    transcriptions?.[0];

  const currentIndex =
    transcriptions?.findIndex(
      (trans: any) => trans?.start === finishedLyrics?.start
    ) - 1;

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setElapsedTime((prevTime) => prevTime + 100);
  //     }, 100);

  //     return () => clearInterval(timer);
  //   }, []);

  //   useEffect(() => {
  //     const currentLyric = lyrics[currentIndex];
  //     if (currentLyric && elapsedTime >= currentLyric.endTime) {
  //       setCurrentIndex((prevIndex) =>
  //         Math.min(prevIndex + 1, lyrics.length - 1)
  //       );
  //     }
  //   }, [elapsedTime, currentIndex]);

  const renderLyricLine = (lyric: any, index: number) => {
    const isCurrentLyric = index === currentIndex;
    const isPastLyric = index < currentIndex;
    const isFutureLyric = index > currentIndex;

    const opacityMap = {
      1: 0.01,
    } as any;

    const yMap = {
      1: -120,
    } as any;

    const scaleMap = {
      1: 0.6,
    } as any;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        onClick={() => {
          playerRef.current.seekTo(lyric?.start, "seconds");

          try {
            playerRef.current?.player?.player?.play();
          } catch (err) {
            console.error(err);
          }
        }}
        animate={{
          opacity: isCurrentLyric
            ? 1
            : isPastLyric
              ? opacityMap?.[currentIndex - index]
              : 0.7,

          //   opacity: isCurrentLyric ? 1 : isPastLyric ? 0.5 : 0.7,
          y: isCurrentLyric
            ? 0
            : isPastLyric
              ? yMap?.[currentIndex - index]
              : 150,
          scale: isCurrentLyric
            ? 1.5
            : isPastLyric
              ? scaleMap?.[currentIndex - index]
              : 0.7,
        }}
        transition={{ duration: 0.6 }}
        className={`absolute left-0 right-0 text-center ${
          isCurrentLyric
            ? "text-2xl font-bold"
            : isPastLyric
              ? "text-2xl"
              : "text-2xl"
        }`}
        // initial={{ opacity: 0, y: 100, scale: 0.8 }}
        // animate={{
        //   opacity: isCurrentLyric
        //     ? 1
        //     : isPastLyric
        //       ? Math.abs((1 / (currentIndex - index)) * 0.2)
        //       : 0.7,
        //   y: isCurrentLyric
        //     ? 0
        //     : isPastLyric
        //       ? -100 * (currentIndex - index)
        //       : 100,
        //   scale: isCurrentLyric ? 1.5 : Math.abs(1.5 / (currentIndex - index)),
        // }}
        // transition={{ duration: 0.5 }}
      >
        <p className="text-gray-400 font-light text-xl">
          {lyric?.pinyin || lyric?.roman}
        </p>
        <p className="text-3xl">{lyric?.input}</p>

        <p className="text-gray-500 font-bold text-xl">{lyric?.en}</p>
      </motion.div>
    );
  };

  return (
    <div className="pt-48 w-full max-w-8xl z-0 h-32" aria-live="polite">
      <AnimatePresence initial={false}>
        {transcriptions
          .slice(0, currentIndex + 2)
          .map((lyric: any, index: any) => renderLyricLine(lyric, index))}
      </AnimatePresence>
    </div>
  );

  //   return (
  //     <div className="relative h-screen w-full flex items-center justify-center bg-gray-900 text-white overflow-hidden">
  //       <div className="relative w-full max-w-8xl" aria-live="polite">
  //         <AnimatePresence initial={false}>
  //           {transcriptions
  //             .slice(0, currentIndex + 2)
  //             .map((lyric, index) => renderLyricLine(lyric, index))}
  //         </AnimatePresence>
  //       </div>
  //     </div>
  //   );
}
