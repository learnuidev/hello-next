"use client";

import { useMusicV2 } from "@/app/(auth)/convos/_play-v2/use-music-v2";
import { formatTime } from "@/app/(auth)/convos/_play/utils";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DuChineseIcon } from "../../../components/duchinese-icon";
import { useGetDuParams } from "../../../hooks/use-get-du-params";
import { useGetChapterDetails } from "../hooks/use-get-chapter-details";

const sizes = {
  0: ["text-xs", "text-xl", "my-4", "px-[2px]"],
  1: ["text-sm", "text-2xl", "my-10", "px-[2px]"],
  2: ["text-[14px]", "text-3xl", "my-12"],
  3: ["text-[16px]", "text-4xl", "my-12", "px-[4px]"],
} as any;

export const DuLessonView = () => {
  const { chapterId, cookie } = useGetDuParams();

  const [textSizeIndex, setTextSizeIndex] = useState(1);
  const [selected, setSelected] = useState<any>(null);
  const [viewPinyin, togglePinyin] = useState(false);

  const [viewMode, setViewMode] = useState("core");

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

  const textSize = sizes?.[textSizeIndex] || sizes?.[1];

  return (
    <div className="relative">
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

            <DuChapterNavbar />
          </section>

          <div className="h-12 mb-4">
            <h4 className="text-xs text-gray-500">Sentence meaning</h4>

            <div className="flex justify-between items-center mt-2 w-full">
              <p className="space-x-2 text-[16px] font-extralight">
                {activeSubtitle?.sentence}
              </p>
            </div>
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
          </div>
        </div>

        {viewMode === "stats" ? (
          <div>
            <CharacterAnalytics characterId={characterId} lang={"zh"} />
          </div>
        ) : (
          <div className="mt-12">
            {data?.subtitles?.words?.map((subtitle) => {
              if (subtitle?.hanzi === "\n") {
                return (
                  <h1
                    className={cn("my-12", textSize?.[2])}
                    key={JSON.stringify(subtitle)}
                  ></h1>
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
                        !isPlaying ? "text-gray-500" : "",
                        textSize?.[0],
                        activeSubtitle?.sentence === subtitle?.sentence
                          ? "text-gray-400"
                          : "text-gray-600",
                        currentTime > subtitle?.startTime &&
                          currentTime < subtitle.endTime
                          ? "text-white"
                          : ""
                      )}
                    >
                      {subtitle?.pinyin || ""}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      seek(subtitle?.startTime);
                    }}
                    className={cn(
                      "text-3xl font-light text-gray-300 hover:text-rose-400",

                      !isPlaying ? "text-gray-300" : "",
                      textSize?.[1],
                      activeSubtitle?.sentence === subtitle?.sentence
                        ? "text-gray-400"
                        : "text-gray-600",
                      currentTime > subtitle?.startTime &&
                        currentTime < subtitle.endTime
                        ? "text-white"
                        : "0"
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
    </div>
  );
};
