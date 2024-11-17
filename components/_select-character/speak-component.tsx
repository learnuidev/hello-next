"use client";

import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";

import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import useSound from "use-sound";
import { create } from "zustand";
import { Icons } from "../ui/icons.v2";

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

export const SpeakComponent = ({ currentPhrase }: any) => {
  const playMusic = useMusicStore((state: any) => state.play);
  const setPlay = useMusicStore((state: any) => state.setPlay);

  const { speak } = useSpeak();

  const audioUrl =
    currentPhrase?.audio?.female ||
    currentPhrase?.audio?.male ||
    currentPhrase?.audio;

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const [play, { stop, isPlaying }] = useSound(audioUrl) as any;

  return (
    <button
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
      <Icons.volume />
    </button>
  );
};
