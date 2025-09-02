import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";

import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { IContent } from "@/domain/content/content.api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useListenState } from "@/app/(auth)/listen/hooks/use-listen-state";
import { useSearchParams } from "next/navigation";

export const useAudioBookState = (content: IContent) => {
  const { playbackRate } = useListenState();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const { selected, setSelected } = useSelectedItem();

  const searchParams = useSearchParams();

  const start = searchParams.get("start");

  const { currentTime: _currentTime = 0, setCurrentTime } = useCurrentTime(
    content.id
  );

  const currentTime = start || _currentTime;

  const playerRef = useRef<any>(null);

  // TODO: move this at api level
  const transcriptions = (content?.transcriptions || [])?.map(
    (item, idx, ctx) => {
      if (idx === 0) {
        return {
          ...item,
          start: item?.start === 0 ? 0.1 : item?.start,
          end: ctx?.[idx + 1]?.start,
        };
      }

      return item;
    }
  );

  const seek = (time: number) => {
    playerRef.current.seekTo(time, "seconds");
  };

  const seekBefore = useCallback(() => {
    const currentTranscription = transcriptions?.find(
      (trans) => trans?.start <= currentTime && trans?.end >= currentTime
    );

    if (currentTranscription) {
      const currentTranscriptionIndex = Math.max(
        transcriptions?.findIndex(
          (trans) => trans?.start === currentTranscription?.start
        ),
        0
      );

      const prevIndex = Math.max(currentTranscriptionIndex - 1, 0);

      const prevTranscription = transcriptions?.[prevIndex];

      seek(prevTranscription?.start);
    }
  }, [currentTime, transcriptions]);

  const seekAfter = useCallback(() => {
    const currentTranscription = transcriptions?.find(
      (trans) => trans?.start <= currentTime && trans?.end >= currentTime
    );

    const currentTranscriptionIndex = Math.max(
      transcriptions?.findIndex(
        (trans) => trans?.start === currentTranscription?.start
      ),
      0
    );

    const nextIndex = Math.min(
      currentTranscriptionIndex + 1,
      transcriptions?.length - 1
    );
    const nextTranscription = transcriptions?.[nextIndex];

    seek(nextTranscription?.start);
  }, [currentTime, transcriptions]);

  const play = () => {
    playerRef.current?.player?.player?.play();
  };

  const pause = () => {
    playerRef.current?.player?.player?.pause();
  };

  const seekAndPlay = (time: number) => {
    seek(time);
    play();
  };

  const handlePlayPause = () => {
    if (!playing) {
      play();
    } else {
      pause();
    }
  };

  const handleSeekChange = (event: number[]) => {
    seekAndPlay(event[0]);
  };

  const audioUrl = content?.audio;

  const editMode = useContentEditStore((state) => state.editMode);

  const currentTranscription = transcriptions?.find(
    (transcription) =>
      transcription?.start <= currentTime && transcription?.end >= currentTime
  );

  const setShowPinyin = useBrightModeStore((state) => state.setShowPinyin);
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const togglePinyin = () => {
    setShowPinyin(!showPinyin);
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (["p"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();
        togglePinyin();
      }

      if (["l"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();

        if (currentTranscription?.input) {
          if (loop) {
            setLoop(null);
          } else {
            setLoop(currentTranscription?.input);
          }
        }
      }

      if (event.code === "ArrowLeft" && !editMode) {
        if (audioUrl) {
          seekBefore();
        }
      }
      if (event.code === "ArrowRight" && !editMode) {
        if (audioUrl) {
          seekAfter();
        }
      }

      if (event.code === "Space") {
        // Vishal 07-12-2024-10-20: prevents the browser from scrolling down
        event.preventDefault();
        handlePlayPause();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [seekBefore, seekAfter]);

  const debounceSeek = useDebouncedCallback((firstStart: number) => {
    seekAndPlay(firstStart);
  }, 30);

  useEffect(() => {
    if (loop) {
      const selectedWords = transcriptions?.find(
        (word) => word?.input === loop
      );

      if (selectedWords?.start && currentTime > selectedWords?.end) {
        debounceSeek(selectedWords?.start);
      }
    }
  }, [currentTime, transcriptions, loop, debounceSeek]);

  useEffect(() => {
    if (isReady) {
      seek(currentTime);
    }
  }, [isReady]);

  const containsChinglish = !!transcriptions?.[0]?.chinglish;

  return {
    seekAndPlay,
    selected,
    setLoop,
    loop,
    setIsReady,
    setDuration,
    setPlaying,
    playing,

    currentTranscription,

    containsChinglish,
    playerRef,
    playbackRate,
    setCurrentTime,
    seekBefore,
    handlePlayPause,
    duration,
    seekAfter,
    currentTime,
    handleSeekChange,
    start,
  };
};
