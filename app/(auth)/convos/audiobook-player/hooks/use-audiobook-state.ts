import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";

import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { IContent } from "@/domain/content/content.api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useListenState } from "@/app/(auth)/listen/hooks/use-listen-state";
import { useSearchParams } from "next/navigation";
import { useReadModeState } from "@/components/read-mode-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { usePreviewMode } from "@/components/settings-dialog/use-preview-mode";
import { isVideoUrl } from "../../utils/is-video-url";
import { useSearchOnlyPinyinState } from "@/components/search-only-pinyin-button";
import { useRepeatHistoryStore } from "../../_play/use-repeat-history";

export const useAudioBookState = (content: IContent) => {
  const { playbackRate } = useListenState();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const { selected, setSelected } = useSelectedItem();

  const searchParams = useSearchParams();

  const start: any = searchParams.get("start");

  const { currentTime: _currentTime = 0, setCurrentTime } = useCurrentTime(
    content.id
  );

  const currentTime = _currentTime;

  const playerRef = useRef<any>(null);

  const seek = useCallback((time: number) => {
    playerRef.current.seekTo(time, "seconds");
  }, []);

  const play = useCallback(() => {
    playerRef.current?.player?.player?.play();
  }, []);

  function pause() {
    playerRef.current?.player?.player?.pause();
  }

  const seekAndPlay = useCallback(
    (time: number) => {
      seek(time);
      play();
    },
    [seek, play]
  );

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

  const finalUrl = content?.audio;

  const onReady = useCallback(
    (data: any) => {
      if (!isReady) {
        setDuration(data.getDuration());
        const timeToStart = 7 * 60 + 12.6;

        if (start) {
          if (isVideoUrl(finalUrl)) {
            if (!currentTime && `${currentTime}` !== `${start}`) {
              seekAndPlay(start);
            }
          } else {
            seekAndPlay(start);
          }
        } else {
          seekAndPlay(0);
        }

        setIsReady(true);
      }
    },
    [isReady, start, finalUrl, currentTime, seekAndPlay]
  );

  const seekBefore = useCallback(() => {
    if (currentTranscription) {
      const currentTranscriptionIndex = Math.max(
        transcriptions?.findIndex(
          (trans: any) => trans?.start === currentTranscription?.start
        ),
        0
      );

      const prevIndex = Math.max(currentTranscriptionIndex - 1, 0);

      const prevTranscription = transcriptions?.[prevIndex];

      playerRef.current.seekTo(
        loop?.start || prevTranscription?.start,
        "seconds"
      );
    }
  }, [currentTime, transcriptions]);

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const seekAfter = useCallback(() => {
    const currentTranscriptionIndex = Math.max(
      transcriptions?.findIndex(
        (trans: any) => trans?.start === currentTranscription?.start
      ),
      0
    );

    const nextIndex = Math.min(
      currentTranscriptionIndex + 1,
      transcriptions?.length - 1
    );
    const nextTranscription = transcriptions?.[nextIndex];

    playerRef.current.seekTo(
      loop?.start || nextTranscription?.start,
      "seconds"
    );
  }, [currentTime, transcriptions]);

  useEffect(() => {
    if (!currentTime && start && isVideoUrl(finalUrl)) {
      playerRef.current.seekTo(start, "seconds");

      try {
        playerRef.current?.player?.player?.play();
      } catch (err) {
        console.error(err);
      }
    }
  }, [currentTime, finalUrl, start]);

  const handlePlayPause = useCallback(() => {
    if (!playing) {
      play();
    } else {
      pause();
    }
  }, [play, playing]);

  const { setReadMode, readMode } = useReadModeState();

  const handleSeekChange = (event: number[]) => {
    seekAndPlay(event[0]);
  };

  const audioUrl = content?.audio;

  const editMode = useContentEditStore((state) => state.editMode);

  const currentTranscription =
    loop ||
    transcriptions?.find(
      (transcription) =>
        transcription?.start <= currentTime && transcription?.end >= currentTime
    );

  const setShowPinyin = useBrightModeStore((state) => state.setShowPinyin);
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const { setNextMode } = usePreviewMode();

  const { setShowSearchOnlyPinyin, showSearchOnlyPinyin } =
    useSearchOnlyPinyinState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const togglePinyin = () => {
    setShowPinyin(!showPinyin);
  };
  const toggleSearchPinyin = useCallback(() => {
    setShowSearchOnlyPinyin(!showSearchOnlyPinyin);
  }, [setShowSearchOnlyPinyin, showSearchOnlyPinyin]);

  const { showChinglish, setShowChinglish } = useChinglishState();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (["s"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();
        toggleSearchPinyin();
      }
      if (["p"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();
        togglePinyin();
      }
      if (["r"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();
        setReadMode(!readMode);
      }
      if (
        ["c"]?.includes(event.key?.toLowerCase()) &&
        !editMode &&
        !(event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        setShowChinglish(!showChinglish);
      }
      if (["m"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();
        setNextMode();
      }

      if (["l"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();

        if (currentTranscription?.input) {
          if (loop) {
            setLoop(null);
          } else {
            setLoop(currentTranscription);
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

      if (event.code === "Space" && !editMode) {
        // Vishal 07-12-2024-10-20: prevents the browser from scrolling down
        event.preventDefault();
        handlePlayPause();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [
    seekBefore,
    seekAfter,
    editMode,
    togglePinyin,
    setReadMode,
    readMode,
    setShowChinglish,
    showChinglish,
    setNextMode,
    currentTranscription?.input,
    loop,
    audioUrl,
    handlePlayPause,
    toggleSearchPinyin,
  ]);

  const debounceSeek = useDebouncedCallback((firstStart: number) => {
    // if (loop) {
    //   setRepeatHistories({
    //     contentId: content.id,
    //     ...loop,
    //     hanzi: loop?.input || loop?.hanzi,
    //     input: loop?.input || loop?.hanzi,
    //     roman: loop?.roman || loop?.pinyin,
    //     createdAt: Date.now(),
    //   });
    // }

    seekAndPlay(firstStart);
  }, 30);

  useEffect(() => {
    if (loop) {
      const selectedWords = transcriptions?.find(
        (word) => word?.input === loop?.input
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
    onReady,
  };
};
