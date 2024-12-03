"use client";

import { useSearchParams } from "next/navigation";
import { useGetDuParams } from "../../../hooks/use-get-du-params";
import { useListTopLessons } from "../../../hooks/use-list-top-lessons";
import { useGetChapterDetails } from "../hooks/use-get-chapter-details";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Icons } from "@/components/ui/icons.v2";
import { useState } from "react";
import { useMusicV2 } from "@/app/(auth)/convos/_play-v2/use-music-v2";
import { formatTime } from "@/app/(auth)/convos/_play/utils";
import { useGetCharacterAnalytics } from "@/components/_select-character/use-get-character-analytics";
import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { DuChineseIcon } from "../../../components/duchinese-icon";

export const DuLessonView = () => {
  const { chapterId, cookie } = useGetDuParams();
  const [selected, setSelected] = useState<any>(null);
  const [viewPinyin, togglePinyin] = useState(false);

  const [viewMode, setViewMode] = useState("core");

  const { data: courses } = useListTopLessons({ cookie });

  const searchParams = useSearchParams();

  const courseId = searchParams?.get("courseId") || "";

  const { data } = useGetChapterDetails({
    chapterId,
    courseId,
    cookie: `oHAI2NVPZgiAz%2F%2FR4YbLaUgYCpCxgIuwHUSADEqYngzUXQeBlLaUBAvozrtvHy8vbDy9v0dNJcHOa5FMPKwC6xmxLn3PtZRz6OHGzY7On0eiGL2t0rsJ2nDeYiiwyqzJdLRj18Xf0nqrDtiWXxQKh%2BHquYx49VE8WAtHH3GR1q3dd7idL2PFiYU384VoqqrJ8PtaVtXnkQg2i1W%2BQJ9QdbvPCSq%2BhdqhTI21teAtRZUSeIE9FmDBFPsWJiL7Q%2FAXvOeC4Lj9PYKF2lWZ3IwVnluL0UYuhVujxlhWwOTnylx1tcr9Q%2BTEvYNiziVaeyJbSO7DNLsXrkM2Ui53D1NppsTaLXv%2Bi8We71NmnvCz5HseHB%2BEPLc%2BEMYRpO02siEFKW18g7e1%2B1YyAJ0L7uWiYSHsfsj2jdm13TW1Y6XIC3JnHebFxBSGWozHZ3FUrtR%2BgpNtj37N5fIf8My%2B8DASmen8kacwr8VJURBZTP3TDdaLBGi7YAVbLGIXhAySZhK3L%2BQSSXWUxgVf6cM0ZJcAYVTZpgsDSnKnvFhD0PKGVoyL6GDF%2BAG5oH2Dmdu%2BDEEYV%2FPy7u01JODCvQxMIVvFJJ%2Bfq5go0YMU%2BA0%3D--5wP9B4t69qnaAiEB--CcfIMirI1Ix1oPBxDhXIQQ%3D%3D`,
  });

  const audioUrl = data?.audio_url || "";

  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: audioUrl,
  });

  const course = data?.course;

  const characterId =
    data?.subtitles?.words?.map((word) => word?.hanzi)?.join("") || "";

  const duAnalytics = useGetCharacterAnalytics({
    characterId:
      data?.subtitles?.words?.map((word) => word?.hanzi)?.join("") || "",
    lang: "zh",
  });

  const {
    understandingRate,
    precisionRate,
    totalCharacters,
    totalNewCharaters,
    newCharaters,
    uniqueWords,
    masteryRate,
  } = duAnalytics;

  if (!course) {
    return <LottieLoadingAnimation />;
  }

  const DuChapterNavbar = () => (
    <div className="space-x-4 sm:space-x-8 flex items-center">
      <Link href={data?.canonical_url} target="_blank" className="block">
        <DuChineseIcon className={"h-6"} />
      </Link>
      <button
        onClick={() => {
          setViewMode((viewMode) => (viewMode === "stats" ? "core" : "stats"));
          // togglePinyin((pinyin) => !pinyin);
        }}
      >
        <Icons.chartColumn
          className={cn(
            "text-2xl",
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
            "text-2xl",
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

  return (
    <div className="relative">
      {/* <code>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </code> */}
      <div className="text-gray-400">
        <Link href="/du" className="hover:text-white">
          {" "}
          Stories{" "}
        </Link>{" "}
        /{" "}
        <Link href={`/du/${course?.path}`} className="hover:text-white">
          Story: {course?.title}
        </Link>{" "}
        / <span>{chapterId}</span>
      </div>

      {/* <div className="mt-12 mb-4 sticky">
        <p className="uppercase mt-8 font-bold text-gray-400">
          {course?.levels?.join(", ")}
        </p>
        <h1 className="text-2xl font-bold">{course?.title}</h1>
      </div> */}

      <div className="mt-12 max-w-6xl m-auto mb-32 relative">
        <div className="sticky top-0 pt-4 pb-[4px] bg-[rgb(9,10,11)]">
          <section className="mb-8 flex items-center justify-between">
            <div className="space-x-4 flex items-center">
              <button
                className="text-2xl"
                onClick={() => {
                  togglePlay();
                }}
              >
                {isPlaying ? <Icons.pause /> : <Icons.play />}
                {/* {isPlaying ? (
                <div>
                  <div className="flex space-x-1" aria-hidden="true">
                    <div className="w-1 h-4 bg-white animate-wave1"></div>
                    <div className="w-1 h-4 bg-white animate-wave2"></div>
                    <div className="w-1 h-4 bg-white animate-wave3"></div>
                  </div>
                </div>
              ) : (
                <Icons.play />
              )} */}
              </button>
              <button
                className="text-2xl"
                onClick={() => {
                  reset();
                }}
              >
                <Icons.stop />
              </button>

              <p className="w-16 font-extralight text-2xl text-center dark:text-slate-300 text-slate-600">
                {formatTime(currentTime)}
              </p>
            </div>

            <DuChapterNavbar />
          </section>

          <div className="h-12 mb-4">
            <h4 className="text-xs text-gray-500">Sentence meaning</h4>

            <div className="flex justify-between items-center mt-2 w-full">
              <p className="space-x-2 text-[16px] font-extralight">
                {selected?.sentence || activeSubtitle?.sentence}
              </p>

              {/* {selected?.hsk && <p>HSK {selected?.hsk}</p>} */}
            </div>

            {/* <span>{JSON.stringify(selected)}</span> */}
          </div>
          <div className="h-12 mb-4">
            <h4 className="text-xs text-gray-500">Word meaning</h4>

            <div className="flex justify-between items-center mt-2 w-full">
              <p className="space-x-2 text-[16px] font-extralight">
                <span>{selected?.hanzi}</span>

                <span className="text-red-400">{selected?.pinyin}</span>

                <span className="truncate">{selected?.meaning}</span>
              </p>

              {selected?.hsk && <p>HSK {selected?.hsk}</p>}
            </div>

            {/* <span>{JSON.stringify(selected)}</span> */}
          </div>
        </div>

        {viewMode === "stats" ? (
          <div>
            {/* <code>
              <pre>
                {JSON.stringify(
                  {
                    understandingRate,
                    precisionRate,
                    totalCharacters,
                    totalNewCharaters,
                    newCharaters,
                  },
                  null,
                  4
                )}
              </pre>
            </code>{" "} */}

            <CharacterAnalytics characterId={characterId} lang={"zh"} />
          </div>
        ) : (
          <div className="mt-12">
            {data?.subtitles?.words?.map((subtitle) => {
              if (subtitle?.hanzi === "\n") {
                return (
                  <h1 className="my-12" key={JSON.stringify(subtitle)}></h1>
                );
              }

              return (
                <span
                  onMouseEnter={() => {
                    setSelected(subtitle);
                  }}
                  onMouseLeave={() => {
                    setSelected(null);
                  }}
                  key={JSON.stringify(subtitle)}
                  className={cn(
                    "inline-flex flex-col mt-2 items-center px-[2px]"
                  )}
                >
                  {viewPinyin && (
                    <Link
                      href={`/nmm/${subtitle.hanzi}?lang=zh`}
                      target="_blank"
                      className={cn(
                        subtitle?.pinyin ? "text-gray-500" : "text-black",
                        "text-sm",
                        // currentTime > subtitle?.startTime &&
                        //   currentTime < subtitle.endTime
                        activeSubtitle?.sentence === subtitle?.sentence
                          ? "text-white"
                          : "text-gray-500"
                      )}
                    >
                      {subtitle?.pinyin || ""}
                    </Link>
                  )}
                  <button
                    // as="button"
                    // href={`/nmm/${subtitle.hanzi}?lang=zh`}
                    // target="_blank"
                    onClick={() => {
                      seek(subtitle?.startTime);
                    }}
                    className={cn(
                      "text-3xl font-light text-gray-300 hover:text-rose-400",
                      activeSubtitle?.sentence === subtitle?.sentence
                        ? // currentTime > subtitle?.startTime &&
                          //   currentTime < subtitle.endTime
                          "text-white"
                        : "text-gray-500"
                    )}
                  >
                    {subtitle?.hanzi}
                    {"   "}
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* <code>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </code> */}
    </div>
  );
};
