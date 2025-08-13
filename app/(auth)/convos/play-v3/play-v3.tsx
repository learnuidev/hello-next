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

const sizes = {
  0: ["text-xs", "text-xl", "my-4", "px-[1px]"],
  1: ["text-sm", "text-2xl", "my-10", "px-[2px]"],
  2: ["text-[14px]", "text-3xl", "my-12"],
  3: ["text-[16px]", "text-4xl", "my-12", "px-[4px]"],
} as any;

function ContentDetailHeader({ content }: any) {
  return (
    <div className="text-gray-400">
      <Link href="/convos" className="hover:text-white">
        Courses
      </Link>
      {" / "}
      <span className="hover:text-white">{content?.title}</span>
    </div>
  );
}

function ActiveSubtitleDisplay({
  activeSubtitle,
  selected,
  selectedWord,
}: any) {
  const subtitleValue = selected?.en || activeSubtitle?.en || "...";

  return (
    <div className="mt-6 sticky top-0 m-auto bg-gray-50 dark:bg-[rgb(9,10,11)] z-50">
      <div className="sticky top-0 pt-4 px-2 pb-[4px] bg-gray-50 dark:bg-[rgb(9,10,11)]">
        <div className="pb-4">
          <h4 className="text-xs text-gray-500 mb-4">Sentence meaning</h4>
          <div className={`h-12 flex justify-between items-center mt-2 w-full`}>
            <p className="space-x-2 text-black dark:text-gray-300 text-[16px] font-light pb-[4px]">
              {subtitleValue}
            </p>
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

  const brightMode = useBrightModeStore((state: any) => state.mode);
  const setBrightMode = useBrightModeStore((state: any) => state.setMode);

  const searchParams = useSearchParams();

  const seekValue = searchParams?.get("seek");

  const [hovered, setHovered] = useState({});

  const [textSizeIndex, setTextSizeIndex] = useState(1);

  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);

  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);
  const setTimes = useContentEditStore((state) => state.setTimes);

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

      // const currIndex = prev?.findIndex(predicateFn);

      const currIndex = content?.transcriptions?.findIndex(predicateFn);
      const isLast = content?.transcriptions?.length - 1 === currIndex;

      console.log("EXIISTS", currIndex);
      console.log("isLast", isLast);

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
        if (karaokeMode) {
          setFocusIndex(Math.max(0, focusIndex - 1));
        }
      }
      if (event.code === "ArrowRight" && !editMode) {
        if (karaokeMode) {
          setFocusIndex(
            Math.min(content?.transcriptions?.length - 1, focusIndex + 1)
          );
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
            selected={selected}
            activeSubtitle={activeSubtitle}
          />
        )}

        <div></div>

        <div className="relative space-y-8">
          {karaokeMode ? (
            <div>
              <KaraokeMode
                play={() => {
                  togglePlay();
                }}
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
