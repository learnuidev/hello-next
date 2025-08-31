import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { Slider } from "@/components/ui/slider";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";

import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { ChinglishButton } from "@/components/chinglish-button";
import { PinyinButton } from "@/components/pinyin-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDebouncedCallback } from "use-debounce";
import { useListenState } from "../../listen/hooks/use-listen-state";
import { formatTime } from "../_play/utils";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { AnimatedLoadingText } from "@/components/animated-loading-text";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";

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

      <p className="mt-12 sm:mt-32 text-lg sm:text-4xl">
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

  const { selected, setSelected } = useSelectedItem();

  return (
    <div>
      <EnView
        containsChinglish={containsChinglish}
        currentTranscription={currentTranscription}
        seekAndPlay={seekAndPlay}
      />
      {currentTranscription?.lang === "zh" && data ? (
        <div className="mt-4 sm:mt-32">
          {data?.map((item) => {
            return (
              <span
                onClick={() => {
                  if (selected === item?.hanzi) {
                    setSelected(null);
                  } else {
                    setSelected(item.hanzi);
                  }
                }}
                className="inline-flex flex-col items-center p-[2px] py-[0px] sm:p-2 justify-center"
                key={JSON.stringify(item)}
              >
                <span className="text-sm dark:text-gray-400 text-gray-800">
                  {item?.pinyin}
                </span>

                <span className="text-lg sm:text-3xl">{item?.hanzi}</span>
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
    <div className="text-center mt-8 sm:mt-24 max-w-5xl mx-auto">
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

function MiniDictionary({
  lang,
  selected,
}: {
  lang: string;
  selected: string;
}) {
  const { data: sentences } = useListSentencesQuery({
    component: selected,
    lang,
  });

  const { setSelected } = useSelectedItem();

  const { data, isLoading: isMeaningDiscoveryLoading } = useListDiscoveryQuery({
    content: selected,
    lang,
  });

  const pinyinOrRoman = data?.pinyin || data?.roman;

  return (
    <div className="w-full sm:w-96 bg-gray-50 dark:bg-[rgb(13,14,15)] rounded p-4 sm:p-8">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-bold">
          {" "}
          {selected} {pinyinOrRoman ? `(${pinyinOrRoman})` : null}{" "}
        </h4>

        <button
          onClick={() => {
            setSelected(null);
          }}
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>

      {isMeaningDiscoveryLoading ? (
        <div className="my-4">
          <AnimatedLoadingText
            className="text-xl my-8"
            message="loading dictionary..."
          />
        </div>
      ) : (
        <>
          <p className="text-gray-400 font-light text-xl">{data?.en}</p>

          <p className="text-sm mt-4 text-gray-500">
            {data?.explanation
              ? `${data?.explanation?.split(".")?.[0]}.`
              : null}
          </p>
        </>
      )}

      <div className="mt-8">
        <div className="space-y-4">
          {sentences?.slice(0, 3)?.map((sentence) => {
            return (
              <div key={sentence.id}>
                {lang === "zh" && isNonRomanLang(lang) && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {sentence?.pinyin || sentence?.roman}
                  </p>
                )}
                <p className={"text-2xl"}>
                  {sentence?.hanzi || sentence?.input}
                </p>
                <p className="text-gray-500">{sentence?.en}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const AudiobookPlayerCore = ({ content }: { content: IContent }) => {
  const { playbackRate } = useListenState();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const { selected, setSelected } = useSelectedItem();

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
    <div className="relative">
      <div className="flex flex-col sm:flex-row gap-8 sm:px-8 scroll-px-80">
        {currentTranscription && (
          <CurrentTranscriptionView
            containsChinglish={containsChinglish}
            seekAndPlay={seekAndPlay}
            currentTranscription={currentTranscription}
          />
        )}

        {selected && (
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
  );
};
