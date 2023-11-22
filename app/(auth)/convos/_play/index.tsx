"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FocusIcon, FocusIcon as Header } from "@/components/ui/icons";

import { course1, useConvosStore } from "@/data/convos/bm1";

import { useMusic } from "./use-music";

// import { useSpeechRecognition } from "./use-speech-recognition";
import { PlayButton } from "./play-button";
import {
  course,
  course2,
  course3,
  course4,
  course5,
} from "@/data/pronunciation_data";
import { useLessonHistoryStore } from "./use-lesson-history";
import { useRepeatHistoryStore } from "./use-repeat-history";
import { useViewModeStore } from "./use-view-mode";

import { useModeStore, usePinyinModeStore } from "./use-mode";

import React from "react";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { useSearchParams } from "next/navigation";
import { Transcription } from "@/domain/transcription/transcription.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/pro-thin-svg-icons";
import Link from "next/link";
import { faGoogle, faSkyatlas } from "@fortawesome/free-brands-svg-icons";

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor("hanzi", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span className="mx-4">hanzi</span>,
  }),
  columnHelper.accessor("pinyin", {
    id: "pinyin",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span className="mx-4">pinyin</span>,
    // footer: info => info.column.id
  }),
  columnHelper.accessor("en", {
    id: "en",
    cell: (info) => <i>{info.getValue() || "n / a"}</i>,
    header: () => <span className="mx-12">english</span>,
    // footer: info => info.column.id
  }),
];

export const Play = ({ lessonId }: { lessonId: string }) => {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [selectedChar, setSelectedChar] = useState<any>("");
  const [results, setResults] = useState<any>({});

  const { data: hskWords } = useListHSKWordsQuery();

  const calculateHskColor = (char: string) => {
    const hsk = hskWords?.find((hsk: any) => hsk?.hanzi === char);

    switch (hsk?.level) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-orange-400";
      case 3:
        return "text-green-400";
      case 4:
        return "text-purple-400";
      case 5:
        return "text-blue-400";
      case 6:
        return "text-red-400";
      case 9:
        return "text-gray-600";
      default:
        return "texe-slate-500";

        return "text-orange-400";
    }
  };

  const lessonsArr = useConvosStore((state) => state?.convos);

  // const results = useResults(store => store.results)

  // const characterDictionary = dictionary?.[selectedChar];

  const lessonHistories = useLessonHistoryStore((state: any) => state.history);
  const setLessonHistories = useLessonHistoryStore(
    (state: any) => state.setHistory
  );
  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );
  const repeatHistories = useRepeatHistoryStore((state: any) => state.history);

  console.log({ repeatHistories });

  const setSpeechHistories = useLessonHistoryStore(
    (state: any) => state.setHistory
  );
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const pinyinMode = usePinyinModeStore((state: any) => state?.pinyinMode);
  const setPinyinMode = usePinyinModeStore(
    (state: any) => state?.setPinyinMode
  );

  const mode = useModeStore((state: any) => state.mode);
  const focusMode = mode === "focus";
  const setMode = useModeStore((state: any) => state.setMode);

  const lesson = course5.lessons[lessonIndex] || null;

  const lesson1 = lessonsArr?.find((lesson: any) => lesson?.id === lessonId);

  const isCorrect = () => {
    return lesson?.hanziV2?.replace(", ", "").replace("?", "");
  };

  const formatNumber = (time: any) => (time > 9 ? `${time}` : `0${time}`);

  const toggleMode = (arg: any) => () => {
    setMode((prevMode: any) => {
      return prevMode === arg ? "" : arg;
    });
  };

  const formatTime = (ex: any) => {
    const example = Math.floor(ex);
    if (example > 60) {
      const minutes = Math.floor(example / 60);
      const seconds = example % 60;
      return `00:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    }
    return example > 9 ? `00:00:${example}` : `00:00:0${example}`;
  };

  const calcConfidenceColor = (
    val: any,
    answer: any,
    expectedAnswer: any,
    alternateAnswers = []
  ) => {
    const expAns = expectedAnswer
      .replace(", ", "")
      .replace("?", "")
      .split("")
      .filter(Boolean)
      .join("")
      .split(" ")
      .filter((item: any) => ![", ", "？", "，"].includes(item))
      .join("");

    if (
      (answer !== expAns.trim() &&
        !lesson?.alternateAnswers?.includes(answer) &&
        !expAns.includes(answer)) ||
      !expectedAnswer.includes(expAns)
    ) {
      return "text-red-500";
    }
    if (val > 70) {
      return "text-green-500";
    }
    if (val < 70) {
      return "text-yellow-500";
    }
    if (val < 60) {
      return "text-orange-500";
    }
  };

  const res = results?.[lesson?.id];

  const viewMode = useViewModeStore((state: any) => state.viewMode);

  console.log("LESSON 1", lesson1);

  const searchParams = useSearchParams();

  const { data: contentsArr } = useListContentsQuery();

  const lesson2 = contentsArr?.find(
    (content: any) => content?.id === searchParams?.get("lessonId")
  );

  const { play, togglePlay, seek, currentTime, reset } = useMusic({
    url: lesson1?.audio?.slow || lesson1?.audio || lesson2?.audio,
  });

  const scrollRef = useRef(null);

  const lessons = lesson1?.lesson
    ? lesson1?.lesson.filter((item: any) => {
        const [time, ...rest] = item;
        const startTime = time[1][0][0];

        const earliestTime = time[1][0];
        const latestTime = time[1][time[1].length - 1];

        return (
          // !play ||
          !focusMode ||
          (earliestTime[0] < currentTime && latestTime[1] > currentTime)
        );

        // return item[0][1].some(
        //   (t: any) => t[1] > currentTime && t[0] < currentTime
        // )
      })
    : lesson1?.transcriptions?.transcriptions?.filter((transcription: any) => {
        // const time = [null, [[transcription?.start]]]

        const earliestTime = transcription.start;
        const latestTime = transcription.end;

        // const item = []
        // return transcription

        return (
          // !play ||
          !focusMode || (earliestTime < currentTime && latestTime > currentTime)
        );
      });

  const lessonItems = lesson2?.transcriptions?.map(
    (transcription: Transcription) => {
      const { start, end, hanzi, pinyin, en } = transcription;

      return [
        ["time", [[start, end, start]]],
        ["", hanzi],
        ["", pinyin],
        ["", ""],
        ["", en],
      ];
    }
  );

  return (
    <div className="pt-8 grow flex flex-col items-center">
      <div className="bg-black fixed bottom-0 pt-4 flex items-center justify-between min-w-full md:px-32 bg-opacity-80">
        <p className="w-16 font-extralight text-2xl text-center dark:text-slate-300 text-slate-600">
          {formatTime(currentTime)}
        </p>

        <PlayButton
          lessonId={lesson1?.id}
          play={play}
          togglePlay={togglePlay}
          handleSuggestion={() => {
            setViewMode("suggestion");
          }}
          onClear={() => {
            setResults({});
          }}
        />
        <div className="space-x-4">
          <button onClick={toggleMode("focus")}>
            <FocusIcon
              className={`z-50 text-xl p-2 md:text-3xl ${
                focusMode
                  ? "dark:text-white text-slate-700"
                  : "dark:text-slate-400 text-slate-300"
              } dark:hover:text-slate-100 hover:text-slate-900 transition md:px-4`}
            />
          </button>
          <button
            onClick={() => {
              setPinyinMode(!pinyinMode);
            }}
          >
            <FontAwesomeIcon
              className={`z-50 text-xl p-2 md:text-3xl ${
                pinyinMode
                  ? "dark:text-white text-slate-700"
                  : "dark:text-slate-400 text-slate-300"
              } dark:hover:text-slate-100 hover:text-slate-900 transition md:px-4`}
              icon={faLanguage}
            />

            {/* <FocusIcon
              className={`z-50 text-xl p-2 md:text-3xl ${
                focusMode
                  ? "dark:text-white text-slate-700"
                  : "dark:text-slate-400 text-slate-300"
              } dark:hover:text-slate-100 hover:text-slate-900 transition md:px-4`}
            /> */}
          </button>
        </div>
      </div>

      {/* timestamps */}
      <div className="flex flex-wrap">
        {(
          lesson1?.lesson ||
          lesson1?.transcriptions?.transcriptions ||
          lesson1?.lessonsV2 ||
          lessonItems
        )?.map((item: any, idx: any) => {
          if (item?.text) {
            const earliestTime = item?.[0]?.[1]?.[0]?.[0] || item?.start;
            const latestTime = item?.[0]?.[1]?.[0]?.[1] || item?.end;

            return (
              <button
                key={`${idx}-${idx}-${lesson?.id}-${idx}`}
                onClick={() => {
                  seek(earliestTime || 0);

                  setRepeatHistories({
                    lessonId: lesson1?.id || lesson2.id,
                    eventType: "speech/repeat",
                    eventTime: new Date().getTime(),
                    startTime: earliestTime || 0,
                    scriptIndex: idx,
                    // item
                  });
                }}
                className={`mx-4 my-2 text-xl dark:hover:text-white font-extralight text-black`}
              >
                <div
                  className={`${
                    earliestTime < currentTime && latestTime > currentTime
                      ? "text-slate-300 dark:text-slate-900 bg-slate-200 hover:bg-white"
                      : "text-slate-900 bg-slate-500 hover:bg-white"
                  } h-2 w-2 rounded-full transition`}
                ></div>
              </button>
            );
          }
          const [time, ...rest] = item;
          const earliestTime = time?.start ? time?.start : time[1][0];
          const latestTime = time?.end
            ? time?.end
            : time[1][time[1].length - 1];

          return (
            <button
              key={`${lesson?.id}-${idx}-912312912391239casasd`}
              onClick={() => {
                seek(earliestTime[0]);

                setRepeatHistories({
                  lessonId: lesson1?.id || lesson2.id,
                  eventType: "speech/repeat",
                  eventTime: new Date().getTime(),
                  startTime: earliestTime[0],
                  scriptIndex: idx,
                  // item
                });
              }}
              className={`mx-4 my-2 text-xl ${
                currentTime > earliestTime
                  ? "dark:text-slate-600"
                  : earliestTime[0] < currentTime && latestTime[1] > currentTime
                  ? "dark:text-slate-500"
                  : "dark:text-slate-200"
              } dark:hover:text-white font-extralight`}
            >
              {/* {formatTime(earliestTime[0])} */}
              <div
                className={` ${
                  currentTime > earliestTime
                    ? "dark:text-slate-600"
                    : earliestTime[0] < currentTime &&
                      latestTime[1] > currentTime
                    ? "dark:bg-slate-200"
                    : "dark:bg-slate-600"
                } h-2 w-2 rounded-full text`}
              ></div>
              {/* {idx + 1} */}
            </button>
          );
        })}
      </div>
      {/* timestamps */}

      {focusMode ? (
        <div className="pt-24 space-y-8">
          {lesson2?.transcriptions
            ?.filter((item: Transcription) => {
              return item.start < currentTime && item.end > currentTime;
            })
            .map((transcription: Transcription) => {
              return (
                <div
                  className={`text-center`}
                  key={`${transcription?.hanzi}-${transcription?.pinyin}`}
                >
                  <div
                    role="button"
                    onClick={() => {
                      seek(transcription?.start);

                      setRepeatHistories({
                        lessonId: lesson1?.id || lesson2.id,
                        eventType: "speech/repeat",
                        eventTime: new Date().getTime(),
                        startTime: transcription.start,
                        hanzi: transcription.hanzi,
                        pinyin: transcription.pinyin,
                        en: transcription.en,
                        step: transcription.step,
                        // item
                      });
                    }}
                  >
                    <p className={`${pinyinMode ? "text-3xl" : "text-3xl"}`}>
                      {transcription?.hanzi}
                    </p>

                    {pinyinMode ? (
                      <>
                        <p className="dark:text-gray-400 text-md">
                          {transcription?.pinyin}
                        </p>
                        <p className="dark:text-gray-300 text-md">
                          {transcription?.en}
                        </p>
                      </>
                    ) : null}
                  </div>

                  <div className="my-8 space-x-8">
                    <Link
                      href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                        transcription?.hanzi
                      )}`}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faSkyatlas} />
                    </Link>

                    <Link
                      target="_blank"
                      href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
                        transcription?.hanzi
                      )}&op=translate`}
                    >
                      <FontAwesomeIcon icon={faGoogle} />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="pt-12 space-y-8">
          {/* {JSON.stringify(lesson2?.transcriptions)} */}

          {lesson2?.transcriptions?.map((transcription: Transcription) => {
            return (
              <div
                role="button"
                className={`text-center`}
                key={`${transcription?.hanzi}-${transcription?.pinyin}`}
                onClick={() => {
                  seek(transcription?.start);

                  setRepeatHistories({
                    lessonId: lesson1?.id || lesson2.id,
                    eventType: "speech/repeat",
                    eventTime: new Date().getTime(),
                    startTime: transcription.start,
                    hanzi: transcription.hanzi,
                    pinyin: transcription.pinyin,
                    en: transcription.en,
                    step: transcription.step,
                    // item
                  });
                }}
              >
                <p className={`${pinyinMode ? "text-3xl" : "text-3xl"}`}>
                  {transcription?.hanzi}
                </p>
                {pinyinMode ? (
                  <>
                    <p className="dark:text-gray-400 text-md">
                      {transcription?.pinyin}
                    </p>
                    <p className="dark:text-gray-300 text-md">
                      {transcription?.en}
                    </p>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
