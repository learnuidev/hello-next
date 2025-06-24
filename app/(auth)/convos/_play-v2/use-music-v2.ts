import { useEffect, useRef } from "react";
import { create } from "zustand";

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

export const useMusicV2 = ({ url }: { url: string }) => {
  let audio = useRef(null) as any;

  const play = useMusicStore((state: any) => state.play);
  const setPlay = useMusicStore((state: any) => state.setPlay);
  const currentTime = useMusicStore((state: any) => state.time);
  const setTime = useMusicStore((state: any) => state.setTime);

  const togglePlay = () => {
    setPlay((play: any) => !play);
  };

  useEffect(() => {
    if (play) {
      audio.current?.play();
    } else {
      audio.current?.pause();
    }
  }, [play]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((seconds: any) => audio?.current?.currentTime);
    }, 500);
    return () => clearInterval(interval);
  }, [setTime]);

  const seek = (seekTime: any) => {
    if (!play) {
      audio.current?.play();
      audio.current.currentTime = seekTime;
      setPlay(true);
    } else {
      // audio.current?.pause()
      audio.current.currentTime = seekTime;
    }
  };

  const reset = () => {
    audio.current?.pause();
    audio.current.currentTime = 0;
    setPlay(false);
  };

  useEffect(() => {
    audio.current = new Audio(url);
    audio.current.onended = (event: any) => {
      //   props?.onAudioEnd && props?.onAudioEnd();
      // setPlay(false)
      setPlay(() => false);
    };

    return () => {
      audio.current?.pause();
    };
  }, [setPlay, url]);

  return { isPlaying: play, togglePlay, seek, currentTime, reset };
};
