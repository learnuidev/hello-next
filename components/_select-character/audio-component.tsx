"use client";

import React, { useState } from "react";

import { PlayIcon } from "../ui/icons";

import { PauseIcon } from "lucide-react";
import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";

import { create } from "zustand";
import useSound from "use-sound";
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRecentlyWatchedContent } from "@/app/(auth)/convos/use-recently-watched-content-store";
import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

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

export const AudioComponent = ({
  currentPhrase,
  className,
  audioUrl: _audioUrl,
  icon: Icon,
}: any) => {
  const [playMusic, setPlay] = useState(false);
  // const playMusic = useMusicStore((state: any) => state.play);
  // const setPlay = useMusicStore((state: any) => state.setPlay);

  const { speak } = useSpeak(currentPhrase?.lang);

  const { recentlyWatched, setRecentlyWatched } = useRecentlyWatchedContent();

  const { data: publishedContents } = useListPublishedContentsQuery({});

  const audioUrl =
    _audioUrl ||
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

  if (currentPhrase?.contentId) {
    return (
      <Link
        onClick={() => {
          console.log("publishedContents", publishedContents);
          const contentItem = publishedContents?.items?.find(
            (content: any) => content?.id === currentPhrase?.contentId
          );

          if (contentItem) {
            setRecentlyWatched(contentItem);
          }
        }}
        href={`/convos/${currentPhrase?.contentId}${currentPhrase?.start && currentPhrase?.start !== 0 && currentPhrase?.end !== 0 ? `?start=${currentPhrase?.start}` : ""}`}
        target="_blank"
        className={cn(
          `text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${
            playMusic
              ? `dark:text-white ring-slate-900/5 dark:ring-white`
              : "ring-slate-900/5 dark:ring-slate-800 dark:text-slate-300"
          } shadow-lg rounded-full flex items-center justify-center transition hover:dark:ring-slate-300`,
          className
        )}
      >
        <PlayIcon className="ml-1" />
      </Link>
    );
  }

  return (
    <button
      className={
        Icon
          ? ""
          : cn(
              `text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${
                playMusic
                  ? `dark:text-white ring-slate-900/5 dark:ring-white`
                  : "ring-slate-900/5 dark:ring-slate-800 dark:text-slate-300"
              } shadow-lg rounded-full flex items-center justify-center transition hover:dark:ring-slate-300`,
              className
            )
      }
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
