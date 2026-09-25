import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";

import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { IContent } from "@/domain/content/content.api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useListenState } from "@/app/(auth)/listen/hooks/use-listen-state";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { useSearchParams } from "next/navigation";
import { useReadModeState } from "@/components/read-mode-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { usePreviewMode } from "@/components/settings-dialog/use-preview-mode";
import { isVideoUrl } from "../../utils/is-video-url";
import { useSearchOnlyPinyinState } from "@/components/search-only-pinyin-button";
import { useRepeatHistoryStore } from "../../_play/use-repeat-history";
import { ContentFormat } from "@/domain/content-v2/content-v2.types";
import { isYoutube } from "../../utils/is-youtube";
import { useDynamicLoop } from "./use-dynamic-loop";

function isInputFieldHoc(handler: (event: KeyboardEvent) => void) {
  return (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const isInputFocused =
      target?.tagName === "INPUT" ||
      target?.tagName === "TEXTAREA" ||
      target?.isContentEditable;

    if (isInputFocused) return;

    return handler(event);
  };
}

export const useAudioBookState = (content: IContent) => {
  const { playbackRate } = useListenState();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [_loop, setLoop] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const { selected, setSelected } = useSelectedItem();

  const searchParams = useSearchParams();

  const start: any = searchParams.get("start");

  const { currentTime: _currentTime = 0, setCurrentTime } = useCurrentTime(
    content.id,
  );

  const currentTime = _currentTime;

  const playerRef = useRef<any>(null);

  // Optional like `play` / `pause`: the dynamic loop seeks from its own frame
  // loop, which can run while the player is being swapped out.
  const seek = useCallback((time: number) => {
    playerRef.current?.seekTo(time, "seconds");
  }, []);

  const play = useCallback(() => {
    playerRef.current?.player?.player?.play();
  }, []);

  // Stable, like `play`: the dynamic loop holds on to these and a new identity
  // every render would rebuild its whole API with it.
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

  // TODO: move this at api level
  const transcriptions = useMemo(
    () => content?.transcriptions || [],
    [content?.transcriptions],
  );

  // The transcripts the reader starred with the repeat button beside them.
  // These are the section: they are what the loop button loops.
  const _toggleLoops = usePlayerViewModeStore((state) => state.toggleLoops);
  const toggleLoops = useMemo(
    () => _toggleLoops?.filter((loop: any) => loop?.contentId === content.id),
    [_toggleLoops, content.id],
  );

  // The dynamic loop: the section of the recording being looped. While it is on
  // it owns the playhead — the single line loop stands down, because two loops
  // fighting over one playhead is one too many. The selected transcripts are
  // left exactly where they are: they are the reader's choice, not ours.
  const clearLineLoops = useCallback(() => {
    setLoop(null);
  }, [setLoop]);

  const dynamicLoop = useDynamicLoop({
    transcriptions,
    selection: toggleLoops,
    duration,
    currentTime,
    playing,
    playerRef,
    seek,
    play,
    pause,
    onEnter: clearLineLoops,
    // Committing a section starts it playing: say so at once rather than
    // waiting for the player to report it, so the transport never disagrees
    // with the audio it just started.
    onCommit: () => setPlaying(true),
  });

  const iContent: any = content;

  const finalUrl =
    iContent?.mediaUrl || iContent?.youtubeUrl || content?.audio || "";

  const isVideo =
    iContent.format === ContentFormat.YOUTUBE || isVideoUrl(finalUrl);

  const isYoutubeOrVideo =
    isYoutube(content?.audio) || isVideoUrl(content?.audio);

  const onReady = useCallback(
    (data: any) => {
      const timeToStart = 7 * 60 + 12.6;

      setDuration(data.getDuration());

      if (!isReady) {
        if (isYoutubeOrVideo) {
          if (start) {
            if (isVideoUrl(finalUrl)) {
              if (!currentTime && `${currentTime}` !== `${start}`) {
                seekAndPlay(start);
              }
            } else {
              playerRef.current.seekTo(start, "seconds");

              try {
                playerRef.current?.player?.player?.play();
              } catch (err) {
                console.error(err);
              }
            }
          } else {
            seekAndPlay(0);
          }
        } else {
          if (start) {
            playerRef.current.seekTo(start, "seconds");

            try {
              playerRef.current?.player?.player?.play();
            } catch (err) {
              console.error(err);
            }
          } else {
            play();
          }
        }

        setIsReady(true);
      }
    },
    [isReady, isYoutubeOrVideo, start, finalUrl, currentTime, seekAndPlay],
  );

  const loop = transcriptions?.find((t) => t.id === _loop);

  const currentTranscription: any =
    loop ||
    transcriptions?.find(
      (transcription) =>
        transcription?.start <= currentTime &&
        transcription?.end >= currentTime,
    );

  const seekBefore = useCallback(() => {
    if (currentTranscription) {
      const currentTranscriptionIndex = Math.max(
        transcriptions?.findIndex(
          (trans: any) => trans?.id === currentTranscription?.id,
        ),
        0,
      );

      const prevIndex = Math.max(currentTranscriptionIndex - 1, 0);

      const prevTranscription = transcriptions?.[prevIndex];

      playerRef.current.seekTo(
        loop?.start || prevTranscription?.start,
        "seconds",
      );

      try {
        playerRef.current?.player?.player?.play();
      } catch (err) {
        console.error(err);
      }
    }
  }, [currentTranscription, loop?.start, transcriptions]);

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory,
  );

  const seekAfter = useCallback(() => {
    const firstTranscription = transcriptions?.[0];

    let nextIndex = 0;

    if (currentTime < firstTranscription?.start) {
      nextIndex = 0;
    } else {
      const currentTranscriptionIndex = Math.max(
        transcriptions?.findIndex(
          (trans: any) => trans?.id === currentTranscription?.id,
        ),
        0,
      );

      nextIndex = Math.min(
        currentTranscriptionIndex + 1,
        transcriptions?.length - 1,
      );
    }

    const nextTranscription = transcriptions?.[nextIndex];

    playerRef.current.seekTo(
      loop?.start || nextTranscription?.start,
      "seconds",
    );

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  }, [currentTranscription?.start, loop?.start, transcriptions]);

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
    // While a section is being chosen the transport is the section's own
    // transport: play listens to it from the top, and the loop takes over from
    // there. Pause is still pause.
    if (dynamicLoop.mode === "selecting" && dynamicLoop.range) {
      dynamicLoop.togglePreview();
      return;
    }

    if (!playing) {
      play();
    } else {
      pause();
    }
  }, [dynamicLoop, pause, play, playing]);

  const { setReadMode, readMode } = useReadModeState();

  const handleSeekChange = (event: number[]) => {
    seekAndPlay(event[0]);
  };

  const audioUrl = content?.audio;

  const editMode = useContentEditStore((state) => state.editMode);

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
    const onKeyDown = isInputFieldHoc(function onKeyDown(event: KeyboardEvent) {
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

        // The loop key follows the loop button: the same key does whatever
        // tapping it would, and only falls back to the single line loop when
        // there is no dynamic loop to talk to.
        if (dynamicLoop.mode === "selecting") {
          dynamicLoop.commit();
        } else if (dynamicLoop.mode === "active") {
          dynamicLoop.edit();
        } else if (currentTranscription?.input) {
          if (loop) {
            setLoop(null);
          } else {
            setLoop(currentTranscription.id);
          }
        }
      }

      // Done choosing: keep the section and start looping it. Leaving the
      // dynamic loop entirely is the loop button's own hold, deliberately.
      if (event.key === "Escape" && !editMode && dynamicLoop.mode === "selecting") {
        event.preventDefault();
        dynamicLoop.commit();
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
    });

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
    dynamicLoop,
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
        (word) => word?.id === loop?.id,
      );

      if (selectedWords?.start && currentTime > selectedWords?.end) {
        debounceSeek(selectedWords?.start);
      }
    }
  }, [currentTime, transcriptions, loop, debounceSeek]);

  useEffect(() => {
    // Once the section is committed the frame loop owns the wrap, and this
    // coarse 10Hz check would only fight it. Before that — the reader has
    // starred transcripts but not started the section — this is what loops
    // them, exactly as it always did.
    if (dynamicLoop.mode !== "off") {
      return;
    }

    if (toggleLoops?.length) {
      const lastEnd = Math.max(...toggleLoops?.map((x: any) => x?.end));
      const firstStart = Math.min(...toggleLoops?.map((x: any) => x?.start));

      if (currentTime > lastEnd) {
        debounceSeek(firstStart);
      }
    }
  }, [currentTime, toggleLoops, debounceSeek, dynamicLoop.mode]);

  useEffect(() => {
    if (isReady) {
      seekAndPlay(currentTime);
      if (!isYoutubeOrVideo && !start) {
        setPlaying(true);
      }
    }
  }, []);

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
    seek,
    finalUrl,
    transcriptions,
    isVideo,
    play,
    pause,
    dynamicLoop,
  };
};
