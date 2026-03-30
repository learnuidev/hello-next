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
    if (transcription?.id !== currentTranscription?.id) {
      setCurrentTranscription(transcription || null);
    }
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
    return Math.min(Math.max(elapsed / duration, 0), 1);
  };

  const progress = getProgressWithinLine();

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={content.audio}
          playing={playing}
          onProgress={handleProgress}
          onEnded={() => setPlaying(false)}
        />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="text-white/90 text-xl font-light tracking-tight text-center mb-4">
            {content.title}
          </h1>

          <div className="h-96 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentTranscription && (
                <motion.div
                  key={currentTranscription.id}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center space-y-8 w-full"
                >
                  <div className="text-white/30 text-sm font-mono tracking-wider">
                    {formatTime(currentTime)}
                  </div>

                  <motion.div
                    className="text-white text-3xl md:text-4xl font-light leading-relaxed tracking-wide"
                    style={{
                      y: progress * -50,
                      opacity: 1 - progress * 0.3,
                    }}
                  >
                    {currentTranscription.input}
                  </motion.div>

                  <motion.div
                    className="text-white/50 text-lg md:text-xl font-light leading-relaxed"
                    style={{
                      opacity: 1 - progress * 0.5,
                    }}
                  >
                    {currentTranscription.pinyin}
                  </motion.div>

                  <motion.div
                    className="text-white/40 text-base md:text-lg font-light leading-relaxed"
                    style={{
                      opacity: 1 - progress * 0.7,
                    }}
                  >
                    {currentTranscription.roman}
                  </motion.div>

                  <motion.div
                    className="text-white/30 text-base md:text-lg font-light leading-relaxed mt-6"
                    style={{
                      opacity: 1 - progress * 0.8,
                    }}
                  >
                    {currentTranscription.en}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
