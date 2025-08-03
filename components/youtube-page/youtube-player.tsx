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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Icons } from "../ui/icons.v2";
import { KaraokeMode } from "./karaoke-mode";
import { TranscriptItem } from "./youtube-transcript-item";

import { isVideoUrl } from "@/app/(auth)/convos/utils/is-video-url";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { useDebouncedCallback } from "use-debounce";
import { ActiveTranscription } from "./active-transcription";
import { getActiveTranscriptions } from "./get-active-transcriptions";
import { useContentEditStore } from "./use-content-edit-store";
import { useCurrentTime } from "./use-current-time-store";
import { getYablaLink } from "./utils/get-yabla-link";
import { useIsSmall } from "./utils/use-is-small";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  useContextPlayContextState,
  usePlayHistoryStore,
} from "./hooks/use-play-history-state";
import { FloatingNavbar } from "../floating-navbar";
import { TheDock } from "../the-dock";
import { formatTime } from "@/app/(auth)/convos/_play/utils";
import { smartSplit } from "./utils/smart-split";
import { useWordsClickedHistoryStore } from "./hooks/use-words-clicked-history-state";

interface ViewModeState {
  viewMode: string;
  setViewMode: (mode: any) => void;

  active: number;
  setActive: (active: number) => void;

  toggleLoop: any | null;
  setToggleLoop: (toggleLoop: any | null) => void;

  toggleLoops: any[];
  setToggleLoops: (toggleLoops: any[]) => void;

  qaMode: boolean;
  setQaMode: (qaMode: boolean) => void;

  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;

  isVideoHidden: boolean;
  setIsVideoHidden: (isVideoHidden: boolean) => void;

  focusMode: boolean;
  setFocusMode: (focusMode: boolean) => void;
}

const MAX_LIMIT = 9000;
const THIRTY = 30;
const SIXTY = 60;
const NINTY = 90;

const useViewModeStore = create(
  persist(
    (set: any, get: any) => ({
      viewMode: "para",
      setViewMode: (viewMode: any) =>
        typeof viewMode === "function"
          ? set({ viewMode: viewMode(get().viewMode) })
          : set({ viewMode }),

      active: NINTY,
      setActive: (active: any) => set({ active }),

      toggleLoop: null,
      setToggleLoop: (toggleLoop: any) => set({ toggleLoop }),

      toggleLoops: [],
      setToggleLoops: (toggleLoops: any) =>
        typeof toggleLoops === "function"
          ? set({ toggleLoops: toggleLoops(get().toggleLoops) })
          : set({ toggleLoops }),

      qaMode: false,
      setQaMode: (qaMode: any) => set({ qaMode }),

      isPlaying: false,
      setIsPlaying: (isPlaying: any) => set({ isPlaying }),

      isVideoHidden: false,
      setIsVideoHidden: (isVideoHidden: any) =>
        typeof isVideoHidden === "function"
          ? set({ isVideoHidden: isVideoHidden(get().isVideoHidden) })
          : set({ isVideoHidden }),

      focusMode: false,
      setFocusMode: (focusMode: any) => set({ focusMode }),
    }),
    {
      name: "mandarino/youtube-view-mode",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function YouTubePlayer({ lessonId }: { lessonId: string }) {
  const viewMode = useViewModeStore((state) => state.viewMode);
  const setViewMode = useViewModeStore((state) => state.setViewMode);

  const active = useViewModeStore((state) => state.active);
  const setActive = useViewModeStore((state) => state.setActive);

  const toggleLoop = useViewModeStore((state) => state.toggleLoop);
  const setToggleLoop = useViewModeStore((state) => state.setToggleLoop);

  const _toggleLoops: any = useViewModeStore((state) => state.toggleLoops);

  const toggleLoops = useMemo(
    () => _toggleLoops?.filter((loop: any) => loop?.contentId === lessonId),
    [_toggleLoops, lessonId]
  );
  const setToggleLoops = useViewModeStore((state) => state.setToggleLoops);

  const qaMode = useViewModeStore((state) => state.qaMode);
  const setQaMode = useViewModeStore((state) => state.setQaMode);

  const isPlaying = useViewModeStore((state) => state.isPlaying);
  const setIsPlaying = useViewModeStore((state) => state.setIsPlaying);

  const isVideoHidden = useViewModeStore((state) => state.isVideoHidden);
  const setIsVideoHidden = useViewModeStore((state) => state.setIsVideoHidden);

  const focusMode = useViewModeStore((state) => state.focusMode);
  const setFocusMode = useViewModeStore((state) => state.setFocusMode);

  const editMode = useContentEditStore((state) => state.editMode);

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(lessonId);
  const params = useParams<{ "content-id": string }>();
  const contentId = params["content-id"];
  const playerRef = useRef(null) as any;
  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const { data: learnedCharacters } = useListComponents();

  const updateContentMutation = useUpdateContentMutation();

  const searchParams = useSearchParams();

  const start = searchParams.get("start");

  const { data: lesson } = useGetContentQuery({ contentId: lessonId });

  const finalUrl = lesson?.audio;

  const seekAndPlay = (time: any) => {
    playerRef.current.seekTo(time, "seconds");

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!currentTime && start && isVideoUrl(finalUrl)) {
      playerRef.current.seekTo(start, "seconds");

      try {
        playerRef.current?.player?.player?.play();
      } catch (err) {
        console.error(err);
      }
    }
  }, [currentTime, finalUrl, start]);

  const onReady = useCallback(() => {
    const timeToStart = 7 * 60 + 12.6;

    if (start) {
      if (isVideoUrl(finalUrl)) {
        if (!currentTime && `${currentTime}` !== `${start}`) {
          seekAndPlay(start);
        }
      } else {
        playerRef.current.seekTo(start, "seconds");

        try {
          playerRef.current?.player?.player?.play();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [start, finalUrl, currentTime]);

  const [loopCounter, setLoopCounter] = useState(0);

  const { data: transcriptionsData } = useListSentencesQuery({
    component: lessonId,
    lang: "zh",
    genSents: false,
  }) as any;

  const router = useRouter();
  const { contextId, setNewContextId } = useContextPlayContextState();
  const setHistory = usePlayHistoryStore((state) => state.setHistory);
  const transcriptions = lesson?.transcriptions
    ? lesson?.transcriptions
    : transcriptionsData?.length
      ? transcriptionsData
      : lesson?.transcriptions;

  const togglePlay = useCallback(() => {
    if (playerRef?.current?.player?.isPlaying) {
      playerRef?.current?.player?.player?.pause();
    } else {
      playerRef?.current?.player?.player.play();
    }
  }, [playerRef]);

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

      playerRef.current.seekTo(prevTranscription?.start, "seconds");

      try {
        playerRef.current?.player?.player?.play();
      } catch (err) {
        console.error(err);
      }
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

    playerRef.current.seekTo(nextTranscription?.start, "seconds");

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  }, [currentTime, transcriptions]);

  const currentTranscription = transcriptions?.find(
    (trans: any) => trans?.start <= currentTime && trans?.end >= currentTime
  );

  const toggleLoopHandler = useCallback(() => {
    setToggleLoops((val: any) => {
      const exist = val?.[0];
      if (exist) {
        return [];
      }
      return val.concat({ ...currentTranscription, contentId: lessonId });
    });
  }, [currentTranscription, lessonId, setToggleLoops]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === "Space" && !editMode) {
        // Vishal 07-12-2024-10-20: prevents the browser from scrolling down

        event.preventDefault();
        togglePlay();
        return null;
      }

      if (event.code === "ArrowLeft" && !editMode) {
        seekBefore();
        return null;
      }

      if (event.code === "ArrowRight" && !editMode) {
        seekAfter();
        return null;
      }

      if (["l"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        toggleLoopHandler();
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [
    togglePlay,
    seekBefore,
    seekAfter,
    currentTranscription,
    editMode,
    toggleLoopHandler,
  ]);

  const currentTranscriptionIndex = Math.max(
    transcriptions?.findIndex(
      (trans: any) => trans?.start === currentTranscription?.start
    ),
    0
  );

  const debounceSeek = useDebouncedCallback((firstStart: any) => {
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

  const currentChapter = lesson?.chapters?.find(
    (chapter: any) => chapter?.start < currentTime && chapter?.end > currentTime
  );

  const finishedChapters = lesson?.chapters?.filter((chapter: any) => {
    return currentTime > chapter?.start;
  });

  const lastFinishedChapter = finishedChapters?.[finishedChapters?.length - 1];

  const setWords = useWordsClickedHistoryStore((state) => state.setHistory);

  const trans = useMemo(() => {
    return transcriptions;
  }, [transcriptions]);

  const groupedTranscriptions = groupBy(trans || []);

  const isSmall = useIsSmall();

  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const resetTimes = useContentEditStore((state) => state.resetTimes);
  const times = useContentEditStore((state) => state.times);

  const group = useMemo(() => {
    return getActiveTranscriptions({
      limit: active,
      currentTime,
      transcriptions: transcriptions || [],
    });
  }, [active, currentTime, transcriptions]);

  const ActiveButton = () => {
    return (
      <div className="space-x-4 sm:mt-0 mt-4 sm:text-xl flex justify-center">
        <button
          className={
            active === THIRTY ? "dark:text-white text-black" : "text-gray-500"
          }
          onClick={() => {
            setActive(THIRTY);
          }}
        >
          30s
        </button>
        <button
          className={
            active === SIXTY ? "dark:text-white text-black" : "text-gray-500"
          }
          onClick={() => {
            setActive(SIXTY);
          }}
        >
          60s
        </button>
        <button
          className={
            active === NINTY ? "dark:text-white text-black" : "text-gray-500"
          }
          onClick={() => {
            setActive(NINTY);
          }}
        >
          90s
        </button>
        <button
          className={
            active === 120 ? "dark:text-white text-black" : "text-gray-500"
          }
          onClick={() => {
            setActive(120);
          }}
        >
          120s
        </button>
        <button
          className={
            active === 9000 ? "dark:text-white text-black" : "text-gray-500"
          }
          onClick={() => {
            setActive(MAX_LIMIT);
          }}
        >
          All
        </button>
      </div>
    );
  };

  const paraTranscriptions =
    active !== MAX_LIMIT
      ? [Object.values(groupedTranscriptions)?.[0]]
      : Object.values(groupedTranscriptions);

  return (
    <>
      <div className="grow flex flex-col items-center">
        <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between w-full sm:px-12 mb-4">
          <div className="space-x-4 sm:my-4 block z-50 flex">
            <button
              className={
                viewMode === "karaoke" ? "dark:text-white" : "text-gray-500"
              }
              onClick={() => {
                setViewMode((prev: any) =>
                  prev === "karaoke" ? null : "karaoke"
                );
                setIsVideoHidden((isHidden: any) =>
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
                setIsVideoHidden((isHidden: any) => !isHidden);
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
            {lesson?.questions?.length > 0 && (
              <button
                className={qaMode ? "dark:text-white" : "text-gray-500"}
                onClick={() => {
                  setQaMode(!qaMode);
                }}
              >
                <Icons.qa />
              </button>
            )}

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
                    } as any)
                    .then((resp) => {
                      setEditMode();
                    });
                }}
              >
                Save
              </button>
            )}

            {editMode && (
              <UploadFileButton
                icon={
                  <Icons.upload className="text-[16px] dark:hover:text-white transition" />
                }
                types={["mp3", "m4a", "mp4"]}
                className="hidden sm:block"
                onSuccess={(res) => {
                  return updateContentMutation.mutateAsync({
                    id: contentId || "",
                    audio: res.sourceUrl,
                    audioUploadBucketKey: res.uploadBucketKey,
                    audioS3LinkAddedAt: Date.now(),
                    updateContent: true,
                  } as any);
                }}
              />
            )}
          </div>
          {viewMode === "karaoke" ? null : <ActiveButton />}
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div
            className={` ${isVideoHidden ? "hidden" : ""} md:col-span-7 col-span-12`}
          >
            <div className="">
              <ReactPlayer
                // progressInterval={50}
                onProgress={(value) => {
                  setHistory({
                    transcriptionId: currentTranscription?.id,
                    contextId,
                    contentId: lessonId,
                    createdAt: Date.now(),
                    progressTime: value.playedSeconds,
                  });
                  setTime(value.playedSeconds);
                }}
                onPlay={() => {
                  setIsPlaying(true);
                  setNewContextId();
                }}
                onPause={() => {
                  setIsPlaying(false);
                }}
                onEnded={() => {
                  setIsPlaying(false);
                }}
                ref={playerRef}
                url={finalUrl}
                playing={isPlaying}
                width="100%"
                height={isSmall ? "200px" : "450px"}
                controls
                onReady={onReady}
              />
            </div>

            {/* {lesson?.chapters && (
            <div className={"flex justify-center items-center gap-4 mt-8"}>
              {lesson?.chapters?.map((chapter: any) => {
                return (
                  <button
                    key={chapter?.description}
                    onClick={() => {
                      seekAndPlay(chapter?.start);
                    }}
                    className={` h-4 w-4 rounded-full text dark:fill-white`}
                  >
                    <div
                      className={` ${
                        (chapter?.start > currentTime &&
                          chapter?.end < currentTime) ||
                        lastFinishedChapter?.start === chapter?.start
                          ? "dark:bg-white bg-black"
                          : "dark:bg-slate-600 bg-slate-200 "
                      } h-2 w-2 rounded-full `}
                    ></div>
                  </button>
                );
              })}
            </div>
          )} */}

            <ActiveTranscription
              currentTime={currentTime}
              transcriptions={transcriptions}
              contentId={contentId}
            />
          </div>

          <div
            className={
              isVideoHidden
                ? "col-span-12 mx-2 sm:mx-12 md:mx-32"
                : "col-span-12 md:col-span-5"
            }
          >
            {viewMode === "karaoke" ? (
              <div
                className={
                  isVideoHidden
                    ? "col-span-12 mx-2 sm:mx-12 md:mx-32"
                    : "col-span-12 md:col-span-5"
                }
              >
                <KaraokeMode
                  lang={lesson?.lang}
                  isPlaying={isPlaying}
                  seekTo={(time: number) => {
                    playerRef.current.seekTo(time, "seconds");

                    try {
                      playerRef.current?.player?.player?.play();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  play={() => {
                    try {
                      playerRef.current?.player?.player?.play();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  transcriptions={transcriptions}
                  currentTime={currentTime}
                />
              </div>
            ) : viewMode === "para" ? (
              <div
                className={cn(
                  isVideoHidden
                    ? "col-span-12 mx-0 sm:mx-12 md:mx-32"
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

                {qaMode && lesson?.questions?.length > 0 && (
                  <div className="">
                    <ScrollArea className="space-y-4 h-[350px] rounded-md shadow-lg dark:shadow-gray-800 p-2 dark:border-gray-900 w-full pb-8">
                      <div className={"flex flex-col gap-4"}>
                        {lesson.questions.map((question: any) => {
                          return (
                            <button
                              key={question.description}
                              onClick={() => {
                                seekAndPlay(question.start);
                              }}
                              className="text-left"
                            >
                              <div
                                className={` ${
                                  question.start <= currentTime &&
                                  question.end >= currentTime
                                    ? "dark:text-white text-black"
                                    : " text-gray-500"
                                }`}
                              >
                                {question.title}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                )}
                <div
                  className={cn(
                    `${
                      isVideoHidden
                        ? "md:col-span-7 col-span-12"
                        : "md:col-span-5 col-span-12"
                    } w-full text-center`,
                    qaMode ? "mt-8" : ""
                  )}
                >
                  <ScrollArea
                    className={cn(
                      `space-y-4 rounded-md shadow-lg dark:shadow-gray-800 p-2 dark:border-gray-900 w-full pb-8`,
                      qaMode ? "h-[350px]" : "h-[400px] sm:h-[640px]"
                    )}
                  >
                    <div className="space-y-8">
                      {paraTranscriptions?.map((transcriptions: any) => {
                        const hanzis = transcriptions
                          ?.map((t: any) => t?.hanzi)
                          ?.join("");

                        return (
                          <div key={JSON.stringify(transcriptions)}>
                            <div className="flex flex-wrap">
                              {(active !== MAX_LIMIT
                                ? group
                                : transcriptions
                              ).map((transcription: any) => {
                                const isActiveTranscription =
                                  transcription?.start < currentTime &&
                                  transcription?.end > currentTime;

                                const transcriptionInput =
                                  transcription?.input || transcription?.hanzi;

                                return (
                                  <span
                                    role="button"
                                    className={`${
                                      currentTime
                                        ? isActiveTranscription
                                          ? "dark:text-white bg-yellow-200 dark:bg-black"
                                          : "dark:text-gray-400"
                                        : ""
                                    } transition block py-1 px-1`}
                                    key={
                                      transcription?.id ||
                                      `${transcription?.hanzi}-${transcription?.start}`
                                    }
                                    onClick={() => {
                                      setRepeatHistories({
                                        contentId: contentId,
                                        ...transcription,
                                        input:
                                          transcription?.input ||
                                          transcription?.hanzi,
                                        roman:
                                          transcription?.roman ||
                                          transcription?.pinyin,
                                        createdAt: Date.now(),
                                      });

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
                                    {smartSplit({
                                      input: transcriptionInput,
                                      lang: lesson?.lang,
                                    })?.map((item: string, idx: number) => {
                                      return (
                                        <span
                                          onClick={() => {
                                            setWords({
                                              word: item,
                                              transcriptionId:
                                                transcription?.id,
                                              contentId: lessonId,
                                            });
                                          }}
                                          key={`para-mode-${item}-${idx}-${transcriptionInput}`}
                                        >
                                          {item}
                                        </span>
                                      );
                                    })}
                                    {/* {isActiveTranscription
                                    ? smartSplit({
                                        input: transcriptionInput,
                                        lang: lesson?.lang,
                                      })?.map((item: string, idx: number) => {
                                        return (
                                          <CharacterItem
                                            disableClass
                                            key={`${idx}-youtube-player-active-transcription-${item}-${idx}`}
                                            character={item}
                                          />
                                        );
                                      })
                                    : transcriptionInput} */}
                                  </span>
                                );
                              })}
                            </div>

                            <div className="px-2 pt-2 space-x-4 flex flex-row items-center">
                              <Link
                                target="_blank"
                                href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
                                  hanzis
                                )}&op=translate`}
                                className="text-gray-500 hover:text-black dark:hover:text-white"
                              >
                                <FontAwesomeIcon icon={faGoogle} />
                              </Link>

                              <Link
                                href={getYablaLink(hanzis)}
                                className="text-gray-500 hover:text-black dark:hover:text-white"
                                target="_blank"
                              >
                                <FontAwesomeIcon icon={faLanguage} />
                              </Link>

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
                {isVideoHidden && (
                  <div>
                    <ActiveTranscription
                      currentTime={currentTime}
                      transcriptions={transcriptions}
                      contentId={contentId}
                    />
                  </div>
                )}

                <ScrollArea className="space-y-4 h-[400px] sm:h-[640px] w-full rounded-md shadow-lg dark:shadow-gray-900 p-0 pb-16">
                  <div className="sm:space-y-8 w-full">
                    {(active !== MAX_LIMIT ? group : transcriptions || [])
                      .filter((script: any) => {
                        if (focusMode) {
                          return (
                            (script?.timestamp?.[0] || script?.start) <
                              currentTime &&
                            (script?.timestamp?.[1] || script?.end) >
                              currentTime
                          );
                        }

                        return true;
                      })
                      .map((example: any, idx: any) => {
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
                          />
                        );
                      })}
                  </div>
                </ScrollArea>
              </div>
            ) : null}
          </div>

          <p className="dark:text-[rgb(10,11,12)] text-white">
            todotodotodotodotodotodotodotodotodotodotodotodotodotodotodotodotodotodotodotodotodo
          </p>
        </div>
      </div>

      {/* <FloatingNavbar /> */}

      <TheDock
        className="bottom-2"
        // innerClassName={isReviewUrl ? "sm:block" : ""}
        isAutomatic={false}
      >
        <div
          className={cn(
            "transition",
            "flex items-center w-full justify-center"
          )}
        >
          <div className="overflow-y-auto px-8 py-2 bg-gray-50 dark:bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <div className="space-x-6 md:space-x-4 flex justify-center items-center w-full">
              <button
                onClick={() => {
                  toggleLoopHandler();
                }}
                className={cn(
                  `transition  hover:text-rose-400 dark:hover:text-white text-xl`,
                  toggleLoops?.length > 0
                    ? "dark:text-white text-black"
                    : "dark:text-gray-500 text-gray-300"
                )}
              >
                <Icons.loop className="transition" />
              </button>

              <p className="font-extralight w-28 text-xl text-center dark:text-slate-300 text-slate-600">
                {formatTime(currentTime)}
              </p>

              <button
                className="sm:text-2xl text-[16px] w-4 dark:text-white text-black"
                onClick={() => {
                  togglePlay();
                }}
              >
                {isPlaying ? <Icons.pause /> : <Icons.play />}
              </button>
            </div>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </div>
        </div>
        {/* <FloatingNavbarComp /> */}
      </TheDock>
    </>
  );
}
