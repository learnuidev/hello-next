import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { KaraokeMode } from "@/components/youtube-page/karaoke-mode";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { groupBy } from "ramda";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSetIfExists } from "../[content-id]/hooks/use-character-context-store";
import { useMusicV2 } from "../_play-v2/use-music-v2";
import { PlayerSettings } from "./player-settings";
import { TranscriptionsView } from "./transcriptions-view";
import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import { useFocusMode } from "./hooks/use-focus-mode";
import { useFocusIndex } from "./hooks/use-focus-index";
import { useGetContentAnalyticsQuery } from "../convo-insights/hooks/get-content-analytics-query";
// import { useUpsetContentAnalyticsHandler } from "../[content-id]/hooks/use-upsert-content-analytics-handler";
import { cn } from "@/lib/utils";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { CharacterItem } from "@/components/_select-character/character-item";
import { SubtitleInputEditor } from "./subtitle-input-editor";

const sizes = {
  0: ["text-xs", "text-xl", "my-4", "px-[1px]"],
  1: ["text-sm", "text-2xl", "my-10", "px-[2px]"],
  2: ["text-[14px]", "text-3xl", "my-12"],
  3: ["text-[16px]", "text-4xl", "my-12", "px-[4px]"],
} as any;

const textSizesV2 = {
  0: "text-xs sm:text-xl lg:text-2xl",
  1: "text-sm sm:text-2xl lg:text-3xl",
  2: "text-lg sm:text-3xl lg:text-4xl",
  3: "text-xl sm:text-4xl lg:text-5xl",
} as any;

function ContentDetailHeader({ content }: any) {
  return (
    <div className="dark:text-gray-400 text-black">
      <Link href="/convos" className="dark:hover:text-white hover:text-red-400">
        Courses
      </Link>
      {" / "}
      <span className="dark:hover:text-white hover:text-red-400">
        {content?.title}
      </span>
    </div>
  );
}

function FocusMode(props: {
  play: any;
  seekTo: any;
  transcriptions: any;
  isPlaying: any;
  currentTime: number;
  lang: string;
  focusMode?: any;
  audio?: any;
  contentId?: string;
  isFocusKaraokeMode?: boolean;
  audioUrl?: string;
  viewPinyin: boolean;
  setTimer: any;
  editMode: any;
  textSize: string;
}) {
  const {
    // playerRef,
    audioUrl,
    play,
    seekTo,
    isPlaying,
    transcriptions,
    currentTime,
    isFocusKaraokeMode,
    contentId,
    lang,
    audio,
    viewPinyin,
    setTimer,
    editMode,
    textSize,
  } = props;

  const { focusIndex, setFocusIndex } = useFocusIndex(contentId || "");

  const currentTranscription =
    isFocusKaraokeMode && !audioUrl
      ? transcriptions?.[focusIndex]
      : transcriptions?.filter((trans: any) => trans?.end > currentTime)?.[0] ||
        transcriptions?.[0];

  if (currentTranscription?.lang === "zh") {
    return (
      <div className="text-center mt-32 max-w-5xl mx-auto">
        {/* <code>
          <pre>{JSON.stringify(currentTranscription, null, 4)}</pre>
        </code>{" "} */}

        {editMode ? (
          <SubtitleInputEditor
            attribute="input"
            title="input"
            className="text-xl sm:text-3xl text-center"
            setTimer={setTimer}
            subtitle={currentTranscription}
          />
        ) : (
          <p>
            {smartSplit({
              input: currentTranscription?.input || currentTranscription?.hanzi,
              lang,
            })?.map((item: string, idx: number) => {
              return (
                <CharacterItem
                  className={cn(textSize)}
                  key={`${idx}-youtube-player-active-transcription-${item}-${idx}`}
                  character={item}
                />
              );
            })}
          </p>
        )}

        {editMode ? (
          <SubtitleInputEditor
            className="text-xl sm:text-3xl text-center"
            attribute="pinyin"
            title="pinyin"
            setTimer={setTimer}
            subtitle={currentTranscription}
          />
        ) : (
          viewPinyin && <p>{currentTranscription?.pinyin}</p>
        )}

        {editMode ? (
          <SubtitleInputEditor
            className="text-xl sm:text-3xl text-center"
            attribute="en"
            title="English"
            setTimer={setTimer}
            subtitle={currentTranscription}
          />
        ) : (
          <p
            onClick={() => {
              seekTo(currentTranscription?.start);
            }}
            className="mt-32 text-lg sm:text-2xl"
          >
            {currentTranscription?.en}
          </p>
        )}

        {/* <p className="text-xl sm:text-3xl">{currentTranscription?.input}</p> */}
      </div>
    );
  }

  return (
    <div className="text-center mt-32">
      <p>{currentTranscription?.roman}</p>
      <p>{currentTranscription?.input}</p>
    </div>
  );
}

function ActiveSubtitleDisplay({
  activeSubtitle,
  selected,
  selectedWord,
  viewPinyin,
}: any) {
  const subtitleValue = selected?.en || activeSubtitle?.en || "...";

  return (
    <div className="mt-6 sticky top-0 m-auto bg-gray-50 dark:bg-[rgb(9,10,11)] z-50 rounded-full">
      <div className="sticky top-0 pt-4 px-2 pb-[4px] bg-gray-50 dark:bg-[rgb(9,10,11)] rounded-xl">
        <div className="pb-4">
          <div
            className={cn(
              `${viewPinyin ? `h-60 sm:h-40` : `h-32 sm:h-16`} flex justify-between items-center mt-2 w-full rounded-full`,
              `text-[14px] sm:text-[16px] `
            )}
          >
            <div>
              {viewPinyin && (
                <p className="space-x-2 dark:text-gray-300 text-gray-600 font-light pb-[4px]">
                  {selected?.pinyin ||
                    activeSubtitle?.pinyin ||
                    activeSubtitle?.roman}
                </p>
              )}
              <p
                className={cn(
                  "space-x-2 text-black dark:text-gray-300 font-light pb-[4px]"
                )}
              >
                {subtitleValue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PlayV3 = ({ contentId }: { contentId: string }) => {
  const { data: content } = useGetContentQuery({ contentId });
  const [selected, setSelected] = useState<any>(null);
  const { focusMode, setFocusMode } = useFocusMode(contentId);
  const { focusIndex, setFocusIndex } = useFocusIndex(contentId);
  const [loop, setLoop] = useState<any>(null);
  const [viewPinyin, togglePinyin] = useState(false);

  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const brightMode = useBrightModeStore((state) => state.mode);
  const setBrightMode = useBrightModeStore((state) => state.setMode);

  const searchParams = useSearchParams();

  const seekValue = searchParams?.get("seek");

  const { data } = useGetContentAnalyticsQuery({ contentId });

  const [hovered, setHovered] = useState({});

  const [textSizeIndex, setTextSizeIndex] = useState(1);

  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);

  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);
  const setTimes = useContentEditStore((state) => state.setTimes);

  // const { upsertContentAnalyticsHandler } =
  //   useUpsetContentAnalyticsHandler(contentId);

  const audioUrl = content?.audio;
  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: audioUrl,
  });

  const updateContentMutation = useUpdateContentMutation();

  const increaseFontSize = useCallback(() => {
    setTextSizeIndex((prev) => Math.min(3, prev + 1));
  }, [setTextSizeIndex]);
  const decreaseFontSize = useCallback(() => {
    setTextSizeIndex((prev) => Math.max(0, prev - 1));
  }, [setTextSizeIndex]);

  const viewMode = "stats";

  const activeSubtitle = content?.transcriptions?.find(
    (subtitle: any) =>
      currentTime > subtitle?.start && currentTime < subtitle.end
  );

  const textSize = sizes?.[textSizeIndex] || sizes?.[1];
  const textSizeV2 = textSizesV2?.[textSizeIndex];

  const setIfExists = useSetIfExists();

  const lang = useGetCurrentLang();
  const karaokeMode = focusMode === true || (brightMode && lang !== "zh");

  const setTimer = (
    type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
    example: any,
    newValue?: string
  ) => {
    const offset = newValue || currentTime - 0.2;

    setTimes((prev: any) => {
      const predicateFn = (item: any) => item?.id === example?.id;
      const exists = prev?.find(predicateFn);

      let updated = prev;

      const currIndex = content?.transcriptions?.findIndex(predicateFn);
      const isLast = content?.transcriptions?.length - 1 === currIndex;

      if (!isLast && type === "end") {
        const nextIndex = currIndex + 1;
        const nextExample = content?.transcriptions?.[nextIndex];
        const nextExists = prev?.find(
          (item: any) => item?.id === nextExample?.id
        );

        if (nextExists) {
          updated = updated.map((item: any) => {
            if (item?.id === nextExample?.id) {
              return {
                ...nextExists,
                ["start"]: offset,
              };
            }

            return item;
          });
        } else {
          updated = updated.concat({
            id: nextExample?.id,
            start: offset,
          });
        }
      }

      if (exists) {
        updated = updated.map((item: any) => {
          if (item?.id === example?.id) {
            return {
              ...exists,
              [type]: offset,
            };
          }

          return item;
        });
      }

      updated = updated.concat({
        id: example?.id,
        [type]: offset,
      });

      return updated;
    });
  };

  const setTimer2 = (
    type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
    section: any,
    newValue?: string
  ) => {
    const offset = newValue || currentTime - 0.2;
    setTimes((prev: any) => {
      const exists = prev?.find((item: any) => item?.id === section?.id);

      if (exists) {
        return prev.map((item: any) => {
          if (item?.id === section?.id) {
            return {
              ...exists,
              [type]: offset,
            };
          }

          return item;
        });
      }

      return prev.concat({
        id: section?.id,
        [type]: offset,
      });
    });
  };

  const transcriptions = content?.transcriptions;

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

      // playerRef.current.seekTo(prevTranscription?.start, "seconds");

      // try {
      //   playerRef.current?.player?.player?.play();
      // } catch (err) {
      //   console.error(err);
      // }
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

    // playerRef.current.seekTo(nextTranscription?.start, "seconds");

    // try {
    //   playerRef.current?.player?.player?.play();
    // } catch (err) {
    //   console.error(err);
    // }
  }, [currentTime, transcriptions]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (["p"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();
        togglePinyin((pinyin) => !pinyin);
      }

      if (["-"]?.includes(event.key) && !editMode) {
        event.preventDefault();

        decreaseFontSize();
      }
      if (["="]?.includes(event.key) && !editMode) {
        event.preventDefault();

        increaseFontSize();
      }

      if (["l"]?.includes(event.key?.toLowerCase()) && !editMode) {
        event.preventDefault();

        if (activeSubtitle?.input) {
          if (loop) {
            setLoop(null);
          } else {
            setLoop(activeSubtitle?.input);
          }
        }
      }

      if (event.code === "ArrowLeft" && !editMode) {
        if (karaokeMode && !audioUrl) {
          const newFocusIndex = Math.max(0, focusIndex - 1);
          setFocusIndex(newFocusIndex);

          // upsertContentAnalyticsHandler({ focusIndex: newFocusIndex });
        }

        if (audioUrl) {
          seekBefore();
        }
      }
      if (event.code === "ArrowRight" && !editMode) {
        if (karaokeMode && !audioUrl) {
          const newFocusIndex = Math.min(
            content?.transcriptions?.length - 1,
            focusIndex + 1
          );
          setFocusIndex(newFocusIndex);

          // upsertContentAnalyticsHandler({ focusIndex: newFocusIndex });
        }

        if (audioUrl) {
          seekAfter();
        }
      }

      if (event.code === "Space" && !editMode) {
        // Vishal 07-12-2024-10-20: prevents the browser from scrolling down
        event.preventDefault();
        togglePlay();
      }
      if (event.code === "Escape" && !editMode) {
        // Vishal 07-12-2024-10-30: prevents the browser from escaping fullscreen mode
        event.preventDefault();
        reset();
      }

      if (["s"]?.includes(event.key)) {
        event.preventDefault();
        reset();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [
    karaokeMode,
    togglePlay,
    togglePinyin,
    reset,
    loop,
    increaseFontSize,
    decreaseFontSize,
    activeSubtitle?.input,
    editMode,
    audioUrl,
    seekBefore,
    seekAfter,
  ]);

  const debounceSeek = useDebouncedCallback((selectedWords: any) => {
    seek(selectedWords?.start);
  }, 30);

  // const searchParams = useSearchParams();

  const start = searchParams.get("start");

  useEffect(() => {
    if (start) {
      seek(start);

      // try {
      //   playerRef.current?.player?.player?.play();
      // } catch (err) {
      //   console.error(err);
      // }
    }
  }, [start]);

  useEffect(() => {
    if (loop) {
      const selectedWords =
        content?.transcriptions?.find((word: any) => word?.input === loop) ||
        [];

      if (selectedWords?.start && currentTime > selectedWords?.end) {
        debounceSeek(selectedWords);
      }
    }
  }, [currentTime, content?.transcriptions, loop, debounceSeek]);

  const groupBySectionId = groupBy((item: any) => item.sectionId);

  const currentTransription =
    content?.transcriptions?.filter(
      (item: any) => item?.start < currentTime
    )?.[0] || content?.transcriptions?.[0];

  return (
    <MandoContextMenu lang={content?.lang || ""}>
      <div className="relative">
        <ContentDetailHeader content={content} />

        {karaokeMode ? null : brightMode && lang !== "zh" ? null : (
          <ActiveSubtitleDisplay
            selectedWord={hovered}
            viewPinyin={viewPinyin}
            selected={selected}
            activeSubtitle={activeSubtitle}
          />
        )}

        <div></div>

        <div className="relative space-y-8">
          {karaokeMode ? (
            <div>
              <FocusMode
                play={() => {
                  togglePlay();
                }}
                textSize={textSizeV2}
                editMode={editMode}
                setTimer={setTimer}
                viewPinyin={viewPinyin}
                audioUrl={audioUrl}
                isFocusKaraokeMode={karaokeMode}
                contentId={contentId}
                lang={lang}
                currentTime={currentTime}
                isPlaying={isPlaying}
                transcriptions={content?.transcriptions}
                seekTo={(start: number) => {
                  seek(start);
                }}
              />
            </div>
          ) : (
            <TranscriptionsView
              contentId={contentId}
              setSelected={setSelected}
              textSize={textSize}
              viewPinyin={viewPinyin}
              setIfExists={setIfExists}
              currentTime={currentTime}
              activeSubtitle={activeSubtitle}
              brightMode={brightMode}
              isCharactersLoading={isCharactersLoading}
              learnedCharacters2={learnedCharacters2}
              components={components}
              loop={loop}
              setLoop={setLoop}
              seek={seek}
              editMode={editMode}
              setTimer={setTimer}
            />
          )}
        </div>

        <PlayerSettings
          seekBefore={seekBefore}
          seekAfter={seekAfter}
          audioUrl={audioUrl}
          isFocusKaraokeMode={karaokeMode}
          contentId={contentId}
          editMode={editMode}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          togglePlay={togglePlay}
          isPlaying={isPlaying}
          loop={loop}
          activeSubtitle={activeSubtitle}
          currentTime={currentTime}
          setLoop={setLoop}
          textSizeIndex={textSizeIndex}
          reset={reset}
          updateContentMutation={updateContentMutation}
          setEditMode={setEditMode}
          viewMode={viewMode}
          brightMode={brightMode}
          content={content}
          times={times}
          togglePinyin={togglePinyin}
          viewPinyin={viewPinyin}
          setBrightMode={setBrightMode}
          audio={content?.audio}
        />
      </div>
    </MandoContextMenu>
  );
};
