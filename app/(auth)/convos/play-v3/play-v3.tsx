import { Icons } from "@/components/ui/icons.v2";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useMusicV2 } from "../_play-v2/use-music-v2";
import { formatTime } from "../_play/utils";
import { groupBy, splitEvery } from "ramda";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useCharacterContextStore } from "../[content-id]/hooks/use-character-context-store";
import { useSearchParams } from "next/navigation";

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
  return (
    <div className="mt-6 sticky top-0 m-auto bg-[rgb(9,10,11)] z-50">
      <div className="sticky top-0 pt-4 pb-[4px] bg-[rgb(9,10,11)]">
        <div className="pb-4">
          <h4 className="text-xs text-gray-500">Sentence meaning</h4>
          <div className="h-16 flex justify-between items-center mt-2 w-full">
            <p className="space-x-2 text-[16px] font-extralight pb-[4px]">
              {activeSubtitle?.en || selected?.en || "..."}
            </p>
          </div>
        </div>
        {/* <div className="pb-4">
          <h4 className="text-xs text-gray-500">Word meaning</h4>
          <div className="h-16 flex justify-between items-center mt-2 w-full">
            <p className="space-x-2 text-[16px] font-extralight pb-[4px]">
              {JSON.stringify(selectedWord)}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export const PlayV3 = ({ contentId }: { contentId: string }) => {
  const { data: content } = useGetContentQuery({ contentId });
  const [selected, setSelected] = useState<any>(null);
  const [loop, setLoop] = useState<any>(null);
  const [viewPinyin, togglePinyin] = useState(false);

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

  const groupBySectionId = groupBy((item: any) => item.sectionId);

  const context = useCharacterContextStore((state) => state.context);
  const setContext = useCharacterContextStore((state) => state.setContext);

  const setIfExists = (evt: any) => {
    console.log("EVT", evt);
    const exists = context?.filter(
      (ctx: any) => (ctx?.input || ctx?.hanzi) === (evt?.input || evt?.hanzi)
    )?.[0];

    if (exists) {
      console.log("EXISTS", exists);
      // return setContext(context);
      return null;
    }
    setContext((prev: any) => prev?.concat(evt));
    return null;
  };

  const setTimer = (
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const zhongWenWindow = document.getElementById("zhongwen-window") as any;

  //     if (zhongWenWindow) {
  //       try {
  //         const hanzi =
  //           document.querySelectorAll(".w-hanzi-small")?.[0]?.innerHTML;
  //         const pinyin =
  //           document.querySelectorAll(".w-pinyin-small")?.[0]?.innerHTML;
  //         const en = [...document.querySelectorAll(".w-def-small")]?.map(
  //           (node) => node?.innerHTML
  //         );

  //         const children = splitEvery(5, [...zhongWenWindow.children])
  //           .map((item) => {
  //             return item.map((node) => node?.innerText);
  //           })
  //           ?.map((values) => {
  //             return {
  //               hanzi: values?.[0],
  //               hanziTraditional: values?.[1],
  //               pinyin: values?.[2],
  //             };
  //           }) as any;

  //         console.log("CHILDREN", children);

  //         if (
  //           children?.length > 0 &&
  //           JSON.stringify(children) !== JSON.stringify(hovered)
  //         ) {
  //           setHovered({ hanzi, pinyin, en });
  //           console.log("LOGGED", children);
  //         } else if (children?.length === 0) {
  //           setHovered([]);
  //         }
  //       } catch (err) {
  //         console.log("ERR", err);
  //       }
  //     }

  //     // setTime((seconds) => playerRef?.current?.getCurrentTime());
  //   }, 300);
  //   return () => clearInterval(interval);
  // });

  useEffect(() => {
    if (seekValue) {
      seek(seekValue);
    }
  }, [seekValue]);

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
        selectedWord={hovered}
        selected={selected}
        activeSubtitle={activeSubtitle}
      />

      <div></div>

      <div className="relative space-y-8">
        {content?.transcriptions?.map((subtitle: any) => {
          const timeStamp = times?.find(
            (time: any) => time?.id === subtitle?.id
          ) as any;

          return (
            // <HanziTooltip
            //   component={{
            //     hanzi: subtitle?.hanzi,
            //     en: subtitle?.meaning || "",
            //     pinyin: subtitle?.pinyin,
            //   }}
            //   key={JSON.stringify(subtitle)}
            // >
            <>
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
                    onClick={() => {
                      setIfExists({ ...subtitle, contentId });
                    }}
                    href={`/nmm/${subtitle.hanzi || subtitle?.input}?lang=zh`}
                    target="_blank"
                    className={cn(
                      subtitle?.pinyin ? "text-gray-500" : "text-black",
                      "text-sm",
                      currentTime > subtitle?.start &&
                        currentTime < subtitle.end
                        ? "text-white "
                        : "text-gray-500",

                      textSize?.[0],
                      activeSubtitle?.sentence === subtitle?.sentence
                        ? "text-gray-400"
                        : "text-gray-600",
                      currentTime > subtitle?.start &&
                        currentTime < subtitle.end
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
                      setLoop(subtitle.input);
                    }
                    seek(timeStamp?.start || subtitle?.start);
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

              {editMode && (
                <div className="flex flex-col">
                  {(timeStamp?.roman || subtitle?.roman) && editMode && (
                    <input
                      className=""
                      value={timeStamp?.roman || subtitle?.roman}
                      onChange={(event) => {
                        setTimer("roman", subtitle, event?.target?.value);
                      }}
                    />
                  )}

                  {(timeStamp?.input || subtitle?.input) && editMode && (
                    <input
                      className=""
                      value={timeStamp?.input || subtitle?.input}
                      onChange={(event) => {
                        setTimer("input", subtitle, event?.target?.value);
                      }}
                    />
                  )}

                  {editMode && (
                    <input
                      className="w-full"
                      value={timeStamp?.en || subtitle?.en}
                      onChange={(event) => {
                        setTimer("en", subtitle, event?.target?.value);
                      }}
                    />
                  )}

                  {editMode && (
                    <div className="flex text-gray-400 text-[12px] items-center justify-start mt-4 space-x-2">
                      <div>
                        <input
                          value={timeStamp?.start || subtitle?.start}
                          onChange={(event) => {
                            setTimer("start", event?.target?.value);
                          }}
                        />
                        <button
                          onClick={() => {
                            setTimer("start", subtitle);
                          }}
                        >
                          Set Start{" "}
                        </button>
                      </div>

                      <div>
                        <input
                          value={timeStamp?.end || subtitle?.end}
                          onChange={(event) => {
                            setTimer("end", event?.target?.value);
                          }}
                        />

                        <button
                          onClick={() => {
                            setTimer("end", subtitle);
                          }}
                        >
                          {" "}
                          Set End{" "}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>

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

          <div className="space-x-4 sm:space-x-8 flex items-center justify-start mr-8 sm:mr-60">
            <UploadFileButton
              icon={<Icons.upload className="text-2xl" />}
              types={["mp3", "m4a"]}
              onSuccess={(res) => {
                return updateContentMutation.mutateAsync({
                  id: content?.id || "",
                  audio: res.sourceUrl,
                  audioUploadBucketKey: res.uploadBucketKey,
                  audioS3LinkAddedAt: Date.now(),
                  updateContent: true,
                });
              }}
            />
            {/* )} */}

            <button
              onClick={() => {
                setEditMode();
              }}
            >
              <Icons.gear
                className={cn(
                  "sm:text-2xl text-2xl",
                  editMode ? "dark:text-white text-black" : "text-gray-400"
                )}
              />
            </button>

            {editMode && (
              <button
                onClick={() => {
                  const editedTranscriptions = {
                    id: content?.id,
                    transcriptions: content?.transcriptions?.map(
                      (transcription: any) => {
                        const time = times?.find(
                          (t: any) => t?.id === transcription?.id
                        ) as any;
                        return {
                          ...transcription,
                          ...time,
                        };
                      }
                    ),
                  };

                  updateContentMutation
                    .mutateAsync({
                      ...editedTranscriptions,
                    })
                    .then((resp) => {
                      setEditMode();
                      // resetTimes();
                    });
                }}
              >
                {updateContentMutation?.isLoading ? "Saving..." : "Save"}
              </button>
            )}

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
