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

import { useModeStore } from "./use-mode";

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

  return (
    <div className="pt-8 grow flex flex-col items-center min-h-screen overflow-y-auto">
      <div className="fixed flex items-center justify-between min-w-full md:px-32">
        <p className="font-extralight text-2xl md:text-5xl text-center dark:text-slate-300 text-slate-600">
          {formatTime(currentTime)}
        </p>
        <div className="space-x-4">
          <button
            className={`z-50 text-xl p-2 md:text-3xl ${
              focusMode
                ? "dark:text-white text-slate-700"
                : "dark:text-slate-500 text-slate-300"
            } dark:hover:text-slate-100 hover:text-slate-900 transition md:px-4`}
            onClick={toggleMode("focus")}
          >
            <FocusIcon />
          </button>
        </div>
      </div>

      <div className={"dark:text-white my-2"}>
        {res?.length &&
          [res[res.length - 1]]?.map((res: any) => {
            return (
              <div
                key={res?.id}
                className="flex flex-col justify-start md:space-y-2 items-center"
              >
                <p
                  className={
                    "text-5xl md:text-6xl dark:text-slate-200 text-slate-800"
                  }
                >
                  {res.transcript.split("")?.map((c: any) => {
                    return (
                      <span
                        onClick={() => {
                          // setSelectedChar({
                          //   hanziV2: lesson?.hanziV2,
                          //   selected: c
                          // })
                        }}
                        className={
                          lesson?.hanziV2.includes(c)
                            ? "dark:text-slate-300 text-slate-700"
                            : lesson.alternateAnswers?.includes(c)
                            ? "text-purple-500"
                            : "text-orange-500"
                        }
                        key={c}
                      >
                        {c}{" "}
                      </span>
                    );
                  })}
                </p>
                <p
                  className={`text-2xl ${calcConfidenceColor(
                    res.confidence * 100,
                    res.transcript,
                    lesson?.hanziV2,
                    lesson?.alternateAnswers as any
                  )}`}
                >
                  {isCorrect() ? (res.confidence * 100).toFixed(2) : 0}%
                </p>
              </div>
            );
          })}
      </div>

      {/* timestamps */}
      <div className="z-50">
        <div className="flex md:mx-60 flex-wrap ">
          {(
            lesson1?.lesson ||
            lesson1?.transcriptions?.transcriptions ||
            lesson1?.lessonsV2
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
                      lessonId: lesson1.id,
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
                    lessonId: lesson1.id,
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
                    : earliestTime[0] < currentTime &&
                      latestTime[1] > currentTime
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
      </div>
      {/* timestamps */}

      {/* <div className={`pt-24 space-y-8`}>
        {!lessons?.length
          ? null
          : lessons
              ?.filter((item: any, idx: any) => {
                if (!focusMode) {
                  return item;
                }

                return idx === 0;
              })
              ?.map((item: any, idx: any, self: any) => {
                if (item.text) {
                  const earliestTime = item?.start;
                  const latestTime = item?.end;

                  const translations =
                    lesson1?.transcriptions?.translation?.segments
                      ?.filter(
                        (segment: any) =>
                          (segment.start >= item?.start &&
                            segment.end <= item?.end) ||
                          (segment.start <= item?.start &&
                            segment.end >= item?.end) ||
                          segment.start == item?.start
                      )
                      ?.map((item: any) => item?.text)
                      ?.join(" ");

                  return (
                    <div key={`${lesson?.id}-${idx}-asdasd`} className="mx-32">
                      <div>
                        <h1
                          role="button"
                          onClick={() => {
                            seek(earliestTime);

                            setRepeatHistories({
                              lessonId: lesson1.id,
                              eventType: "speech/repeat",
                              eventTime: new Date().getTime(),
                              startTime: earliestTime[0],
                              hanzi: item.text,
                              scriptIndex: idx,
                              // item
                            });
                          }}
                          className={`text-center md:text-4xl font-bold ${
                            earliestTime < currentTime &&
                            latestTime > currentTime
                              ? "text-slate-500"
                              : "text-slate-200"
                          }`}
                        >
                          {item.text}
                        </h1>

                        <p
                          className={`text-center md:text-2xl font-extralight ${
                            earliestTime < currentTime &&
                            latestTime > currentTime
                              ? "text-slate-500"
                              : "dark:text-slate-200 text-slate-500"
                          }`}
                        >
                          {translations}
                        </p>
                      </div>
                    </div>
                  );
                }
                const [time, ...rest] = item;
                const startTime = time[1][0][0];

                const earliestTime = time[1][0];
                const latestTime = time[1][time[1].length - 1];

                if (
                  earliestTime[0] < currentTime &&
                  latestTime[1] > currentTime
                ) {
                  return (
                    <div key={`${lesson?.id}-${idx}-23das`} ref={scrollRef}>
                      {focusMode ? (
                        <div>
                          <div className="w-full text-center my-2 md:text-md md:space-y-2">
                            <h1 className="font-extrabold text-2xl mb-4 md:mb-8 dark:text-slate-400 text-slate-700">
                              {[
                                // @ts-ignore
                                ...new Set(
                                  rest.map((item: any) => item && item[0])
                                ),
                              ].join(" / ")}
                            </h1>
                          </div>
                        </div>
                      ) : null}
                      <div
                        className={`transition text-3xl flex justify-center items-start ${
                          (earliestTime[0] < currentTime &&
                            latestTime[1] > currentTime) ||
                          !play
                            ? "dark:text-slate-100 text-slate-700"
                            : self?.[idx - 1]?.[0]?.[1]?.some(
                                (t: any) => t[1] > currentTime
                              )
                            ? "text-slate-200 dark:text-slate-500 dark:hover:text-slate-400"
                            : "text-slate-300 dark:text-slate-600 dark:hover:text-slate-500"
                          // : 'text-slate-400'
                        }`}
                      >
                        {focusMode ? null : (
                          <button
                            className="hidden md:block mr-4 text-left text-2xl"
                            onClick={() => {
                              seek(startTime);

                              setRepeatHistories({
                                lessonId: lesson1.id,
                                eventType: "speech/repeat",
                                eventTime: new Date().getTime(),
                                startTime,
                                scriptIndex: idx,
                                // item
                              });
                            }}
                          >
                            {formatTime(startTime)}
                          </button>
                        )}
                        <div className="w-full md:text-md md:space-y-2">
                          {" "}
                          {rest.map((item: any, idx: any) => {
                            if (!item) {
                              return null;
                            }

                            // hanzi
                            if (idx === 0) {
                              return (
                                <div
                                  key={`${lesson?.id}-${idx}-212asdasd`}
                                  className={
                                    focusMode
                                      ? "flex items-start md:mb-12"
                                      : "flex items-start"
                                  }
                                >
                                  {focusMode ? null : (
                                    <span className="text-[14px] md:text-lg font-bold min-w-[100px] md:min-w-[140px]">
                                      {item[0]}
                                    </span>
                                  )}
                                  <span
                                    className={
                                      focusMode
                                        ? "text-[14px] md:text-5xl font-light pl-2"
                                        : "text-[14px] md:text-2xl font-light pl-2"
                                    }
                                  >
                                    {item[1]
                                      ?.split(" ")
                                      ?.filter(Boolean)
                                      ?.map((char: any, idx: any) => {
                                        return (
                                          <span
                                            key={`${lesson?.id}-${idx}-asd1212fw12e`}
                                            className={`${calculateHskColor(
                                              char
                                            )} ${
                                              lesson1?.powerWords?.includes(
                                                char
                                              )
                                                ? "font-bold"
                                                : ""
                                            }`}
                                            onClick={() => {
                                              // alert(char)

                                              setSelectedChar(
                                                char
                                                  .replace(",", "")
                                                  .replace("?", "")
                                                  .replace("？", "")
                                              );
                                            }}
                                          >
                                            {char}
                                          </span>
                                        );
                                      })}
                                  </span>
                                </div>
                              );
                            }

                            // rest of the translations
                            return (
                              <div
                                key={`${lesson?.id}-${idx}-sa12dsasd12cqx`}
                                className={
                                  focusMode
                                    ? `flex items-start dark:text-slate-100 text-slate-500`
                                    : "flex items-start"
                                }
                              >
                                {focusMode ? null : (
                                  <span className="text-[14px] md:text-lg font-bold min-w-[100px] md:min-w-[140px]">
                                    {item[0]}
                                  </span>
                                )}
                                <span
                                  className={
                                    focusMode
                                      ? "text-[14px] text-center md:text-2xl font-light pl-2"
                                      : "text-[14px] md:text-2xl font-light pl-2"
                                  }
                                >
                                  {item[1]
                                    ?.split(" ")
                                    ?.filter(Boolean)
                                    ?.map((char: any, idx: any) => {
                                      return (
                                        <span
                                          key={`${lesson?.id}-${idx}-123cs12casasdasd`}
                                          // className='dark:text-green-500'
                                          onClick={() => {
                                            // alert(char)

                                            setSelectedChar(
                                              char
                                                .replace(",", "")
                                                .replace("?", "")
                                                .replace("？", "")
                                            );
                                          }}
                                        >
                                          {" "}
                                          {char}
                                        </span>
                                      );
                                    })}
                                </span>
                              </div>
                            );
                          })}{" "}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={`${lesson?.id}-${idx}-asdsd2sd1234dsdc`}>
                    {focusMode ? (
                      <div>
                        <div className="w-full text-center my-2 md:text-md space-y-2">
                          <h1 className="font-extrabold text-2xl mb-4 md:mb-8 dark:text-slate-400 text-slate-700">
                            {[
                              // @ts-ignore
                              ...new Set(
                                rest.map((item: any) => item && item[0])
                              ),
                            ].join(" / ")}
                          </h1>
                        </div>
                      </div>
                    ) : null}
                    <div
                      className={`transition text-3xl flex justify-center items-start ${
                        (earliestTime[0] < currentTime &&
                          latestTime[1] > currentTime) ||
                        !play
                          ? "text-slate-800"
                          : self?.[idx - 1]?.[0]?.[1]?.some(
                              (t: any) => t[1] > currentTime
                            )
                          ? "text-slate-500 dark:hover:text-slate-400"
                          : "text-slate-600 dark:hover:text-slate-500"
                        // : 'text-slate-400'
                      }`}
                    >
                      {focusMode ? null : (
                        <button
                          className="hidden md:block mr-4 text-left text-2xl"
                          onClick={() => {
                            seek(startTime);

                            setRepeatHistories({
                              lessonId: lesson1.id,
                              eventType: "speech/repeat",
                              eventTime: new Date().getTime(),
                              startTime,
                              scriptIndex: idx,
                              // item
                            });
                          }}
                        >
                          {formatTime(startTime)}
                        </button>
                      )}
                      <div className="w-full md:text-md md:space-y-2">
                        {" "}
                        {rest.map((item: any, idx: any) => {
                          if (!item) {
                            return null;
                          }

                          // hanzi
                          if (idx === 0) {
                            return (
                              <div
                                key={`${lesson?.id}-${item?.id}-${idx}`}
                                className={
                                  focusMode
                                    ? "flex items-start md:mb-12"
                                    : "flex items-start"
                                }
                              >
                                {focusMode ? null : (
                                  <span className="text-[14px] md:text-lg font-bold min-w-[100px] md:min-w-[140px]">
                                    {item[0]}
                                  </span>
                                )}
                                <span
                                  className={
                                    focusMode
                                      ? "text-[14px] md:text-4xl md:text-5xl font-light pl-2"
                                      : "text-[14px] md:text-2xl font-light pl-2"
                                  }
                                >
                                  {item[1]
                                    ?.split(" ")
                                    ?.filter(Boolean)
                                    ?.map((char: any, idx: any) => {
                                      return (
                                        <span
                                          key={`${lesson?.id}-${item?.id}-${idx}`}
                                          className={`${calculateHskColor(
                                            char
                                          )} ${
                                            lesson1?.powerWords?.includes(char)
                                              ? "font-bold"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            // alert(char)

                                            setSelectedChar(
                                              char
                                                .replace(",", "")
                                                .replace("?", "")
                                                .replace("？", "")
                                            );
                                          }}
                                        >
                                          {char}
                                        </span>
                                      );
                                    })}
                                </span>
                              </div>
                            );
                          }

                          // rest of the translations
                          return (
                            <div
                              key={`${lesson?.id}-${item?.id}-${idx}`}
                              className={
                                focusMode
                                  ? `flex items-start dark:text-slate-100 text-slate-600`
                                  : "flex items-start"
                              }
                            >
                              {focusMode ? null : (
                                <span className="text-[14px] md:text-lg font-bold min-w-[100px] md:min-w-[140px]">
                                  {item[0]}
                                </span>
                              )}
                              <span
                                className={
                                  focusMode
                                    ? "text-center text-[14px] md:text-2xl font-light pl-2"
                                    : "text-[14px] md:text-2xl font-light pl-2"
                                }
                              >
                                {item[1]
                                  ?.split(" ")
                                  ?.filter(Boolean)
                                  ?.map((char: any, idx: any) => {
                                    return (
                                      <span
                                        key={`${lesson?.id}-${item?.id}-${idx}`}
                                        onClick={() => {
                                          setSelectedChar(
                                            char
                                              .replace(",", "")
                                              .replace("?", "")
                                              .replace("？", "")
                                          );
                                        }}
                                      >
                                        {" "}
                                        {char}
                                      </span>
                                    );
                                  })}
                              </span>
                            </div>
                          );
                        })}{" "}
                      </div>
                    </div>
                  </div>
                );
              })}
      </div> */}

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
    </div>
  );
};
