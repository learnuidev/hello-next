import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { Slider } from "@/components/ui/slider";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";

import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import { ChinglishButton } from "@/components/chinglish-button";
import { PinyinButton } from "@/components/pinyin-button";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDebouncedCallback } from "use-debounce";
import { useListenState } from "../../listen/hooks/use-listen-state";
import { formatTime } from "../_play/utils";
import { CurrentTranscriptionView } from "./components/current-transcription-view";
import { MiniDictionary } from "./components/mini-dictionary";

export const AudiobookPlayerCore = ({ content }: { content: IContent }) => {
  const { playbackRate } = useListenState();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const { selected, setSelected } = useSelectedItem();

  const { currentTime = 0, setCurrentTime } = useCurrentTime(content.id);

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

  if (!content) {
    return;
  }

  const containsChinglish = !!transcriptions?.[0]?.chinglish;

  return (
    <MandoContextMenu lang={content?.lang || ""}>
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-8 sm:px-8 scroll-px-80">
          {currentTranscription && (
            <CurrentTranscriptionView
              containsChinglish={containsChinglish}
              seekAndPlay={seekAndPlay}
              currentTranscription={currentTranscription}
            />
          )}

          {currentTranscription && selected && (
            <MiniDictionary selected={selected} lang={content?.lang} />
          )}
        </div>

        <div className="fixed bottom-2 w-full">
          <div className="w-full max-w-3xl mx-auto p-4 py-2">
            <ReactPlayer
              playbackRate={playbackRate}
              progressInterval={100}
              url={content?.audio}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              width="100%"
              height="50px"
              onReady={(data) => {
                setIsReady(true);
                setDuration(data.getDuration());
              }}
              playing={false}
              controls={false}
              ref={playerRef}
              onProgress={(value) => {
                setCurrentTime(value.playedSeconds);
              }}
            />

            <div className="flex items-center justify-center sm:gap-8 gap-4">
              <button
                className={cn(
                  "text-xl",
                  loop
                    ? "dark:text-white text-black font-bold"
                    : "dark:text-gray-600 text-gray-300"
                )}
                onClick={() => {
                  setLoop((loop: string) => {
                    if (loop) {
                      return null;
                    }

                    return currentTranscription?.input;
                  });
                }}
              >
                <Icons.loop />
              </button>
              <button onClick={seekBefore} className="p-2 rounded-full ">
                <Icons.rotateLeft className="text-xl" />
              </button>

              <button onClick={handlePlayPause} className="rounded-full">
                {playing ? (
                  <Icons.pause className="text-2xl" />
                ) : (
                  <Icons.play className="text-2xl" />
                )}
              </button>

              <button onClick={seekAfter} className="rounded-full ">
                <Icons.rotateRight className="text-xl" />
              </button>

              <PinyinButton className="text-2xl" />
              {containsChinglish && <ChinglishButton className="text-2xl" />}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <Slider
                min={0}
                max={duration}
                step={1}
                value={[currentTime]}
                defaultValue={[currentTime]}
                onValueChange={handleSeekChange}
                className="w-full"
              />
              <span className="text-sm">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </MandoContextMenu>
  );
};
