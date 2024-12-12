"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LyricLine {
  text: string;
  startTime: number; // in milliseconds
  endTime: number; // in milliseconds
}

export const lyrics: LyricLine[] = [
  {
    text: "When I find myself in times of trouble",
    startTime: 0,
    endTime: 4000,
  },
  { text: "Mother Mary comes to me", startTime: 4000, endTime: 8000 },
  {
    text: "Speaking words of wisdom, let it be",
    startTime: 8000,
    endTime: 12000,
  },
  { text: "And in my hour of darkness", startTime: 12000, endTime: 16000 },
  {
    text: "She is standing right in front of me",
    startTime: 16000,
    endTime: 20000,
  },
  {
    text: "Speaking words of wisdom, let it be",
    startTime: 20000,
    endTime: 24000,
  },
  { text: "Let it be, let it be", startTime: 24000, endTime: 28000 },
  { text: "Let it be, let it be", startTime: 28000, endTime: 32000 },
  {
    text: "Whisper words of wisdom, let it be",
    startTime: 32000,
    endTime: 36000,
  },
];

export function KaraokeModeV3(props: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 100);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const currentLyric = lyrics[currentIndex];
    if (currentLyric && elapsedTime >= currentLyric.endTime) {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, lyrics.length - 1)
      );
    }
  }, [elapsedTime, currentIndex]);

  const renderLyricLine = (lyric: LyricLine, index: number) => {
    const isCurrentLyric = index === currentIndex;
    const isPastLyric = index < currentIndex;
    const isFutureLyric = index > currentIndex;

    const opacityMap = {
      0: 1,
      1: 0.5,
      2: 0.3,
      3: 0.1,
      4: 0,
    } as any;

    const yMap = {
      0: -70,
      1: -120,
      2: -160,
      3: -190,
      4: -140,
    } as any;

    const scaleMap = {
      0: 0.95,
      1: 0.8,
      2: 0.6,
      3: 0.5,
      4: 0.4,
    } as any;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
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
              : 120,
          scale: isCurrentLyric
            ? 1
            : isPastLyric
              ? scaleMap?.[currentIndex - index]
              : 0.8,
        }}
        transition={{ duration: 0.5 }}
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
        {lyric.text}
      </motion.div>
    );
  };

  return (
    <div className="pt-48 w-full max-w-8xl z-0 h-32" aria-live="polite">
      <AnimatePresence initial={false}>
        {lyrics
          .slice(0, currentIndex + 2)
          .map((lyric, index) => renderLyricLine(lyric, index))}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      <div className="relative w-full max-w-8xl" aria-live="polite">
        <AnimatePresence initial={false}>
          {lyrics
            .slice(0, currentIndex + 2)
            .map((lyric, index) => renderLyricLine(lyric, index))}
        </AnimatePresence>
      </div>
    </div>
  );
}
