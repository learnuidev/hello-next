import { useGetContentQuery } from "@/domain/content/content.queries";
import { useContentItemParams } from "../../hooks/use-content-item-params";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useMusicV2 } from "@/app/(auth)/convos/_play-v2/use-music-v2";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons.v2";
import { formatTime } from "@/app/(auth)/convos/_play/utils";
import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { useContentEditStore } from "@/components/youtube-page/use-content-edit-store";
import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { useRouter } from "next/navigation";

const sizes = {
  0: ["text-xs", "text-xl", "my-4", "px-[1px]"],
  1: ["text-sm", "text-2xl", "my-10", "px-[2px]"],
  2: ["text-[14px]", "text-3xl", "my-12"],
  3: ["text-[16px]", "text-4xl", "my-12", "px-[4px]"],
} as any;

function SectionView({
  activeSubtitle,
  selected,
  section,
  viewPinyin,
  setSelected,
  textSize,
  seek,
  currentTime,
  setActive,
}: any) {
  const { data: context } = useListDictionaryMeaningsQuery(section?.input);

  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);
  const setTimes = useContentEditStore((state) => state.setTimes);

  const timeStamp = times?.find((time: any) => time?.id === section?.id) as any;

  const setTimer = (
    type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
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

  const selectedSection = times?.find(
    (time: any) => time?.id === section?.id
  ) as any;

  const router = useRouter();

  return (
    <>
      {viewPinyin && context !== undefined && context?.length > 0 ? (
        <p
          className={cn(
            "my-2",
            currentTime > section?.start && currentTime < section.end
              ? "dark:text-white text-black"
              : "text-gray-400"
          )}
        >
          {context?.map((item: any) => {
            return (
              <span
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
                  textSize?.[3]
                )}
                key={JSON.stringify(item)}
              >
                {viewPinyin && (
                  <Link
                    target="_blank"
                    href={`/nmm/${item?.hanzi}?lang=zh`}
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
                        : ""
                    )}
                  >
                    {item?.pinyin || ""}
                  </Link>
                )}
                <span
                  onClick={() => {
                    seek(selectedSection?.start || section?.start);
                  }}
                  //   href={`/nmm/${item?.hanzi}?lang=zh`}
                  //   target="_blank"
                  className={cn(
                    "hover:text-rose-400",
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
                      : ""

                    // "text-white"
                  )}
                >
                  {item?.hanzi}
                </span>
              </span>
            );
          })}
        </p>
      ) : (
        <p
          onMouseEnter={() => {
            setSelected(section);
            setActive(section);
          }}
          onMouseLeave={() => {
            setSelected(null);
            setActive(null);
          }}
          // className="my-8 text-gray-300 text-lg"
          className={cn(
            "hover:text-rose-400 my-4",
            textSize?.[1],
            currentTime === 0 ? "text-gray-300" : "",

            activeSubtitle?.en === section?.en
              ? "dark:text-white text-black"
              : "text-gray-600",
            currentTime > section?.start && currentTime < section.end
              ? "dark:text-white text-gray-900"
              : "text-gray-400"
            // "text-white"
          )}
          key={JSON.stringify(section)}
          onClick={() => {
            seek(selectedSection?.start || section?.start);
          }}
        >
          {section?.input}
        </p>
      )}

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
  const { data: content } = useGetContentQuery({ contentId });

  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: content?.audio || "",
  });

  const activeSubtitle = content?.transcriptions?.find(
    (subtitle: any) =>
      currentTime > subtitle?.start && currentTime < subtitle.end
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

  const setContextTimes = useContentEditStore((state) => state.setContextTimes);
  const contextTimes = useContentEditStore((state) => state.contextTimes);

  const ContentSettingsNavbar = () => (
    <div className="space-x-4 sm:space-x-8 flex items-center">
      {!content?.audio && (
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
      )}

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
      <button
        onClick={() => {
          setViewMode((viewMode) => (viewMode === "stats" ? "core" : "stats"));
        }}
      >
        <Icons.chartColumn
          className={cn(
            "sm:text-2xl text-2xl",
            viewMode === "stats"
              ? "dark:text-white text-black"
              : "text-gray-400"
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
            viewPinyin ? "dark:text-white text-black" : "text-gray-400"
          )}
        />
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="">
        {/* <div className="text-gray-400  px-4 md:px-12">
          <Link onClick={() => {}} href="/du" className="hover:text-white">
            {" "}
            Courses{" "}
          </Link>{" "}
          {" / "}
          <span onClick={() => {}} className="hover:text-white">
            {content?.title}
          </span>
        </div> */}

        <div className="mb-32 m-auto relative w-full">
          {viewMode !== "stats" && (
            <div className="sticky top-0 pt-4 pb-[4px] bg-gray-100 rounded-2xl dark:bg-[rgb(9,10,11)] px-4 md:px-12">
              <div className="pb-4">
                <h4 className="text-xs text-gray-700 dark:text-gray-500">
                  Sentence meaning
                </h4>
                <div className="h-16 flex justify-between items-center mt-2 w-full">
                  <p className="text-black dark:text-white space-x-2 sm:text-xl text-[16px] font-extralight pb-[4px]">
                    {isPlaying
                      ? active?.en || activeSubtitle?.en
                      : activeSubtitle?.en || active?.en || "..."}
                  </p>
                </div>
              </div>

              <div className="h-16 mb-4 hidden sm:block">
                {viewPinyin ? (
                  <h4 className="text-xs text-gray-700 dark:text-gray-500">
                    Word meaning
                  </h4>
                ) : (
                  <h4 className="text-xs text-gray-700 dark:text-gray-500">
                    Pinyin
                  </h4>
                )}

                {selected ? (
                  <div className="h-14 mt-2 w-full">
                    <div className="flex justify-between items-center">
                      <p className="space-x-2 text-[16px] font-extralight">
                        {viewPinyin && <span>{selected?.hanzi}</span>}

                        <span
                          className={
                            viewPinyin
                              ? "text-red-400"
                              : "text-gray-700 dark:text-gray-400"
                          }
                        >
                          {selected?.pinyin?.trim() || selected?.roman?.trim()}
                        </span>
                      </p>

                      {selected?.hskLevel && (
                        <p className="text-gray-600 dark:text-gray-400">
                          HSK {selected?.hskLevel}
                        </p>
                      )}
                    </div>

                    {viewPinyin && (
                      <p className="font-extralight">
                        <span className="">
                          {selected?.en?.split(";")?.slice(0, 5)?.join(";")}
                        </span>
                      </p>
                    )}
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

                  return activeSubtitle?.sentence;
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
