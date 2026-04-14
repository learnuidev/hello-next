import { useMusicV2 } from "@/app/(auth)/convos/_play-v2/use-music-v2";
import { formatTime } from "@/app/(auth)/convos/_play/utils";
import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { useViewModeStore } from "@/components/convos/useViewModeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons.v2";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { IContent } from "@/domain/content/content.api";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { cn } from "@/lib/utils";
import { faVideo, faVideoSlash } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useContentItemParams } from "../../hooks/use-content-item-params";

const sizes = {
  0: ["text-xs", "text-xl", "my-4", "px-[1px]"],
  1: ["text-sm", "text-2xl", "my-10", "px-[2px]"],
  2: ["text-[14px]", "text-3xl", "my-12"],
  3: ["text-[16px]", "text-4xl", "my-12", "px-[4px]"],
} as any;

function SectionView({
  activeSubtitle,
  active,
  selected,
  section,
  viewPinyin,
  setSelected,
  textSize,
  seek,
  currentTime,
  setActive,
}: any) {
  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);
  const setTimes = useContentEditStore((state) => state.setTimes);

  const timeStamp = times?.find((time: any) => time?.id === section?.id) as any;

  const setTimer = (
    type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
    newValue?: string,
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

  const selectedSection = times?.find(
    (time: any) => time?.id === section?.id,
  ) as any;

  const router = useRouter();

  return (
    <>
      <p
        className={cn(
          viewPinyin ? "my-2" : "my-4",
          currentTime > section?.start && currentTime < section.end
            ? "dark:text-white text-black"
            : "text-gray-400",
        )}
      >
        {section?.context?.map((item: any) => {
          return (
            <span
              onClick={() => {
                setSelected(item);
                setActive(section);
              }}
              onMouseEnter={() => {
                setSelected(item);
                setActive(section);
              }}
              onMouseLeave={() => {
                setSelected(null);
                setActive(null);
              }}
              className={cn(
                "text-gray-300 text-lg sm:text-xl hover:text-blue-400 inline-flex flex-col items-center",
                textSize?.[3],
              )}
              key={JSON.stringify(item)}
            >
              {viewPinyin && (
                <Link
                  target="_blank"
                  href={`/nmm/${encodeURIComponent(item?.hanzi)}?lang=zh`}
                  className={cn(
                    section?.pinyin ? "text-gray-500" : "text-black",
                    "text-sm",
                    currentTime > section?.start && currentTime < section.end
                      ? "dark:text-white"
                      : "text-gray-500",

                    textSize?.[0],
                    activeSubtitle?.sentence === section?.sentence
                      ? "text-gray-400"
                      : "text-gray-600",
                    currentTime === 0 ? "text-gray-300" : "",
                    "text-start",
                    currentTime > section?.start && currentTime < section.end
                      ? "dark:text-white text-black"
                      : "dark:text-gray-400 text-gray-600",

                    selected?.pinyin === item?.pinyin
                      ? "text-rose-500 dark:text-rose-400"
                      : "",
                  )}
                >
                  {item?.pinyin || ""}
                </Link>
              )}
              <span
                onClick={() => {
                  seek(selectedSection?.start || section?.start);
                }}
                className={cn(
                  "hover:text-rose-400 font-extralight",
                  textSize?.[1],
                  currentTime === 0 ? "text-gray-300" : "",

                  activeSubtitle?.en === section?.en
                    ? "text-white"
                    : "text-gray-600",

                  currentTime > section?.start && currentTime < section.end
                    ? "dark:text-white text-black"
                    : "dark:text-gray-400 text-gray-500",

                  item?.pinyin && selected?.pinyin === item?.pinyin
                    ? "text-rose-500 dark:text-rose-400"
                    : "",
                )}
              >
                {item?.hanzi}
              </span>
            </span>
          );
        })}
      </p>

      <div className="flex flex-col">
        {(timeStamp?.roman || section?.roman) && editMode && (
          <input
            className=""
            value={timeStamp?.roman || section?.roman}
            onChange={(event) => {
              setTimer("roman", event?.target?.value);
            }}
          />
        )}

        {(timeStamp?.input || section?.input) && editMode && (
          <input
            className=""
            value={timeStamp?.input || section?.input}
            onChange={(event) => {
              setTimer("input", event?.target?.value);
            }}
          />
        )}

        {editMode && (
          <input
            className="w-full"
            value={timeStamp?.en || section?.en}
            onChange={(event) => {
              setTimer("en", event?.target?.value);
            }}
          />
        )}

        {editMode && (
          <div className="flex text-gray-400 text-[12px] items-center justify-start mt-4 space-x-2">
            <div>
              <input
                value={timeStamp?.start || section?.start}
                onChange={(event) => {
                  setTimer("start", event?.target?.value);
                }}
              />
              <button
                onClick={() => {
                  setTimer("start");
                }}
              >
                Set Start{" "}
              </button>
            </div>

            <div>
              <input
                value={timeStamp?.end || section?.end}
                onChange={(event) => {
                  setTimer("end", event?.target?.value);
                }}
              />

              <button
                onClick={() => {
                  setTimer("end");
                }}
              >
                {" "}
                Set End{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const AudioPlayer = () => {
  const [textSizeIndex, setTextSizeIndex] = useState(1);
  const textSize = sizes?.[textSizeIndex] || sizes?.[1];

  const [selected, setSelected] = useState<any>(null);
  const [active, setActive] = useState<any>(null);
  const [viewPinyin, togglePinyin] = useState(false);
  const [loop, setLoop] = useState<any>(null);
  const [viewPreview, setViewPreview] = useState(false);

  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);

  const [viewMode, setViewMode] = useState("core");

  const { contentId } = useContentItemParams();
  const { data } = useGetContentQuery({ contentId });

  const content = data as IContent;

  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: content?.audio || "",
  });

  const activeSubtitle: any = content?.transcriptions?.find(
    (subtitle: any) =>
      currentTime > subtitle?.start && currentTime < subtitle.end,
  );

  const updateContentMutation = useUpdateContentMutation();

  const increaseFontSize = useCallback(() => {
    setTextSizeIndex((prev) => Math.min(3, prev + 1));
  }, [setTextSizeIndex]);
  const decreaseFontSize = useCallback(() => {
    setTextSizeIndex((prev) => Math.max(0, prev - 1));
  }, [setTextSizeIndex]);

  const characterId =
    content?.transcriptions?.map((word: any) => word?.input)?.join("") || "";

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
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

      if (["a"]?.includes(event.key)) {
        event.preventDefault();
        setViewMode((viewMode) => (viewMode === "stats" ? "core" : "stats"));
        // togglePinyin((pinyin) => !pinyin);
      }

      if (["l"]?.includes(event.key)) {
        event.preventDefault();
        // togglePinyin((pinyin) => !pinyin);

        if (activeSubtitle?.sentence) {
          if (loop) {
            setLoop(null);
          } else {
            setLoop(activeSubtitle?.sentence);
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

      if (["r"]?.includes(event.key)) {
        event.preventDefault();
        reset();
      }

      if (["s"]?.includes(event.key)) {
        event.preventDefault();
        setEditMode();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [
    setViewMode,
    togglePlay,
    togglePinyin,
    activeSubtitle?.sentence,
    reset,
    loop,
    increaseFontSize,
    decreaseFontSize,
    setEditMode,
  ]);

  useEffect(() => {
    if (loop) {
      const interval = setInterval(() => {
        if (currentTime > loop?.end) {
          seek(loop?.start);
        }
        // setTime((seconds) => playerRef?.current?.getCurrentTime());
      }, 5);
      return () => clearInterval(interval);
    }
  }, [currentTime, activeSubtitle, loop, seek]);

  const ContentSettingsNavbar = () => {
    const viewMode = useViewModeStore((state) => state.viewMode);
    const setViewMode = useViewModeStore((state) => state.setViewMode);
    const isVideoHidden = usePlayerViewModeStore(
      (state) => state.isVideoHidden,
    );
    const setIsVideoHidden = usePlayerViewModeStore(
      (state) => state.setIsVideoHidden,
    );

    const isYoutubeOrVideo =
      content?.audio?.includes("youtube") ||
      content?.audio?.includes("youtu.be") ||
      content?.audio?.match(/\.(mp4|webm|ogg)$/i);

    const toggleKaraokeMode = () => {
      setViewMode((prev: any) => (prev === "karaoke" ? null : "karaoke"));
      setIsVideoHidden((isHidden: any) =>
        viewMode !== "karaoke" ? true : false,
      );
    };

    return (
      <div className="space-x-4 sm:space-x-8 flex items-center">
        <UploadFileButton
          icon={<Icons.upload className="text-2xl" />}
          types={["mp3", "m4a", "webm"]}
          onSuccess={(res) => {
            return updateContentMutation.mutateAsync({
              id: content?.id || "",
              audio: res.sourceUrl,
              audioUploadBucketKey: res.uploadBucketKey,
              audioS3LinkAddedAt: Date.now(),
              updateContent: true,
            } as any);
          }}
        />
        {/* )} */}

        {editMode && (
          <button
            onClick={() => {
              const editedTranscriptions = {
                id: content?.id,
                transcriptions: content?.transcriptions?.map(
                  (transcription: any) => {
                    const time = times?.find(
                      (t: any) => t?.id === transcription?.id,
                    ) as any;
                    return {
                      ...transcription,
                      ...time,
                    };
                  },
                ),
              };

              updateContentMutation
                .mutateAsync({
                  ...editedTranscriptions,
                } as any)
                .then((resp) => {
                  setEditMode();
                  // resetTimes();
                });
            }}
          >
            {updateContentMutation.isPending ? "Saving..." : "Save"}
          </button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Icons.gear
                className={cn(
                  "sm:text-2xl text-2xl",
                  editMode ? "dark:text-white text-black" : "text-gray-400",
                )}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => toggleKaraokeMode()}
              className={cn(
                "cursor-pointer",
                viewMode === "karaoke"
                  ? "text-rose-500 font-bold"
                  : "text-gray-600",
              )}
            >
              Karaoke View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setViewMode((prev: string | null) =>
                  prev === "para" ? null : "para",
                )
              }
              className={cn(
                "cursor-pointer",
                viewMode === "para"
                  ? "text-rose-500 font-bold"
                  : "text-gray-600",
              )}
            >
              Paragraph View
            </DropdownMenuItem>
            {isYoutubeOrVideo && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setIsVideoHidden((isHidden: any) => !isHidden)}
                  className={cn(
                    "cursor-pointer",
                    isVideoHidden ? "text-rose-500 font-bold" : "text-gray-600",
                  )}
                >
                  {isVideoHidden ? (
                    <>
                      <FontAwesomeIcon icon={faVideo} className="mr-2" />
                      Show Video
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faVideoSlash} className="mr-2" />
                      Hide Video
                    </>
                  )}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={() => {
            setViewMode((viewMode: string) =>
              viewMode === "stats" ? "core" : "stats",
            );
          }}
        >
          <Icons.chartColumn
            className={cn(
              "sm:text-2xl text-2xl",
              viewMode === "stats"
                ? "dark:text-white text-black"
                : "text-gray-400",
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
              viewPinyin ? "dark:text-white text-black" : "text-gray-400",
            )}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="">
        <div className="mb-32 m-auto relative w-full">
          {viewMode !== "stats" && (
            <div className="sticky top-0 pt-4 pb-[4px] bg-gray-100 rounded-2xl dark:bg-[rgb(9,10,11)] px-4 md:px-12">
              <div className="pb-4">
                <h4 className="text-xs text-gray-700 dark:text-gray-500">
                  Sentence meaning
                </h4>
                <div className="h-20 flex justify-between items-center mt-2 w-full">
                  <p className="text-black dark:text-white space-x-2 text-[16px] font-extralight pb-[4px]">
                    {isPlaying
                      ? active?.en || activeSubtitle?.en
                      : activeSubtitle?.en || active?.en || "..."}
                  </p>
                </div>
              </div>

              <div className="h-20 mb-4">
                <h4 className="text-xs text-gray-700 dark:text-gray-500">
                  Word meaning
                </h4>

                {selected ? (
                  <div className="h-14 mt-2 w-full">
                    <div className="flex justify-between items-center">
                      <p className="space-x-2 text-[16px] font-extralight">
                        {viewPinyin && <span>{selected?.hanzi}</span>}

                        <span className={"text-red-400"}>
                          {selected?.pinyin?.trim() || selected?.roman?.trim()}
                        </span>
                      </p>

                      {selected?.hskLevel && (
                        <p className="text-gray-600 dark:text-gray-400">
                          汉语水平 {selected?.hskLevel}
                        </p>
                      )}
                    </div>

                    <p className="font-extralight">
                      <span className="">
                        {selected?.en?.split(";")?.slice(0, 5)?.join(";")}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="h-14"></div>
                )}
              </div>
            </div>
          )}

          {viewMode === "stats" ? (
            <div>
              <CharacterAnalytics characterId={characterId} lang={"zh"} />
            </div>
          ) : (
            <div className="px-4 md:px-12 mt-4">
              {content?.transcriptions?.map((transcription: any) => {
                return (
                  <SectionView
                    activeSubtitle={activeSubtitle}
                    setActive={setActive}
                    active={active}
                    currentTime={currentTime}
                    seek={seek}
                    textSize={textSize}
                    setSelected={setSelected}
                    selected={selected}
                    viewPinyin={viewPinyin}
                    section={transcription}
                    key={JSON.stringify(transcription)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 py-4 w-full z-30 m-auto bg-white dark:bg-[rgb(12,13,14)]">
        <section className="flex items-center justify-between px-4 sm:px-16">
          <div className="space-x-2">
            <button
              onClick={increaseFontSize}
              className={cn(
                textSizeIndex === 3 ? "text-gray-400" : "",
                "text-2xl",
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
                loop ? "text-white" : "text-gray-600",
              )}
              disabled={!activeSubtitle}
              onClick={() => {
                setLoop((loop: any) => {
                  if (loop) {
                    return null;
                  }

                  return activeSubtitle;
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

          <div className="mr-8 sm:mr-60">
            <ContentSettingsNavbar />
          </div>
        </section>
      </div>

      {editMode && (
        <code>
          <pre>{JSON.stringify(times || "N/A", null, 4)}</pre>
        </code>
      )}
    </div>
  );
};
