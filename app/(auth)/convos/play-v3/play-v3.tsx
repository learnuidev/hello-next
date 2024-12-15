import { Icons } from "@/components/ui/icons.v2";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useMusicV2 } from "../_play-v2/use-music-v2";
import { formatTime } from "../_play/utils";
import { groupBy } from "ramda";

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

function ActiveSubtitleDisplay({ activeSubtitle, selected }: any) {
  return (
    <div className="mt-6 m-auto relative">
      <div className="sticky top-0 pt-4 pb-[4px] bg-[rgb(9,10,11)]">
        <div className="pb-4">
          <h4 className="text-xs text-gray-500">Sentence meaning</h4>
          <div className="h-16 flex justify-between items-center mt-2 w-full">
            <p className="space-x-2 sm:text-xl text-[16px] font-extralight pb-[4px]">
              {activeSubtitle?.en || selected?.en || "..."}
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
  const [loop, setLoop] = useState<any>(null);
  const [viewPinyin, togglePinyin] = useState(false);

  const [textSizeIndex, setTextSizeIndex] = useState(1);

  const audioUrl = content?.audio;
  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: audioUrl,
  });

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

  const groupBySectionId = groupBy((item: any) => item.sectionId);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      //   if (event.code === "ArrowLeft" || event.code === "ArrowUp") {
      //     event.preventDefault();
      //     getPreviousChapter();
      //   }

      //   if (event.code === "ArrowRight" || event.code === "ArrowDown") {
      //     event.preventDefault();
      //     getNextChapter();
      //   }

      if (["p"]?.includes(event.key)) {
        event.preventDefault();
        togglePinyin((pinyin) => !pinyin);
      }

      if (["-"]?.includes(event.key)) {
        event.preventDefault();

        decreaseFontSize();
      }
      if (["="]?.includes(event.key)) {
        event.preventDefault();

        increaseFontSize();
      }

      //   if (["a"]?.includes(event.key)) {
      //     event.preventDefault();
      //     setViewMode((viewMode) => (viewMode === "stats" ? "core" : "stats"));
      //     // togglePinyin((pinyin) => !pinyin);
      //   }

      if (["l"]?.includes(event.key)) {
        event.preventDefault();
        // togglePinyin((pinyin) => !pinyin);

        if (activeSubtitle?.input) {
          if (loop) {
            setLoop(null);
          } else {
            setLoop(activeSubtitle?.input);
          }
        }
      }

      if (event.code === "Space") {
        // Vishal 07-12-2024-10-20: prevents the browser from scrolling down
        event.preventDefault();
        togglePlay();
      }
      if (event.code === "Escape") {
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
    togglePlay,
    togglePinyin,
    reset,
    loop,
    increaseFontSize,
    decreaseFontSize,
    activeSubtitle?.input,
  ]);

  useEffect(() => {
    if (loop) {
      const interval = setInterval(() => {
        const selectedWords =
          content?.transcriptions?.find((word: any) => word?.input === loop) ||
          [];

        if (selectedWords?.start && currentTime > selectedWords?.end) {
          seek(selectedWords?.start);
        }
        // setTime((seconds) => playerRef?.current?.getCurrentTime());
      }, 5);
      return () => clearInterval(interval);
    }
  }, [currentTime, content?.transcriptions, loop, seek]);

  return (
    <div className="relative">
      <ContentDetailHeader content={content} />

      <ActiveSubtitleDisplay
        selected={selected}
        activeSubtitle={activeSubtitle}
      />

      <div></div>

      <div className="relative space-y-8">
        {content?.transcriptions?.map((subtitle: any) => {
          return (
            // <HanziTooltip
            //   component={{
            //     hanzi: subtitle?.hanzi,
            //     en: subtitle?.meaning || "",
            //     pinyin: subtitle?.pinyin,
            //   }}
            //   key={JSON.stringify(subtitle)}
            // >
            <span
              onMouseEnter={() => {
                setSelected(subtitle);
              }}
              onMouseLeave={() => {
                setSelected(null);
              }}
              key={JSON.stringify(subtitle)}
              className={cn(
                "inline-flex flex-col mt-2 items-start px-[2px]",
                textSize?.[3]
              )}
            >
              {viewPinyin && (
                <Link
                  // onClick={() => {
                  //   alert(JSON.stringify(getHanzi(subtitle?.sentence)));
                  // }}
                  href={`/nmm/${subtitle.hanzi}?lang=zh`}
                  target="_blank"
                  className={cn(
                    subtitle?.pinyin ? "text-gray-500" : "text-black",
                    "text-sm",
                    currentTime > subtitle?.start && currentTime < subtitle.end
                      ? "text-white "
                      : "text-gray-500",

                    textSize?.[0],
                    activeSubtitle?.sentence === subtitle?.sentence
                      ? "text-gray-400"
                      : "text-gray-600",
                    currentTime > subtitle?.start && currentTime < subtitle.end
                      ? "text-white"
                      : "",
                    currentTime === 0 ? "text-gray-300" : "",
                    "text-start"
                  )}
                >
                  {subtitle?.pinyin || subtitle?.roman || ""}
                </Link>
              )}
              <button
                onClick={() => {
                  if (loop) {
                    setLoop(subtitle.sentence);
                  }
                  seek(subtitle?.start);
                }}
                className={cn(
                  "text-3xl font-light text-gray-300 hover:text-rose-400 text-left",

                  textSize?.[1],
                  activeSubtitle?.sentence === subtitle?.sentence
                    ? "text-gray-400"
                    : "text-gray-600",
                  currentTime > subtitle?.start && currentTime < subtitle.end
                    ? "text-white"
                    : "0",
                  currentTime === 0 ? "text-gray-300" : ""
                )}
              >
                {subtitle?.input || subtitle?.hanzi}
                {"   "}
              </button>
            </span>
            // </HanziTooltip>
          );
        })}
      </div>

      {/* <div>
        <code>
          <pre>{JSON.stringify(content, null, 4)}</pre>
        </code>
      </div> */}

      {/* <div className="fixed bottom-0 w-full z-30 m-auto bg-[rgb(12,13,14)]"> */}
      <div className="fixed bottom-0 py-4 px-4 sm:px-16 w-full z-30 m-auto bg-[rgb(12,13,14)]">
        <section className="flex items-center justify-between">
          <div className="space-x-2">
            <button
              onClick={increaseFontSize}
              className={cn(
                textSizeIndex === 3 ? "text-gray-400" : "",
                "text-2xl"
              )}
            >
              A
            </button>

            <button
              onClick={decreaseFontSize}
              className={textSizeIndex === 0 ? "text-gray-400" : ""}
            >
              A
            </button>
          </div>

          <div className="sm:space-x-6 space-x-4 flex items-center">
            <button
              className="sm:text-2xl text-lg"
              onClick={() => {
                togglePlay();
              }}
            >
              {isPlaying ? <Icons.pause /> : <Icons.play />}
            </button>

            <button
              className={cn(
                "sm:text-2xl text-lg",
                loop ? "text-white" : "text-gray-600"
              )}
              disabled={!activeSubtitle}
              onClick={() => {
                setLoop((loop: any) => {
                  if (loop) {
                    return null;
                  }

                  return activeSubtitle?.input;
                });
              }}
            >
              <Icons.loop />
            </button>

            <p className="font-extralight sm:text-2xl text-xl text-center dark:text-slate-300 text-slate-600">
              {formatTime(currentTime)}
            </p>

            <button
              className="sm:text-2xl text-lg"
              onClick={() => {
                reset();
              }}
            >
              <Icons.stop />
            </button>
          </div>

          {/* <DuChapterNavbar /> */}

          <div className="space-x-4 sm:space-x-8 flex items-center justify-start">
            <button
              onClick={() => {
                //   setViewMode((viewMode) => (viewMode === "stats" ? "core" : "stats"));
                // togglePinyin((pinyin) => !pinyin);
              }}
            >
              <Icons.chartColumn
                className={cn(
                  "sm:text-2xl text-2xl",
                  viewMode === "stats" ? "text-white" : "text-gray-400"
                )}
              />
            </button>
            <button
              onClick={() => {
                togglePinyin((pinyin) => !pinyin);
              }}
            >
              <Icons.language
                className={cn(
                  "sm:text-2xl text-2xl",
                  viewPinyin ? "text-white" : "text-gray-400"
                )}
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
