"use client";

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { IContent } from "@/domain/content/content.api";
import {
  PlayIcon,
  PauseIcon,
  RewindIcon,
  FastForwardIcon,
} from "@/components/ui/icons";

export function InteractiveContentPlayer({ content }: { content: IContent }) {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const getCurrentTranscription = () => {
    return content.transcriptions.find(
      (trans) => currentTime >= trans.start && currentTime <= trans.end
    );
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSkip = (seconds: number) => {
    const newTime = currentTime + seconds;
    playerRef.current?.seekTo(newTime, "seconds");
  };

  const handleProgress = ({
    played,
    playedSeconds,
  }: {
    played: number;
    playedSeconds: number;
  }) => {
    setPlayed(played);
    setCurrentTime(playedSeconds);
  };

  const currentTranscription = getCurrentTranscription();

  return (
    <main className="relative w-full min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 lg:px-12">
        <div className="w-full max-w-4xl space-y-8">
          <h1 className="text-3xl font-bold text-white text-center">
            {content.title}
          </h1>

          <div className="hidden">
            <ReactPlayer
              ref={playerRef}
              url={content.audio}
              playing={playing}
              onProgress={handleProgress}
              onEnded={() => setPlaying(false)}
            />
          </div>

          {currentTranscription && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="text-white/60 text-sm font-mono">
                  {Math.floor(currentTime / 60)}:
                  {(currentTime % 60).toFixed(2).padStart(5, "0")}
                </div>

                <div className="text-3xl md:text-4xl font-bold text-white text-center leading-relaxed">
                  {currentTranscription.input}
                </div>

                <div className="text-xl md:text-2xl text-gray-300 text-center">
                  {currentTranscription.pinyin}
                </div>

                <div className="text-lg md:text-xl text-blue-400 text-center">
                  {currentTranscription.roman}
                </div>

                <div className="text-lg md:text-xl text-green-400 text-center">
                  {currentTranscription.en}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 bg-gray-900/90 backdrop-blur-lg border-t border-white/10 px-4 py-4">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => handleSkip(-10)}
            className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-200"
            aria-label="Rewind 10 seconds"
          >
            <RewindIcon className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={handlePlayPause}
            className="bg-white hover:bg-white/90 rounded-full p-4 transition-all duration-200"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <PauseIcon className="w-6 h-6 text-gray-900" />
            ) : (
              <PlayIcon className="w-6 h-6 text-gray-900 ml-1" />
            )}
          </button>

          <button
            onClick={() => handleSkip(10)}
            className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-200"
            aria-label="Forward 10 seconds"
          >
            <FastForwardIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </main>
  );
}
