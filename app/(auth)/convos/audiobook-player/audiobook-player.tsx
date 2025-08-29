import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { Slider } from "@/components/ui/slider";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { formatTime } from "../_play/utils";
import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import { useListenState } from "../../listen/hooks/use-listen-state";
import { PinyinButton } from "@/components/pinyin-button";

function EnView({
  currentTranscription,
  seekAndPlay,
}: {
  currentTranscription: any;
  seekAndPlay: any;
}) {
  console.log("currentTranscription", currentTranscription);
  return (
    <p
      onClick={() => {
        seekAndPlay(currentTranscription.start);
      }}
      className="text-[16px] sm:text-xl"
    >
      {currentTranscription?.en}
    </p>
  );
}
function NormalView({
  currentTranscription,
  seekAndPlay,
}: {
  currentTranscription: any;
  seekAndPlay: any;
}) {
  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);
  return (
    <div>
      {showPinyin && <p>{currentTranscription?.pinyin}</p>}
      <p className="mb-12 sm:mb-32 text-2xl sm:text-4xl">
        {currentTranscription?.input}
      </p>
      <EnView
        currentTranscription={currentTranscription}
        seekAndPlay={seekAndPlay}
      />
    </div>
  );
}

function PinyinView({
  currentTranscription,
  seekAndPlay,
}: {
  currentTranscription: any;
  seekAndPlay: any;
}) {
  const { data } = useListDictionaryMeaningsQuery(
    currentTranscription?.input,
    currentTranscription?.lang
  );

  return (
    <div>
      {data ? (
        <div className="mb-12 sm:mb-32">
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
        <div>
          <p>{currentTranscription?.pinyin}</p>
          <p className="mb-32 text-4xl">{currentTranscription?.input}</p>
        </div>
      )}
      <EnView
        currentTranscription={currentTranscription}
        seekAndPlay={seekAndPlay}
      />
    </div>
  );
}

function CurrentTranscriptionView({
  currentTranscription,
  seekAndPlay,
}: {
  currentTranscription: any;
  seekAndPlay: any;
}) {
  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

  return (
    <div className="text-center mt-24 max-w-5xl mx-auto">
      {showPinyin && currentTranscription?.input?.length < 70 ? (
        <PinyinView
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
        />
      ) : (
        <NormalView
          currentTranscription={currentTranscription}
          seekAndPlay={seekAndPlay}
        />
      )}
    </div>
  );
}

export const AudiobookPlayer = ({ contentId }: { contentId: string }) => {
  const { playbackRate } = useListenState();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState<any>(null);

  const { data: content } = useGetContentQuery({ contentId });
  const { currentTime, setCurrentTime } = useCurrentTime(contentId);

  const playerRef = useRef<any>(null);

  const transcriptions = content?.transcriptions || [];

  const seek = (time: any) => {
    playerRef.current.seekTo(time, "seconds");
  };

  const seekBefore = useCallback(() => {
    const currentTranscription = transcriptions?.find(
      (trans: any) => trans?.start <= currentTime && trans?.end >= currentTime
    );

    if (currentTranscription) {
      const currentTranscriptionIndex = Math.max(
        transcriptions?.findIndex(
          (trans: any) => trans?.start === currentTranscription?.start
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
      (trans: any) => trans?.start <= currentTime && trans?.end >= currentTime
    );

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

    seek(nextTranscription?.start);
  }, [currentTime, transcriptions]);

  const play = () => {
    playerRef.current?.player?.player?.play();
  };

  const pause = () => {
    playerRef.current?.player?.player?.pause();
  };

  const seekAndPlay = (time: any) => {
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
    (transcription: any) =>
      transcription?.start <= currentTime && transcription?.end >= currentTime
  );

  const setShowPinyin = useBrightModeStore((state: any) => state.setShowPinyin);
  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

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

  const debounceSeek = useDebouncedCallback((firstStart: any) => {
    seekAndPlay(firstStart);
  }, 30);

  useEffect(() => {
    if (loop) {
      const selectedWords =
        content?.transcriptions?.find((word: any) => word?.input === loop) ||
        [];

      if (selectedWords?.start && currentTime > selectedWords?.end) {
        debounceSeek(selectedWords?.start);
      }
    }
  }, [currentTime, content?.transcriptions, loop, debounceSeek]);

  if (!content) {
    return;
  }

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto p-4">
        <ReactPlayer
          playbackRate={playbackRate}
          url={content?.audio}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          width="100%"
          height="50px"
          onReady={(data) => {
            if (currentTime && !playing) {
              seekAndPlay(currentTime);
            }

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
              setLoop((loop: any) => {
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
        </div>

        <div className="flex items-center gap-4 mt-4">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <Slider
            min={0}
            max={duration}
            step={1}
            defaultValue={[currentTime]}
            onValueChange={handleSeekChange}
            className="w-full"
          />
          <span className="text-sm">{formatTime(duration)}</span>
        </div>
      </div>

      {currentTranscription && (
        <CurrentTranscriptionView
          seekAndPlay={seekAndPlay}
          currentTranscription={currentTranscription}
        />
      )}
    </div>
  );
};
