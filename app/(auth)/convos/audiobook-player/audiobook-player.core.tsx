import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { Slider } from "@/components/ui/slider";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { formatTime } from "../_play/utils";
import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import { useListenState } from "../../listen/hooks/use-listen-state";
import { PinyinButton } from "@/components/pinyin-button";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { ChinglishButton } from "@/components/chinglish-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";

interface CurrentTranscriptionProps {
  currentTranscription: ContentTranscription;
  seekAndPlay: (time: number) => void;
  containsChinglish: boolean;
}
function EnView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  const { showChinglish } = useChinglishState();
  return (
    <p
      onClick={() => {
        seekAndPlay(currentTranscription.start);
      }}
      className="text-[16px] sm:text-xl"
    >
      {showChinglish && containsChinglish
        ? currentTranscription?.chinglish
        : currentTranscription?.en}
    </p>
  );
}
function NormalView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  return (
    <div>
      <EnView
        containsChinglish={containsChinglish}
        currentTranscription={currentTranscription}
        seekAndPlay={seekAndPlay}
      />

      <p className="mt-12 sm:mt-32 text-2xl sm:text-4xl">
        {currentTranscription?.input}
      </p>
    </div>
  );
}

function PinyinView({
  currentTranscription,
  seekAndPlay,
  containsChinglish,
}: CurrentTranscriptionProps) {
  const { data } = useListDictionaryMeaningsQuery(
    currentTranscription?.input,
    currentTranscription?.lang
  );

  return (
    <div>
      <EnView
        containsChinglish={containsChinglish}
        currentTranscription={currentTranscription}
        seekAndPlay={seekAndPlay}
      />
      {currentTranscription?.lang === "zh" && data ? (
        <div className="mt-12 sm:mt-32">
          {data?.map((item) => {
            return (
              <span
                className="inline-flex flex-col items-center py-[2px] p-2 justify-center"
                key={JSON.stringify(item)}
              >
                <span className="text-sm dark:text-gray-400 text-gray-800">
                  {item?.pinyin}
                </span>

                <span className="text-xl sm:text-3xl">{item?.hanzi}</span>
              </span>
            );
          })}
        </div>
      ) : (
        <div className="mt-32">
          {isNonRomanLang(currentTranscription?.lang) ? null : (
            <p>
              {currentTranscription?.lang === "zh"
                ? currentTranscription?.pinyin
                : currentTranscription?.roman}
            </p>
          )}
          <p
            className={cn(
              currentTranscription?.lang === "zh"
                ? "text-2xl sm:text-4xl"
                : "text-[16px] sm:text-xl"
            )}
          >
            {currentTranscription?.input}
          </p>
        </div>
      )}
    </div>
  );
}

function CurrentTranscriptionView({
  currentTranscription,
  containsChinglish,
  seekAndPlay,
}: CurrentTranscriptionProps) {
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  return (
    <div className="text-center mt-24 max-w-5xl mx-auto">
      {showPinyin ? (
        <PinyinView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
        />
      ) : (
        <NormalView
          containsChinglish={containsChinglish}
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
        />
      )}
    </div>
  );
}

export const AudiobookPlayerCore = ({ content }: { content: IContent }) => {
  const { playbackRate } = useListenState();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  const { currentTime = 0, setCurrentTime } = useCurrentTime(content.id);

  const playerRef = useRef<any>(null);

  const transcriptions = content?.transcriptions || [];

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

  const currentTranscription = content?.transcriptions?.find(
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
      const selectedWords = content?.transcriptions?.find(
        (word) => word?.input === loop
      );

      if (selectedWords?.start && currentTime > selectedWords?.end) {
        debounceSeek(selectedWords?.start);
      }
    }
  }, [currentTime, content?.transcriptions, loop, debounceSeek]);

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
    <div>
      <div className="w-full max-w-3xl mx-auto p-4">
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

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className={cn(
              "text-2xl",
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
            <Icons.rewind className="text-2xl" />
          </button>

          <button onClick={handlePlayPause} className="p-3 rounded-full">
            {playing ? (
              <Icons.pause className="text-4xl" />
            ) : (
              <Icons.play className="text-4xl" />
            )}
          </button>

          <button onClick={seekAfter} className="p-2 rounded-full ">
            <Icons.fastForward className="text-2xl" />
          </button>

          <PinyinButton className="text-2xl" />
          {containsChinglish && <ChinglishButton className="text-2xl" />}
        </div>

        <div className="flex items-center gap-4 mt-4">
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

      {currentTranscription && (
        <CurrentTranscriptionView
          containsChinglish={containsChinglish}
          seekAndPlay={seekAndPlay}
          currentTranscription={currentTranscription}
        />
      )}
    </div>
  );
};
