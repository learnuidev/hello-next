"use client";

import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import { IContent } from "@/domain/content/content.api";
import {
  PlayIcon,
  PauseIcon,
  RewindIcon,
  FastForwardIcon,
} from "@/components/ui/icons";
import { TextPercentageColorizerV2 } from "@/components/text-percentage-colorizer-v2";

export function InteractiveContentPlayer({ content }: { content: IContent }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTranscription, setCurrentTranscription] = useState<
    (typeof content.transcriptions)[0] | null
  >(null);
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

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setCurrentTime(playedSeconds);
    const transcription = getCurrentTranscription();
    setCurrentTranscription(transcription || null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressWithinLine = () => {
    if (!currentTranscription) return 0;
    const duration = currentTranscription.end - currentTranscription.start;
    const elapsed = currentTime - currentTranscription.start;
    return Math.min(Math.max(elapsed / Math.max(duration, 0.1), 0), 1);
  };

  const progress = getProgressWithinLine();

  return (
    <main className="relative   overflow-hidden">
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={content.audio}
          playing={playing}
          onProgress={handleProgress}
          onEnded={() => setPlaying(false)}
          progressInterval={50}
        />
      </div>

      <div className="relative flex flex-col items-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="h-96 relative flex items-center justify-center overflow-hidden">
            {currentTranscription && (
              <div
                key={currentTranscription.id}
                className="text-center  w-full absolute"
              >
                <div className="text-white/40 text-base md:text-lg font-light leading-relaxed">
                  {currentTranscription.roman}
                </div>
                <div className="text-3xl md:text-4xl font-light leading-relaxed tracking-wide">
                  <TextPercentageColorizerV2
                    text={currentTranscription.input}
                    startTime={currentTranscription.start}
                    endTime={currentTranscription.end}
                    currentTime={currentTime}
                    words={currentTranscription?.words}
                  />
                </div>

                <div className="text-white/30 text-base md:text-lg font-light leading-relaxed mt-6">
                  {currentTranscription.en}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="max-w-md mx-auto px-6 pb-8">
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => handleSkip(-10)}
              className="text-white/50 hover:text-white/80 transition-colors duration-300"
              aria-label="Rewind 10 seconds"
            >
              <RewindIcon className="w-6 h-6" />
            </button>

            <button
              onClick={handlePlayPause}
              className="text-white hover:text-white/80 transition-colors duration-300"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <PauseIcon className="w-8 h-8" />
              ) : (
                <PlayIcon className="w-8 h-8 ml-1" />
              )}
            </button>

            <button
              onClick={() => handleSkip(10)}
              className="text-white/50 hover:text-white/80 transition-colors duration-300"
              aria-label="Forward 10 seconds"
            >
              <FastForwardIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
