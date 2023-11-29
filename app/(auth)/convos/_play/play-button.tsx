"use client";

import { PauseIcon, PlayIcon } from "@/components/ui/icons";

import { useHistoryStore } from "./use-history";

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
  const history = useHistoryStore((state: any) => state.history);
  const clearHistory = useHistoryStore((state: any) => state.clearHistory);

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const setLesson = useCurrentLesson((state: any) => state.setCurrentLesson);

  return (
    <div className="flex items-center space-x-8 dark:text-slate-500 font-light">
      <button
        className={`text-xl bg-white dark:bg-black p-2 w-12 h-12 ring-1 ${
          play
            ? `dark:text-white ring-slate-900/5 dark:ring-white`
            : "ring-slate-900/5 dark:ring-slate-300 dark:text-slate-300"
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
