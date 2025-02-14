import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSetIfExists } from "../[content-id]/hooks/use-character-context-store";
import { useMusicV2 } from "../_play-v2/use-music-v2";
import { formatTime } from "../_play/utils";
import { getHeightClass } from "./utils/get-height-class";
import { useDebouncedCallback } from "use-debounce";
import { groupBy } from "ramda";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { KaraokeMode } from "@/components/youtube-page/karaoke-mode";

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
  const subtitleValue = activeSubtitle?.en || selected?.en || "...";

  const length = subtitleValue?.length;

  const height = getHeightClass(length);

  return (
    <div className="mt-6 sticky top-0 m-auto bg-gray-50 dark:bg-[rgb(9,10,11)] z-50">
      <div className="sticky top-0 pt-4 px-2 pb-[4px] bg-gray-50 dark:bg-[rgb(9,10,11)]">
        <div className="pb-4">
          <h4 className="text-xs text-gray-500">Sentence meaning</h4>
          <div
            className={`${height} flex justify-between items-center mt-2 w-full`}
          >
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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (["p"]?.includes(event.key?.toLowerCase())) {
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

      if (["l"]?.includes(event.key?.toLowerCase())) {
        event.preventDefault();

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

  const debounceSeek = useDebouncedCallback((selectedWords: any) => {
    seek(selectedWords?.start);
  }, 30);

  // const searchParams = useSearchParams();

  const start = searchParams.get("start");

  const lang = useGetCurrentLang();

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
    <div className="relative">
      <ContentDetailHeader content={content} />

      <ActiveSubtitleDisplay
        selectedWord={hovered}
        selected={selected}
        activeSubtitle={activeSubtitle}
      />

      <div></div>

      <div className="relative space-y-8">
        {brightMode && lang !== "zh" ? (
          <div>
            <KaraokeMode
              play={() => {
                togglePlay();
              }}
              currentTime={currentTime}
              isPlaying={isPlaying}
              transcriptions={content?.transcriptions}
              seekTo={(start: number) => {
                seek(start);
              }}
            />
          </div>
        ) : (
          Object.entries(groupBySectionId(content?.transcriptions) as any)?.map(
            (sectionAndTranscriptions: any) => {
              const transcriptions = sectionAndTranscriptions[1];

              return (
                <div key={JSON.stringify(sectionAndTranscriptions)}>
                  {transcriptions?.map((subtitle: any) => {
                    const timeStamp = times?.find(
                      (time: any) => time?.id === subtitle?.id
                    ) as any;

                    return (
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
                          {viewPinyin &&
                            ["zh", "zh-CN"].includes(subtitle.lang) && (
                              <Link
                                onClick={() => {
                                  setIfExists({ ...subtitle, contentId });
                                }}
                                href={`/nmm/${encodeURIComponent(subtitle?.input || subtitle.hanzi)}?lang=${subtitle?.lang || "zh"}`}
                                target="_blank"
                                className={cn(
                                  subtitle?.pinyin
                                    ? "text-gray-500"
                                    : "text-black",
                                  "text-sm",
                                  currentTime > subtitle?.start &&
                                    currentTime < subtitle.end
                                    ? "text-white "
                                    : "text-gray-500",

                                  textSize?.[0],
                                  activeSubtitle?.sentence ===
                                    subtitle?.sentence
                                    ? "text-gray-400"
                                    : "text-gray-600",
                                  currentTime > subtitle?.start &&
                                    currentTime < subtitle.end
                                    ? "dark:text-white text-black"
                                    : "",
                                  currentTime === 0 ? "text-gray-300" : "",
                                  "text-start"
                                )}
                              >
                                {subtitle?.roman || subtitle?.pinyin || ""}
                              </Link>
                            )}

                          {brightMode ? (
                            <div>
                              {(subtitle?.input || subtitle?.hanzi)
                                ?.split("")
                                ?.map((val: any, idx: any) => {
                                  const learnedChar = learnedCharacters2?.find(
                                    (char: any) => char?.hanzi === val
                                  );
                                  const comp = components?.find(
                                    (char: any) => char?.hanzi === val
                                  );

                                  const color = calculateColor({
                                    tone: learnedChar?.tone_level,
                                  });

                                  const hoverColor = calculateHoverColor({
                                    tone:
                                      learnedChar?.tone_level ||
                                      comp?.tone_level,
                                  });

                                  return (
                                    <span
                                      onClick={() => {
                                        if (loop) {
                                          setLoop(subtitle.input);
                                        }
                                        seek(
                                          timeStamp?.start || subtitle?.start
                                        );
                                      }}
                                      key={`${val}-${idx}`}
                                      className={cn(
                                        `${
                                          currentTime > subtitle?.start &&
                                          currentTime < subtitle.end
                                            ? brightMode
                                              ? learnedChar?.status ===
                                                "forgotten"
                                                ? "text-gray-200 dark:text-gray-600"
                                                : `${color} ${hoverColor}`
                                              : `dark:text-white text-black ${color} ${hoverColor}`
                                            : !brightMode || isCharactersLoading
                                              ? `dark:text-gray-300 text-gray-700 ${hoverColor}`
                                              : // learnedCharacters.includes(prop?.hanzi)
                                                learnedChar
                                                ? learnedChar?.status ===
                                                  "forgotten"
                                                  ? `text-gray-200 dark:text-gray-600 ${hoverColor}`
                                                  : // : lastAnswer?.totalCharacters?.includes(character?.hanzi)
                                                    //   ? "text-rose-500"
                                                    `${color} text-gray-300 ${hoverColor}`
                                                : `dark:text-gray-200 text-gray-800 ${hoverColor}`
                                        } ${hoverColor} ${color} text-2xl transition lowercase font-light`,
                                        textSize?.[1],
                                        // TODO: Set learned view
                                        true &&
                                          learnedChar?.status === "forgotten" &&
                                          "text-gray-300 dark:text-gray-600"
                                      )}
                                    >
                                      {val}
                                    </span>
                                  );
                                })}
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                if (loop) {
                                  setLoop(subtitle.input);
                                }
                                seek(timeStamp?.start || subtitle?.start);
                              }}
                              className={cn(
                                "text-3xl font-light dark:text-gray-500 text-gray-700 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-black text-left",

                                textSize?.[1],
                                activeSubtitle?.sentence === subtitle?.sentence
                                  ? "text-gray-400"
                                  : "text-gray-600",
                                currentTime > subtitle?.start &&
                                  currentTime < subtitle.end
                                  ? "dark:text-white text-black"
                                  : "0",
                                currentTime === 0
                                  ? "dark:text-gray-400 text-gray-700"
                                  : ""
                              )}
                            >
                              {subtitle?.input || subtitle?.hanzi}
                              {"   "}
                            </button>
                          )}
                        </span>

                        {viewPinyin &&
                          !["zh", "zh-CN"]?.includes(subtitle.lang) && (
                            <div className="mt-4 flex space-x-4">
                              <button
                                className={cn(
                                  "sm:text-2xl text-[16px]",
                                  loop === subtitle?.input
                                    ? "text-white"
                                    : "text-gray-600"
                                )}
                                onClick={() => {
                                  setLoop((loop: any) => {
                                    if (loop) {
                                      return null;
                                    }

                                    return subtitle?.input;
                                  });
                                }}
                              >
                                <Icons.loop />
                              </button>
                              <Link
                                href={`/nmm/${encodeURIComponent(subtitle?.input || subtitle.hanzi)}?lang=${subtitle?.lang || "zh"}`}
                                target="_blank"
                                className={cn(
                                  "sm:text-2xl text-[16px] dark:hover:text-white hover:text-black text-gray-600"
                                )}
                              >
                                <Icons.magnifyingGlass />
                              </Link>
                            </div>
                          )}

                        {editMode && (
                          <div className="flex flex-col">
                            {(timeStamp?.roman || subtitle?.roman) &&
                              editMode &&
                              ["zh", "zh-CN"]?.includes(subtitle.lang) && (
                                <textarea
                                  className=""
                                  value={timeStamp?.roman || subtitle?.roman}
                                  onChange={(event) => {
                                    setTimer(
                                      "roman",
                                      subtitle,
                                      event?.target?.value
                                    );
                                  }}
                                />
                              )}

                            {(timeStamp?.input || subtitle?.input) &&
                              editMode && (
                                <textarea
                                  className="my-4 focus-visible:outline-none focus-visible:ring-ring"
                                  value={timeStamp?.input || subtitle?.input}
                                  onChange={(event) => {
                                    setTimer(
                                      "input",
                                      subtitle,
                                      event?.target?.value
                                    );
                                  }}
                                />
                              )}

                            {editMode && (
                              <textarea
                                className="w-full mt-4 focus-visible:outline-none focus-visible:ring-ring"
                                value={timeStamp?.en || subtitle?.en}
                                onChange={(event) => {
                                  setTimer(
                                    "en",
                                    subtitle,
                                    event?.target?.value
                                  );
                                }}
                              />
                            )}

                            {editMode && (
                              <div className="flex text-gray-400 text-[12px] items-center justify-start mt-4 space-x-2">
                                <div>
                                  <input
                                    value={timeStamp?.start || subtitle?.start}
                                    onChange={(event) => {
                                      setTimer(
                                        "start",
                                        subtitle,
                                        event?.target?.value
                                      );
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
                                      setTimer(
                                        "end",
                                        subtitle,
                                        event?.target?.value
                                      );
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

                            {editMode && (
                              <div className="border-b-2 dark:border-gray-800 mt-4"></div>
                            )}
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              );
            }
          )
        )}
      </div>

      <div className="w-full fixed bottom-0 py-4 px-4 z-30 m-auto bg-gray-50 dark:bg-[rgb(12,13,14)]">
        <section className="flex items-center justify-between">
          {editMode ? null : (
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
          )}

          <div className="sm:space-x-6 space-x-2 flex items-center">
            <button
              className="sm:text-2xl text-[16px]"
              onClick={() => {
                togglePlay();
              }}
            >
              {isPlaying ? <Icons.pause /> : <Icons.play />}
            </button>

            <button
              className={cn(
                "sm:text-2xl text-[16px]",
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

            <p className="font-extralight sm:text-2xl text-[16px] text-center dark:text-slate-300 text-slate-600">
              {formatTime(currentTime)}
            </p>

            <button
              className="sm:text-2xl text-[16px]"
              onClick={() => {
                reset();
              }}
            >
              <Icons.stop />
            </button>
          </div>

          <div className="space-x-4 sm:space-x-8 flex items-center justify-start mr-8 sm:mr-60">
            <UploadFileButton
              icon={<Icons.upload className="text-[16px] sm:text-2xl" />}
              types={["mp3", "m4a"]}
              className="hidden sm:block"
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

            <button
              onClick={() => {
                setEditMode();
              }}
            >
              <Icons.gear
                className={cn(
                  "sm:text-2xl text-[16px]",
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

            <button onClick={() => {}}>
              <Icons.chartColumn
                className={cn(
                  "sm:text-2xl text-[16px]",
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
                  "sm:text-2xl text-[16px]",
                  viewPinyin ? "text-white" : "text-gray-400"
                )}
              />
            </button>
            <button
              onClick={() => {
                setBrightMode((mode: any) => !mode);
              }}
            >
              <Icons.glassesRound
                className={cn(
                  "sm:text-2xl text-[16px]",
                  brightMode ? "text-white" : "text-gray-400"
                )}
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
