"use client";

import React from "react";

import { PlayIcon } from "../ui/icons";

import { useMusic } from "@/app/(auth)/convos/_play/use-music";
import { PauseIcon } from "lucide-react";
import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";

export const AudioComponent = ({ currentPhrase }: any) => {
  const { play, togglePlay, seek, currentTime, reset } = useMusic({
    url:
      currentPhrase?.audio?.female ||
      currentPhrase?.audio?.male ||
      currentPhrase?.audio,
  });

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  return (
    <button
      className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${
        play
          ? `dark:text-white ring-slate-900/5 dark:ring-white`
          : "ring-slate-900/5 dark:ring-slate-300 dark:text-slate-300"
      } shadow-lg rounded-full flex items-center justify-center transition`}
      onClick={() => {
        if (!play) {
          setRepeatHistories({
            ...currentPhrase,
            eventType: "sentence/repeat",
            eventTime: new Date().getTime(),
          });
        }
        togglePlay();
      }}
    >
      {play ? <PauseIcon /> : <PlayIcon className="ml-1" />}
    </button>
  );
};
