"use client";

import React from "react";

import { PlayIcon } from "../ui/icons";

import { PauseIcon } from "lucide-react";
import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";

import { create } from "zustand";
import useSound from "use-sound";
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { cn } from "@/lib/utils";

const useMusicStore = create((set: any, get: any) => ({
  play: false,
  setPlay: (f: any) =>
    typeof f === "function" ? set({ play: f(get().play) }) : set({ play: f }),
  time: 0,
  setTime: (f: any) =>
    typeof f === "function" ? set({ time: f(get().time) }) : set({ time: f }),
  results: {},
  setResults: (f: any) =>
    typeof f === "function"
      ? set({ results: f(get().results) })
      : set({ results: f }),
}));

export const AudioComponent = ({ currentPhrase, className }: any) => {
  const playMusic = useMusicStore((state: any) => state.play);
  const setPlay = useMusicStore((state: any) => state.setPlay);

  const { speak } = useSpeak(currentPhrase?.lang);

  const audioUrl =
    currentPhrase?.audio?.female ||
    currentPhrase?.audio?.male ||
    currentPhrase?.audio ||
    currentPhrase?.sourceUrl;
  // ||
  // "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.us-east-1.amazonaws.com/learnuidev@gmail.com/01J2F7ACPKCVZ0WFRTTZNT543E.m4a";

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const [play, { stop, isPlaying }] = useSound(audioUrl) as any;

  return (
    <button
      className={cn(
        `text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${
          playMusic
            ? `dark:text-white ring-slate-900/5 dark:ring-white`
            : "ring-slate-900/5 dark:ring-slate-800 dark:text-slate-300"
        } shadow-lg rounded-full flex items-center justify-center transition hover:dark:ring-slate-300`,
        className
      )}
      onClick={() => {
        if (audioUrl) {
          if (playMusic && false) {
            stop();
            setPlay(false);
          } else {
            play();
            setPlay(true);

            setRepeatHistories({
              ...currentPhrase,
              eventType: "sentence/repeat",
              eventTime: Date.now(),
            });
          }
        } else {
          speak(currentPhrase?.hanzi || currentPhrase?.input);
        }
      }}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon className="ml-1" />}
    </button>
  );
};
