import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useGetContentQuery } from "@/domain/content/content.queries";
import ReactPlayer from "react-player";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  faLanguage,
  faRepeat,
  faVideo,
  faVideoSlash,
} from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { cn, groupBy } from "@/lib/utils";

import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { useParams, useSearchParams } from "next/navigation";
import { Icons } from "../ui/icons.v2";
import { KaraokeMode } from "./karaoke-mode";
import { TranscriptItem } from "./youtube-transcript-item";

import { useDebouncedCallback } from "use-debounce";
import { ActiveTranscription } from "./active-transcription";
import { useContentEditStore } from "./use-content-edit-store";
import { useIsSmall } from "./utils/use-is-small";
import { getActiveTranscriptions } from "./get-active-transcriptions";

const MAX_LIMIT = 9000;
export function YouTubePlayer({ lessonId }: { lessonId: string }) {
  const [viewMode, setViewMode] = useState<any>(null);
  const [active, setActive] = useState(MAX_LIMIT);
  const [toggleLoop, setToggleLoop] = useState<any>(null);
  const [toggleLoops, setToggleLoops] = useState<any>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoHidden, setIsVideoHidden] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [currentTime, setTime] = useState(0);
  const params = useParams<{ "content-id": string }>();
  const contentId = params["content-id"];
  const playerRef = useRef() as any;
  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const { data: learnedCharacters } = useListComponents();

  const updateContentMutation = useUpdateContentMutation();

  const searchParams = useSearchParams();

  const start = searchParams.get("start");

  const onReady = useCallback(() => {
    const timeToStart = 7 * 60 + 12.6;

    if (start) {
      playerRef.current.seekTo(start, "seconds");

      try {
        playerRef.current?.player?.player?.play();
      } catch (err) {
        console.error(err);
      }
    }

    // playerRef.current.seekTo(0, 'seconds')
  }, [start]);

  const [loopCounter, setLoopCounter] = useState(0);

  const { data: transcriptionsData } = useListSentencesQuery({
    component: lessonId,
    lang: "zh",
    genSents: false,
  });

  const { data: lesson } = useGetContentQuery({ contentId: lessonId });

  const transcriptions = lesson?.transcriptions
    ? lesson?.transcriptions
    : transcriptionsData?.length
      ? transcriptionsData
      : lesson?.transcriptions;
  const finalUrl = lesson?.audio;

  const togglePlay = useCallback(() => {
    // alert("yo");
    console.log("PLAYER REF", playerRef);
    // conso le.log("PLAYER REF", playerRef?.current?.player?.player?.play());

    if (playerRef?.current?.player?.isPlaying) {
      playerRef?.current?.player?.player?.pause();
    } else {
      playerRef?.current?.player?.player.play();
    }

    // playerRef?.current?.pause();
  }, [playerRef]);

  const seekBefore = useCallback(() => {
    const currentTranscription = transcriptions?.find(
      (trans: any) => trans?.start < currentTime && trans?.end > currentTime
    );

    const currentTranscriptionIndex = Math.max(
      transcriptions?.findIndex(
        (trans: any) => trans?.start === currentTranscription?.start
      ),
      0
    );

    const prevIndex = Math.max(currentTranscriptionIndex - 1, 0);
    const prevTranscription = transcriptions?.[prevIndex];

    playerRef.current.seekTo(prevTranscription?.start, "seconds");

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  }, [currentTime, transcriptions]);

  const seekAfter = useCallback(() => {
    const currentTranscription = transcriptions?.find(
      (trans: any) => trans?.start < currentTime && trans?.end > currentTime
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

    playerRef.current.seekTo(nextTranscription?.start, "seconds");

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  }, [currentTime, transcriptions]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === "Space") {
        // Vishal 07-12-2024-10-20: prevents the browser from scrolling down

        event.preventDefault();
        togglePlay();
        return null;
      }

      if (event.code === "ArrowLeft") {
        // alert(event.code);
        seekBefore();
        return null;
      }

      if (event.code === "ArrowRight") {
        // alert(event.code);
        seekAfter();
        return null;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [togglePlay, seekBefore, seekAfter]);

  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start < currentTime && trans?.end > currentTime
  );

  const currentTranscriptionIndex = Math.max(
    transcriptions?.findIndex(
      (trans: any) => trans?.start === currentTranscription?.start
    ),
    0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((seconds) => playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const debounceSeek = useDebouncedCallback((firstStart: any) => {
    // seek(selectedWords?.start);
    playerRef.current.seekTo(firstStart, "seconds");

    for (const example of toggleLoops) {
      setRepeatHistories({
        contentId: contentId,
        ...example,
        input: example?.input || example?.hanzi,
        roman: example?.roman || example?.pinyin,
        createdAt: Date.now(),
      });
    }

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  }, 30);

  useEffect(() => {
    if (toggleLoops?.length) {
      const lastEnd = Math.max(...toggleLoops?.map((x: any) => x?.end));
      const firstStart = Math.min(...toggleLoops?.map((x: any) => x?.start));

      if (currentTime > lastEnd) {
        debounceSeek(firstStart);
      }
    }
  }, [
    contentId,
    setRepeatHistories,
    toggleLoops,
    loopCounter,
    setLoopCounter,
    currentTime,
    debounceSeek,
  ]);

  const groupedTranscriptions = groupBy(transcriptions || []);

  const isSmall = useIsSmall();

  const editMode = useContentEditStore((state) => state.editMode);
  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);

  const group = useMemo(
    () =>
      getActiveTranscriptions({
        limit: active,
        currentTime,
        transcriptions: transcriptions || [],
      }),
    [active, currentTime, transcriptions]
  );

  const ActiveButton = () => {
    return (
      <div className="space-x-4 sm:mt-0 mt-4 sm:text-xl flex justify-center">
        <button
          className={active === 30 ? "dark:text-white" : "text-gray-500"}
          onClick={() => {
            setActive(30);
          }}
        >
          30s
        </button>
        <button
          className={active === 60 ? "dark:text-white" : "text-gray-500"}
          onClick={() => {
            setActive(60);
          }}
        >
          60s
        </button>
        <button
          className={active === 90 ? "dark:text-white" : "text-gray-500"}
          onClick={() => {
            setActive(90);
          }}
        >
          90s
        </button>
        <button
          className={active === 120 ? "dark:text-white" : "text-gray-500"}
          onClick={() => {
            setActive(120);
          }}
        >
          120s
        </button>
        <button
          className={active === 9000 ? "dark:text-white" : "text-gray-500"}
          onClick={() => {
            setActive(MAX_LIMIT);
          }}
        >
          All
        </button>
      </div>
    );
  };

  return (
    <div className="grow flex flex-col items-center">
      <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between w-full sm:px-12 mb-4">
        <div className="space-x-4 sm:my-4 block z-50">
          <button
            className={
              viewMode === "karaoke" ? "dark:text-white" : "text-gray-500"
            }
            onClick={() => {
              setViewMode((prev: any) =>
                prev === "karaoke" ? null : "karaoke"
              );
              setIsVideoHidden((isHidden) =>
                viewMode !== "karaoke" ? true : false
              );
            }}
          >
            <Icons.karaoke />
          </button>
          <button
            className={
              viewMode === "para" ? "dark:text-white" : "text-gray-500"
            }
            onClick={() => {
              setViewMode((prev: any) => (prev === "para" ? null : "para"));
            }}
          >
            <Icons.glassesRound />
          </button>

          <button
            className={isVideoHidden ? "dark:text-white" : "text-gray-500"}
            onClick={() => {
              setIsVideoHidden((isHidden) => !isHidden);
            }}
          >
            {isVideoHidden ? (
              <FontAwesomeIcon icon={faVideo} />
            ) : (
              <FontAwesomeIcon icon={faVideoSlash} />
            )}
          </button>

          <button
            className={editMode ? "dark:text-white" : "text-gray-500"}
            onClick={() => {
              setEditMode();
            }}
          >
            <Icons.edit />
          </button>

          {editMode && (
            <button
              onClick={() => {
                resetTimes();
              }}
            >
              Reset
            </button>
          )}

          {editMode && (
            <button
              onClick={() => {
                const editedTranscriptions = {
                  id: lesson?.id,
                  transcriptions: lesson?.transcriptions?.map(
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
              Save
            </button>
          )}
        </div>
        <ActiveButton />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div
          className={` ${isVideoHidden ? "hidden" : ""} md:col-span-7 col-span-12`}
        >
          {/* <div className="block md:hidden">
            <ReactPlayer
              ref={playerRef}
              url={finalUrl}
              playing={isPlaying}
              width="100%"
              height={"320px"}
              controls={true}
              onReady={onReady}
            />
          </div> */}
          <div className="">
            <ReactPlayer
              ref={playerRef}
              url={finalUrl}
              playing={isPlaying}
              width="100%"
              height={isSmall ? "200px" : "450px"}
              controls
              onReady={onReady}
            />
          </div>

          <ActiveTranscription
            currentTime={currentTime}
            transcriptions={transcriptions}
            contentId={contentId}
          />
        </div>

        {viewMode === "karaoke" ? (
          <div
            className={
              isVideoHidden
                ? "col-span-12 mx-12 md:mx-32"
                : "col-span-12 md:col-span-5"
            }
          >
            <KaraokeMode
              isPlaying={isPlaying}
              playerRef={playerRef}
              transcriptions={transcriptions}
              currentTime={currentTime}
            />
          </div>
        ) : viewMode === "para" ? (
          <div
            className={cn(
              isVideoHidden
                ? "col-span-12 mx-2 sm:mx-12 md:mx-32"
                : "col-span-12 md:col-span-5",
              "pb-12"
            )}
          >
            {isVideoHidden && (
              <div>
                <ActiveTranscription
                  currentTime={currentTime}
                  transcriptions={transcriptions}
                  contentId={contentId}
                />
              </div>
            )}
            <div
              className={`${
                isVideoHidden
                  ? "md:col-span-7 col-span-12"
                  : "md:col-span-5 col-span-12"
              } w-full text-center`}
            >
              <ScrollArea className="space-y-4 h-[400px] sm:h-[640px] rounded-md border border-gray-200 dark:border-gray-900 w-full pb-8">
                <div className="space-y-8">
                  {(active !== MAX_LIMIT
                    ? [Object.values(groupedTranscriptions)?.[0]]
                    : Object.values(groupedTranscriptions)
                  )?.map((transcriptions: any) => {
                    const hanzis = transcriptions
                      ?.map((t: any) => t?.hanzi)
                      ?.join("");
                    return (
                      <div key={JSON.stringify(transcriptions)}>
                        <div className="flex flex-wrap">
                          {(active !== MAX_LIMIT ? group : transcriptions).map(
                            (transcription: any) => {
                              return (
                                <span
                                  role="button"
                                  className={`${
                                    currentTime
                                      ? transcription?.start < currentTime &&
                                        transcription?.end > currentTime
                                        ? "dark:text-white bg-yellow-200 dark:bg-black"
                                        : "dark:text-gray-400"
                                      : "text-gray-800"
                                  } transition block py-1 px-1`}
                                  key={transcription?.hanzi}
                                  onClick={() => {
                                    playerRef.current.seekTo(
                                      transcription?.start,
                                      "seconds"
                                    );

                                    try {
                                      playerRef.current?.player?.player?.play();
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  {" "}
                                  {transcription?.input || transcription?.hanzi}
                                  {"  "}
                                </span>
                              );
                            }
                          )}
                        </div>

                        <div className="px-2 pt-2 space-x-4 flex flex-row items-center">
                          <Link
                            // href=""
                            target="_blank"
                            href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
                              hanzis
                            )}&op=translate`}
                            className="text-gray-500 hover:text-black dark:hover:text-white"
                          >
                            <FontAwesomeIcon icon={faGoogle} />
                          </Link>

                          <Link
                            // href=""
                            href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                              hanzis
                            )}`}
                            className="text-gray-500 hover:text-black dark:hover:text-white"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faLanguage} />
                          </Link>

                          {/* <Link
                      href={`/nmm/${encodeURIComponent(hanzis)}${transcriptions?.[0]?.lang ? `?lang=${resolveLangCode(transcriptions?.[0]?.lang)}` : ""}`}
                      className="text-gray-500 hover:text-black dark:hover:text-white"
                      target="_blank"
                    >
                      <Icons.mandarin />
                    </Link> */}
                          <button
                            onClick={() => {
                              if (toggleLoops?.length) {
                                setToggleLoops([]);
                              } else {
                                setToggleLoops(transcriptions);
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              className={cn(
                                "hover:text-black dark:hover:text-white",
                                toggleLoops?.find((item: any) =>
                                  transcriptions?.find(
                                    (x: any) => x.end === item?.end
                                  )
                                )
                                  ? "dark:text-white text-red-400"
                                  : "text-gray-500"
                              )}
                              icon={faRepeat}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : transcriptions?.length ? (
          <div
            className={`${isVideoHidden ? "col-span-12" : "md:col-span-5 col-span-12"} w-full`}
          >
            <ScrollArea className="space-y-4 h-[400px] sm:h-[640px] w-full rounded-md border dark:border-gray-900 border-gray-200 p-0 pb-16">
              <div className="sm:space-y-8 w-full">
                {(active !== MAX_LIMIT ? group : transcriptions || [])
                  .filter((script: any) => {
                    if (focusMode) {
                      return (
                        (script?.timestamp?.[0] || script?.start) <
                          currentTime &&
                        (script?.timestamp?.[1] || script?.end) > currentTime
                      );
                    }

                    return true;
                  })
                  .map((example: any, idx: any) => {
                    // return "TODO";
                    return (
                      <TranscriptItem
                        example={example}
                        key={`${example?.hanzi}-${idx}`}
                        toggleLoops={toggleLoops}
                        setToggleLoops={setToggleLoops}
                        currentTime={currentTime}
                        focusMode={focusMode}
                        isVideoHidden={isVideoHidden}
                        playerRef={playerRef}
                        learnedCharacters={learnedCharacters}
                        lessonId={lessonId}
                        // components={components}
                      />
                    );
                  })}
              </div>
            </ScrollArea>

            {isVideoHidden && (
              <div>
                <ActiveTranscription
                  currentTime={currentTime}
                  transcriptions={transcriptions}
                  contentId={contentId}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
