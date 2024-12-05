/* eslint-disable @next/next/no-img-element */
"use client";

import { useMusicV2 } from "@/app/(auth)/convos/_play-v2/use-music-v2";
import { formatTime } from "@/app/(auth)/convos/_play/utils";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { HanziTooltip } from "@/components/_select-character/selected-character/hanzi-tooltip";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DuChineseIcon } from "../../../components/duchinese-icon";
import { useGetDuParams } from "../../../hooks/use-get-du-params";
import { useGetChapterDetails } from "../hooks/use-get-chapter-details";
import { useListChapters } from "../../courses/[du-course-id]/hooks/use-list-chapters";
import { useListLessons } from "../../../hooks/use-list-lessons";

const sizes = {
  0: ["text-xs", "text-xl", "my-4", "px-[1px]"],
  1: ["text-sm", "text-2xl", "my-10", "px-[2px]"],
  2: ["text-[14px]", "text-3xl", "my-12"],
  3: ["text-[16px]", "text-4xl", "my-12", "px-[4px]"],
} as any;

export const DuLessonView = () => {
  const { chapterId, cookie } = useGetDuParams();

  const [textSizeIndex, setTextSizeIndex] = useState(1);
  const [selected, setSelected] = useState<any>(null);
  const [viewPinyin, togglePinyin] = useState(false);
  const [loop, setLoop] = useState<any>(null);
  const [viewPreview, setViewPreview] = useState(false);

  const [viewMode, setViewMode] = useState("core");

  const searchParams = useSearchParams();

  const _courseId = searchParams?.get("courseId") || "";

  const { data, isLoading } = useGetChapterDetails({
    chapterId,
    courseId: _courseId,
    cookie: cookie,
  });

  const course = data?.course;

  const { data: lessonsList } = useListLessons({
    levels: course?.levels || [data?.level || ""]?.filter(Boolean) || [],
    hideStudied: true,
    cookie,
  });

  const courseId = _courseId || course?.path?.split("/")?.[3] || "";

  const { data: chapters } = useListChapters({
    courseId,
    cookie,
  });

  const chapterIndex = chapters?.lessons?.findIndex(
    (lesson) => lesson?.id === data?.id
  );

  const isLastChapter = chapterIndex === (chapters?.lessons || [])?.length - 1;
  const isFirstChapter = chapterIndex === 0;

  const maxChapterIndex = (chapters?.lessons || [])?.length - 1;

  const audioUrl = data?.audio_url || "";

  const router = useRouter();

  const minIndex = Math.min(maxChapterIndex, (chapterIndex || 0) + 1);

  // const nextLessonIndex =
  //   (lessonsList?.lessons?.filter(lesson => lesson?.course?.title !== course?.title).indexOf(
  //     (lesson: any) => lesson?.course?.title === course?.title
  //   ) || 0) + 10;
  const nextLesson = isLastChapter
    ? lessonsList?.lessons?.filter(
        (lesson) => lesson?.course?.title !== course?.title
      )?.[0]
    : chapters?.lessons?.[minIndex];

  const maxIndex = Math.max(0, (chapterIndex || 0) - 1);
  // const previousLesson = chapters?.lessons?.[maxIndex];

  const previousLesson = isFirstChapter
    ? // ? lessonsList?.lessons?.[nextLessonIndex]
      lessonsList?.lessons?.filter(
        (lesson) => lesson?.course?.title !== course?.title
      )?.[0]
    : chapters?.lessons?.[maxIndex];

  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: audioUrl,
  });

  const getNextChapter = useCallback(() => {
    if (nextLesson) {
      if (typeof chapterIndex === "number" && !isLoading) {
        if (!isLastChapter) {
          const maxIndex = Math.min(maxChapterIndex, chapterIndex + 1);
          const nextChapter = chapters?.lessons?.[maxIndex];
          reset();
          router.push(`/du/${nextChapter?.path}&courseId=${courseId}`);
        } else {
          const nextLesson = lessonsList?.lessons?.filter(
            (lesson) => lesson?.course?.title !== course?.title
          )?.[0];
          reset();

          router.push(`/du/${nextLesson?.path}`);
        }
      }
    }
  }, [
    chapterIndex,
    chapters?.lessons,
    courseId,
    isLoading,
    maxChapterIndex,
    router,
    reset,
    nextLesson,
  ]);

  const getPreviousChapter = useCallback(() => {
    if (previousLesson) {
      if (typeof chapterIndex === "number" && !isLoading) {
        if (!isFirstChapter) {
          const maxIndex = Math.max(0, chapterIndex - 1);
          const previousChapter = chapters?.lessons?.[maxIndex];
          reset();
          router.push(`/du/${previousChapter?.path}&courseId=${courseId}`);
        } else {
          const nextLesson = lessonsList?.lessons?.filter(
            (lesson) => lesson?.course?.title !== course?.title
          )?.[0];
          reset();
          router.push(`/du/${nextLesson?.path}`);
        }
      }
    }
  }, [
    chapterIndex,
    chapters?.lessons,
    courseId,
    isLoading,
    router,
    reset,
    previousLesson,
  ]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.code === "ArrowLeft" || event.code === "ArrowUp") {
        // alert("check previous");
        getPreviousChapter();
      }

      if (event.code === "ArrowRight" || event.code === "ArrowDown") {
        getNextChapter();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [getNextChapter, getPreviousChapter]);

  const characterId =
    data?.subtitles?.words?.map((word) => word?.hanzi)?.join("") || "";

  useEffect(() => {
    if (loop) {
      const interval = setInterval(() => {
        const selectedWords =
          data?.subtitles?.words?.filter((word) => word?.sentence === loop) ||
          [];

        const lastEnd = Math.max(
          ...selectedWords?.map((x: any) => x?.endTime).filter(Boolean)
        );
        const firstStart = Math.min(
          ...(selectedWords || [])
            ?.map((x: any) => x?.startTime)
            .filter((val) => (typeof val === "number" ? true : Boolean(val)))
        );

        if (currentTime > lastEnd - 0.7) {
          seek(firstStart);
        }
        // setTime((seconds) => playerRef?.current?.getCurrentTime());
      }, 5);
      return () => clearInterval(interval);
    }
  }, [currentTime, data?.subtitles?.words, loop, seek]);

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  const DuChapterNavbar = () => (
    <div className="space-x-4 sm:space-x-8 flex items-center">
      {data !== undefined && (
        <Link
          href={data?.canonical_url}
          target="_blank"
          className="sm:block hidden"
        >
          <DuChineseIcon className={"h-6"} />
        </Link>
      )}
      <button
        onClick={() => {
          setViewMode((viewMode) => (viewMode === "stats" ? "core" : "stats"));
          // togglePinyin((pinyin) => !pinyin);
        }}
      >
        <Icons.chartColumn
          className={cn(
            "sm:text-lg text-2xl",
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
            "sm:text-lg text-2xl",
            viewPinyin ? "text-white" : "text-gray-400"
          )}
        />
      </button>
    </div>
  );

  const activeSubtitle = data?.subtitles?.words?.find(
    (subtitle) =>
      currentTime > subtitle?.startTime && currentTime < subtitle.endTime
  );

  const textSize = sizes?.[textSizeIndex] || sizes?.[1];

  console.log("PREVIOUS LESSON TITLE", previousLesson);

  const ActionButtons = ({ className }: { className?: string }) => {
    return (
      <div className={cn("flex justify-between items-center mt-16", className)}>
        {previousLesson ? (
          <div>
            <button
              className="text-left"
              onClick={() => {
                getPreviousChapter();
              }}
            >
              <p>Previous</p>

              <p className="mt-2 text-sm text-gray-300">{`${previousLesson?.title}`}</p>
              <p className="text-xs text-gray-400">
                {previousLesson?.course?.title}
              </p>
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {nextLesson ? (
          <div>
            <button
              className="text-left"
              onClick={() => {
                getNextChapter();
              }}
            >
              <p> Next</p>
              <p className="mt-2 text-sm text-gray-300">{`${nextLesson?.title}`}</p>
              <p className="text-xs text-gray-400">
                {nextLesson?.course?.title}
              </p>
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="mx-4 mt-4 md:mx-12">
        {/* <ActionButtons className="mb-16" /> */}

        <div className="text-gray-400">
          <Link
            onClick={() => {
              reset();
            }}
            href="/du"
            className="hover:text-white"
          >
            {" "}
            Courses{" "}
          </Link>{" "}
          {course?.title ? " / " : null}
          {course?.title ? (
            <Link
              onClick={() => {
                reset();
              }}
              href={`/du/${course?.path}`}
              className="hover:text-white"
            >
              {course?.title}
            </Link>
          ) : null}{" "}
          /{" "}
          <button
            onClick={() => {
              setViewPreview((viewPreview) => !viewPreview);
            }}
            className="hover:text-white"
          >
            {data?.title}
          </button>
        </div>

        {viewPreview && (
          <>
            <div className="mt-12">
              <p className="text-sm sm:text-lg uppercase mt-8 font-bold text-gray-400">
                {course?.levels?.join(", ")}
              </p>
              <h1 className="text-md sm:text-2xl font-bold">{data?.title}</h1>
            </div>

            {data?.synopsis && data?.synopsis !== "null" && (
              <div className="mt-16 grid gap-12 items-start grid-cols-12 w-full">
                <div className={cn("sm:col-span-3 col-span-12 pr-4")}>
                  <img
                    className={cn("w-full object-cover rounded-xl")}
                    src={data?.large_image_url}
                    alt={data?.title}
                  />
                </div>
                <div className="sm:col-span-6 col-span-12">
                  <p className="text-xl text-gray-300 font-extralight">
                    {data?.synopsis}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* <div>
          <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </code>
        </div> */}

        <div className="mt-6 mb-32 max-w-6xl m-auto relative">
          <div className="sticky top-0 pt-4 pb-[4px] bg-[rgb(9,10,11)]">
            <div className="pb-4">
              <h4 className="text-xs text-gray-500">Sentence meaning</h4>
              <div className="h-16 flex justify-between items-center mt-2 w-full">
                <p className="space-x-2 sm:text-xl text-[16px] font-extralight pb-[4px]">
                  {activeSubtitle?.sentence || "..."}
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
                    <span className="truncate">{selected?.meaning}</span>
                  </p>
                </div>
              ) : (
                <div className="h-14"></div>
              )}
            </div>
          </div>

          {viewMode === "stats" ? (
            <div>
              <CharacterAnalytics characterId={characterId} lang={"zh"} />
            </div>
          ) : (
            <div className="mt-12">
              {data?.subtitles?.words?.map((subtitle) => {
                if (
                  subtitle?.hanzi?.trim() === "\n" ||
                  subtitle?.hanzi?.trim() === "\n\n" ||
                  subtitle?.hanzi?.trim() === ""
                ) {
                  return (
                    <h1
                      className={cn("my-12", textSize?.[2])}
                      key={JSON.stringify(subtitle)}
                    ></h1>
                  );
                }

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
                      "inline-flex flex-col mt-2 items-center px-[2px]",
                      textSize?.[3]
                    )}
                  >
                    {viewPinyin && (
                      <Link
                        href={`/nmm/${subtitle.hanzi}?lang=zh`}
                        target="_blank"
                        className={cn(
                          subtitle?.pinyin ? "text-gray-500" : "text-black",
                          "text-sm",
                          currentTime > subtitle?.startTime &&
                            currentTime < subtitle.endTime
                            ? "text-white "
                            : "text-gray-500",

                          textSize?.[0],
                          activeSubtitle?.sentence === subtitle?.sentence
                            ? "text-gray-400"
                            : "text-gray-600",
                          currentTime > subtitle?.startTime &&
                            currentTime < subtitle.endTime
                            ? "text-white"
                            : "",
                          !isPlaying ? "text-gray-500" : ""
                        )}
                      >
                        {subtitle?.pinyin || ""}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        if (loop) {
                          setLoop(subtitle.sentence);
                        }
                        seek(subtitle?.startTime);
                      }}
                      className={cn(
                        "text-3xl font-light text-gray-300 hover:text-rose-400",

                        textSize?.[1],
                        activeSubtitle?.sentence === subtitle?.sentence
                          ? "text-gray-400"
                          : "text-gray-600",
                        currentTime > subtitle?.startTime &&
                          currentTime < subtitle.endTime
                          ? "text-white"
                          : "0",
                        !isPlaying ? "text-gray-300" : ""
                      )}
                    >
                      {subtitle?.hanzi}
                      {"   "}
                    </button>
                  </span>
                  // </HanziTooltip>
                );
              })}
            </div>
          )}

          <ActionButtons />
        </div>
      </div>

      <div className="fixed bottom-0 py-4 px-4 sm:px-16 w-full z-30 m-auto bg-[rgb(12,13,14)]">
        <section className="flex items-center justify-between">
          <div className="space-x-2">
            <button
              onClick={() => {
                setTextSizeIndex((prev) => Math.min(3, prev + 1));
              }}
              className={cn(
                textSizeIndex === 3 ? "text-gray-400" : "",
                "text-2xl"
              )}
            >
              A
            </button>

            <button
              onClick={() => {
                setTextSizeIndex((prev) => Math.max(0, prev - 1));
              }}
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
                loop ? "text-white" : "text-gray-400"
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

          <DuChapterNavbar />
        </section>
      </div>
    </div>
  );
};
