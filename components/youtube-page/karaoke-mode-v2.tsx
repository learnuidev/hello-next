import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { finished } from "stream";

const variants = {
  completed: (order: number) => ({
    y: -50 * (Math.abs(order) + 1),
    opacity: 0.5 - Math.abs(order) * 0.1,
    scale: 0.9 - Math.abs(order) * 0.05,
    transition: { duration: 0.5 },
  }),
  current: (order: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  }),
  upcoming: (order: number) => ({
    y: 50 * order,
    opacity: 0.5 - order * 0.1,
    scale: 0.9 - order * 0.05,
    transition: { duration: 0.5 },
  }),
};

interface LyricLineProps {
  lyrics: {
    pinyin?: string;
    roman?: string;
    input?: string;
    hanzi?: string;
    en?: string;
    start: number;
    end: number;
  };
  playerRef: any;
  status: "completed" | "current" | "upcoming";
  order: number;
}

export default function LyricLine({
  lyrics,
  status,
  order,
  playerRef,
}: LyricLineProps) {
  return (
    <motion.div
      className="text-center my-2"
      initial={status === "upcoming" ? "upcoming" : "completed"}
      animate={status}
      exit="completed"
      variants={variants}
      custom={order}
      onClick={() => {
        playerRef.current.seekTo(lyrics?.start, "seconds");

        try {
          playerRef.current?.player?.player?.play();
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <span className="text-2xl font-bold">{lyrics?.input}</span>
    </motion.div>
  );
}

interface Lyric {
  id: number;
  text: string;
  duration: number;
}

const lyrics: Lyric[] = [
  { id: 1, text: "I'm a little teapot", duration: 3000 },
  { id: 2, text: "Short and stout", duration: 3000 },
  { id: 3, text: "Here is my handle", duration: 3000 },
  { id: 4, text: "Here is my spout", duration: 3000 },
  { id: 5, text: "When I get all steamed up", duration: 3000 },
  { id: 6, text: "Hear me shout", duration: 3000 },
  { id: 7, text: "Tip me over", duration: 3000 },
  { id: 8, text: "And pour me out!", duration: 3000 },
];

export function KaraokeModeV2({
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
  // const [currentLyricIndex, setCurrentLyricIndex] = useState(0)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentLyricIndex((prevIndex) => {
  //       if (prevIndex < lyrics.length - 1) {
  //         return prevIndex + 1
  //       }
  //       clearInterval(timer)
  //       return prevIndex
  //     })
  //   }, lyrics[currentLyricIndex].duration)

  //   return () => clearInterval(timer)
  // }, [currentLyricIndex])

  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start < currentTime && trans?.end > currentTime
  );

  //   const currentLyricIndex = 1

  const finishedLytics =
    transcriptions?.filter((item: any) => item?.start > currentTime)?.[0] ||
    transcriptions?.[0];

  const currentLyricIndex = transcriptions?.findIndex(
    (trans: any) => trans?.start === finishedLytics?.start
  );

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl">
        <AnimatePresence>
          {transcriptions.map((lyric: any, index: any) => (
            <LyricLine
              playerRef={playerRef}
              key={lyric.id}
              lyrics={lyric}
              status={
                lyric?.start < currentTime && lyric?.end < currentTime
                  ? //   index < currentLyricIndex
                    "completed"
                  : currentTranscription?.start === lyric?.start
                    ? // : index === currentLyricIndex
                      "current"
                    : "upcoming"
              }
              order={index - currentLyricIndex}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
