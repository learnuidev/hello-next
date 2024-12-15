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

function SectionView({ section, viewPinyin, setSelected, seek }: any) {
  const { data: context } = useListDictionaryMeaningsQuery(section?.input);

  //   console.log("CTX", context);

  console.log("SECTION", section);

  return (
    <>
      {viewPinyin && context !== undefined && context?.length > 0 ? (
        <p className="my-8">
          {context?.map((item: any) => {
            return (
              <span
                onMouseEnter={() => {
                  setSelected(item);
                }}
                onMouseLeave={() => {
                  setSelected(null);
                }}
                className="text-gray-300 text-lg sm:text-xl hover:text-blue-400 inline-flex flex-col items-center"
                key={JSON.stringify(item)}
              >
                {viewPinyin && (
                  <span
                    className={cn("text-xs", item?.pinyin ? "" : "text-black")}
                  >
                    {item?.pinyin || "."}
                  </span>
                )}
                <span
                  onClick={() => {
                    seek(section?.start);
                  }}
                  //   href={`/nmm/${item?.hanzi}?lang=zh`}
                  //   target="_blank"
                  className="text-lg sm:text-2xl"
                >
                  {item?.hanzi}
                </span>
              </span>
            );
          })}
        </p>
      ) : (
        <p
          className="my-8 text-gray-300 text-lg"
          key={JSON.stringify(section)}
          onClick={() => {
            seek(section?.start);
          }}
        >
          {section?.input}
        </p>
      )}
    </>
  );
}

export const AudioPlayer = () => {
  const [textSizeIndex, setTextSizeIndex] = useState(1);
  const [selected, setSelected] = useState<any>(null);
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

  const ContentEditor = ({ subtitle }: any) => {
    const { data: context } = useListDictionaryMeaningsQuery(subtitle?.input);

    const setTimer = (
      id: string,
      type: "start" | "end" | "pinyin" | "hanzi" | "roman" | "en" | "input",
      newValue?: string
    ) => {
      const offset = newValue || currentTime - 0.2;
      setContextTimes((prev: any) => {
        const exists = prev?.find((item: any) => item?.contextId === id);

        if (exists) {
          return prev.map((item: any) => {
            if (item?.contextId === id) {
              return {
                ...exists,
                [type]: offset,
              };
            }

            return item;
          });
          // return prev.concat({
          //   ...exists,
          //   start: currentTime,
          // });
        }

        return prev.concat({
          contextId: id,
          transcriptionId: subtitle?.id,
          [type]: offset,
        });
      });
    };

    return (
      <div>
        {/* <code>
          <pre>{JSON.stringify(contextTimes || "N/A", null, 4)}</pre>
        </code> */}

        <h2 className="text-center font-bold">Context Editor</h2>
        <div>
          {context?.map((item: any) => {
            const timeStamp = contextTimes?.find(
              (val: any) => val?.contextId === item?.id
            ) as any;
            return (
              <div key={JSON.stringify(item)}>
                <code
                  onClick={() => {
                    if (timeStamp?.start) {
                      seek(timeStamp?.start);
                    }
                  }}
                >
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                </code>

                <div className="flex text-gray-400 text-[12px] items-center justify-end space-x-2">
                  <div>
                    <input
                      value={timeStamp?.start}
                      onChange={(event: any) => {
                        setTimer(item?.id, "start", event?.target?.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        setTimer(item?.id, "start");
                      }}
                    >
                      Set Start{" "}
                    </button>
                  </div>

                  <div>
                    <input
                      value={timeStamp?.end}
                      onChange={(event) => {
                        setTimer(item?.id, "end", event?.target?.value);
                      }}
                    />

                    <button
                      onClick={() => {
                        setTimer(item?.id, "end");
                      }}
                    >
                      {" "}
                      Set End{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const ContentSettingsNavbar = () => (
    <div className="space-x-4 sm:space-x-8 flex items-center">
      <button
        onClick={() => {
          setEditMode();
        }}
      >
        <Icons.gear
          className={cn(
            "sm:text-2xl text-2xl",
            viewMode === "stats" ? "text-white" : "text-gray-400"
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
  );

  const ContentEditMode = () => {
    return (
      <div className="grid grid-cols-2">
        <div>
          <div className="px-4 md:px-12">
            {content?.transcriptions?.map((transcription: any) => {
              return (
                <SectionView
                  seek={seek}
                  setSelected={setSelected}
                  viewPinyin={viewPinyin}
                  section={transcription}
                  key={JSON.stringify(transcription)}
                />
              );
            })}
            {/* <div>
                <code>
                  <pre>{JSON.stringify(content, null, 4)}</pre>
                </code>
              </div> */}
          </div>
        </div>

        <div>
          <div className="space-x-8 text-2xl">
            <button>
              <Icons.database />
            </button>
            <button>
              <Icons.database />
            </button>
          </div>

          {content?.transcriptions?.map((subtitle: any) => {
            return (
              <ContentEditor
                key={JSON.stringify(subtitle)}
                subtitle={subtitle}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="mt-4">
        <div className="text-gray-400  px-4 md:px-12">
          <Link
            onClick={() => {
              //   reset();
            }}
            href="/du"
            className="hover:text-white"
          >
            {" "}
            Courses{" "}
          </Link>{" "}
          {" / "}
          <span
            onClick={() => {
              // reset();
            }}
            className="hover:text-white"
          >
            {content?.title}
          </span>
        </div>

        {/* <div>
          <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </code>
        </div> */}

        <div className="mt-6 mb-32 m-auto relative w-full">
          {viewMode !== "stats" && (
            <div className="sticky top-0 pt-4 pb-[4px] bg-[rgb(9,10,11)] px-4 md:px-12">
              <div className="pb-4">
                <h4 className="text-xs text-gray-500">Sentence meaning</h4>
                <div className="h-16 flex justify-between items-center mt-2 w-full">
                  <p className="space-x-2 sm:text-xl text-[16px] font-extralight pb-[4px]">
                    {activeSubtitle?.en || "..."}
                  </p>
                </div>
              </div>

              <div className="h-16 mb-4 hidden sm:block">
                <h4 className="text-xs text-gray-500">Word meaning</h4>

                {selected ? (
                  <div className="h-14 mt-2 w-full">
                    <div className="flex justify-between items-center">
                      <p className="space-x-2 text-[16px] font-extralight">
                        <span>{selected?.hanzi}</span>

                        <span className="text-red-400">{selected?.pinyin}</span>
                      </p>

                      {selected?.hsk && <p>HSK {selected?.hsk}</p>}
                    </div>

                    <p className="font-extralight">
                      <span className="truncate">{selected?.en}</span>
                    </p>
                  </div>
                ) : (
                  <div className="h-14"></div>
                )}
              </div>
            </div>
          )}

          {editMode ? (
            <ContentEditMode />
          ) : viewMode === "stats" ? (
            <div>
              <CharacterAnalytics characterId={characterId} lang={"zh"} />
            </div>
          ) : (
            <div className="px-4 md:px-12">
              {content?.transcriptions?.map((transcription: any) => {
                return (
                  <SectionView
                    seek={seek}
                    setSelected={setSelected}
                    viewPinyin={viewPinyin}
                    section={transcription}
                    key={JSON.stringify(transcription)}
                  />
                );
              })}
              {/* <div>
                <code>
                  <pre>{JSON.stringify(content, null, 4)}</pre>
                </code>
              </div> */}
            </div>
          )}
        </div>
      </div>

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

          <ContentSettingsNavbar />
        </section>
      </div>
    </div>
  );
};
