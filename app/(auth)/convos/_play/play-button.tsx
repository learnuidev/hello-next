"use client";

import { PauseIcon, PlayIcon } from "@/components/ui/icons";

import { useHistoryStore } from "./use-history";
import { useSpeechRecognition } from "./use-speech-recognition";
import { useCurrentLesson } from "./use-current-lesson";
import { useRepeatHistoryStore } from "./use-repeat-history";

export const PlayButton = ({
  onClear,
  handleSuggestion,
  play,
  togglePlay,
  lessonId,
}: {
  onClear: () => void;
  handleSuggestion?: () => void;
  play: any;
  lessonId: any;
  togglePlay: any;
}) => {
  const {
    transcript,
    transcripts,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    lang: "",
  });

  const history = useHistoryStore((state: any) => state.history);
  const clearHistory = useHistoryStore((state: any) => state.clearHistory);

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const setLesson = useCurrentLesson((state: any) => state.setCurrentLesson);

  console.log("TRANSCRTIPT", transcript);

  return (
    <div className="fixed flex items-center top-4 space-x-8 dark:text-slate-500 font-light">
      <button
        className={`text-3xl bg-white dark:bg-black p-2 w-16 h-16 ring-1 ${
          play
            ? `dark:text-white ring-slate-900/5 dark:ring-white`
            : "ring-slate-900/5 dark:ring-slate-600 dark:text-slate-600"
        } shadow-lg rounded-full flex items-center justify-center transition`}
        onClick={() => {
          if (!play) {
            setRepeatHistories({
              lessonId: lessonId,
              eventType: "speech/repeat",
              eventTime: new Date().getTime(),
            });
          }
          togglePlay();
        }}
      >
        {play ? <PauseIcon /> : <PlayIcon className="ml-1" />}
      </button>
    </div>
  );
};
