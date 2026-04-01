import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useListenState } from "@/app/(auth)/listen/hooks/use-listen-state";
import { useSearchParams } from "next/navigation";
import { useReadModeState } from "@/components/read-mode-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { usePreviewMode } from "@/components/settings-dialog/use-preview-mode";
import { isVideoUrl } from "@/app/(auth)/convos/utils/is-video-url";
import { useSearchOnlyPinyinState } from "@/components/search-only-pinyin-button";
import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";
import {
  SeriesContentDetails,
  AudioTranscription,
  YoutubeTranscription,
} from "@/domain/content-v2/series-content-details.types";
import { ContentFormat } from "@/domain/content-v2/series-content-details.types";

const isAudioTranscription = (
  transcription: any,
): transcription is AudioTranscription => {
  return (
    transcription &&
    typeof transcription === "object" &&
    "words" in transcription
  );
};

const isYoutubeTranscription = (
  transcription: any,
): transcription is YoutubeTranscription => {
  return (
    transcription &&
    typeof transcription === "object" &&
    "hanzi" in transcription
  );
};

export interface NormalizedTranscription {
  id: string;
  start: number;
  end: number;
  input: string;
  hanzi?: string;
  pinyin?: string;
  chinglish?: string;
  en?: string;
  roman?: string;
  lang: string;
}

export const useContentPlayerState = (content: SeriesContentDetails) => {
  const { playbackRate } = useListenState();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState<NormalizedTranscription | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { selected, setSelected } = useSelectedItem();

  const searchParams = useSearchParams();
  const start = searchParams.get("start");

  const { currentTime: _currentTime = 0, setCurrentTime } = useCurrentTime(
    content.id,
  );

  const currentTime = _currentTime;
  const playerRef = useRef<any>(null);

  const seek = useCallback((time: number) => {
    playerRef.current?.seekTo(time, "seconds");
  }, []);

  const play = useCallback(() => {
    playerRef.current?.player?.player?.play();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.player?.player?.pause();
  }, []);

  const seekAndPlay = useCallback(
    (time: number) => {
      seek(time);
      play();
    },
    [seek, play],
  );

  const normalizeTranscriptions = useCallback(
    (transcriptions: any[]): NormalizedTranscription[] => {
      return transcriptions.map((trans, idx, arr) => {
        if (isAudioTranscription(trans)) {
          const nextTrans = arr[idx + 1] as AudioTranscription;
          const firstWord = trans.words?.[0];
          const lastWord = trans.words?.[trans.words.length - 1];
          return {
            id: trans.id,
            start: firstWord?.start || trans.startIndex / 1000 || 0,
            end:
              lastWord?.end ||
              nextTrans?.startIndex / 1000 ||
              trans.endIndex / 1000 ||
              0,
            input: trans.words?.map((w: any) => w.input).join(" ") || "",
            lang: content.lang || "en",
          };
        } else if (isYoutubeTranscription(trans)) {
          const nextTrans = arr[idx + 1] as YoutubeTranscription;
          return {
            id: trans.id,
            start: trans.startIndex / 1000 || 0,
            end: nextTrans?.startIndex / 1000 || trans.endIndex / 1000 || 0,
            input: trans.hanzi || "",
            hanzi: trans.hanzi,
            pinyin: trans.pinyin,
            chinglish: trans.chinglish,
            en: trans.en,
            lang: content.lang || "zh",
          };
        }
        return {
          id: trans.id,
          start: 0,
          end: 0,
          input: "",
          lang: content.lang || "en",
        };
      });
    },
    [content.lang],
  );

  const transcriptions = normalizeTranscriptions(content?.transcriptions || []);

  const finalUrl = content?.mediaUrl || content?.youtubeUrl || "";

  const onReady = useCallback(
    (data: any) => {
      if (!isReady) {
        setDuration(data.getDuration());

        if (start) {
          if (isVideoUrl(finalUrl)) {
            if (!currentTime && `${currentTime}` !== `${start}`) {
              seekAndPlay(parseFloat(start));
            }
          } else {
            seekAndPlay(parseFloat(start));
          }
        } else {
          seekAndPlay(0);
        }

        setIsReady(true);
      }
    },
    [isReady, start, finalUrl, currentTime, seekAndPlay],
  );

  const seekBefore = useCallback(() => {
    if (currentTranscription) {
      const currentTranscriptionIndex = Math.max(
        transcriptions.findIndex(
          (trans) => trans.start === currentTranscription?.start,
        ),
        0,
      );

      const prevIndex = Math.max(currentTranscriptionIndex - 1, 0);
      const prevTranscription = transcriptions[prevIndex];

      playerRef.current?.seekTo(
        loop?.start || prevTranscription?.start,
        "seconds",
      );
    }
  }, [currentTime, transcriptions]);

  const seekAfter = useCallback(() => {
    const currentTranscriptionIndex = Math.max(
      transcriptions.findIndex(
        (trans) => trans.start === currentTranscription?.start,
      ),
      0,
    );

    const nextIndex = Math.min(
      currentTranscriptionIndex + 1,
      transcriptions.length - 1,
    );
    const nextTranscription = transcriptions[nextIndex];

    playerRef.current?.seekTo(
      loop?.start || nextTranscription?.start,
      "seconds",
    );
  }, [currentTime, transcriptions]);

  useEffect(() => {
    if (!currentTime && start && isVideoUrl(finalUrl)) {
      playerRef.current?.seekTo(parseFloat(start), "seconds");

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
  }, [play, playing, pause]);

  const { setReadMode, readMode } = useReadModeState();

  const handleSeekChange = (event: number[]) => {
    seekAndPlay(event[0]);
  };

  const editMode = useContentEditStore((state) => state.editMode);

  const currentTranscription =
    loop ||
    transcriptions.find(
      (transcription) =>
        transcription?.start <= currentTime &&
        transcription?.end >= currentTime,
    ) ||
    null;

  const setShowPinyin = useBrightModeStore((state) => state.setShowPinyin);
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const { setNextMode } = usePreviewMode();

  const { setShowSearchOnlyPinyin, showSearchOnlyPinyin } =
    useSearchOnlyPinyinState();

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
        if (finalUrl) {
          seekBefore();
        }
      }
      if (event.code === "ArrowRight" && !editMode) {
        if (finalUrl) {
          seekAfter();
        }
      }

      if (event.code === "Space" && !editMode) {
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
    finalUrl,
    handlePlayPause,
    toggleSearchPinyin,
  ]);

  const debounceSeek = useDebouncedCallback((firstStart: number) => {
    seekAndPlay(firstStart);
  }, 30);

  useEffect(() => {
    if (loop) {
      const selectedWords = transcriptions.find(
        (word) => word?.input === loop?.input,
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

  const isVideo =
    content.format === ContentFormat.YOUTUBE || isVideoUrl(finalUrl);

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
    seek,
    transcriptions,
    isVideo,
    finalUrl,
  };
};
