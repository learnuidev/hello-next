"use client";
import { useState } from "react";
import {
  AnalyticsIcon,
  CloseIcon,
  NextIcon,
  Header,
  PrevIcon,
  PinyinChartIcon,
} from "@/components/ui/icons";
import { useRouter } from "next/navigation";

import { Music, useMusic } from "@/components/music";

import {
  course,
  course2,
  course3,
  course4,
  course5,
} from "./pronounciation_data";
import { useLessonHistoryStore } from "./useLessonHistory";
import { useViewModeStore } from "./useViewModeStore";
import { PronounciationAnalytics } from "./PronounciationAnalytics";
// import { PronounciationSuggestions } from "ui/PronunciationSuggestions";
// import { dictionary } from "ui/data/hmm/data/dictionary";
import { useCurrentLesson } from "./useCurrentLesson";
import { course1, useSpeakStore } from "./useSpeakStore";
import Link from "next/link";
// import Dictaphone from "./useSpeechRecognition_v2";
// import { Speak } from "./use-speech-recognition";
// import { ChartPage } from "../chart/v1";

export const Pronounciation = ({ lessonId }: any) => {
  console.log("LESSONID", lessonId);
  const router = useRouter();
  const [lessonIndex, setLessonIndex] = useState(0);
  const [selectedChar, setSelectedChar] = useState<any>({});
  const [results, setResults] = useState<any>({});

  const setLesson = useCurrentLesson((state: any) => state.setCurrentLesson);
  // const lessonId = useCurrentLesson((state: any) => state.lessonId)
  const lessons = useSpeakStore((state: any) => state.lessons);
  // const lessons = course1.lessons

  const lessonHistories = useLessonHistoryStore((state: any) => state.history);
  const setLessonHistories = useLessonHistoryStore(
    (state: any) => state.setHistory
  );

  // const lessonArr =

  // const lesson1 = lessonsArr?.find((lesson: any) => lesson?.id === lessonId)

  // const { play, togglePlay, seek, currentTime, reset } = useMusic({
  //   url: lesson1.audio,
  // });

  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  // mediaIndex % medias.length
  // const lesson = course6.lessons[lessonIndex] as any

  const currentLesson = lessons?.find((lesson: any) => lesson.id == lessonId);

  const lesson = currentLesson?.lessons?.[lessonIndex] as any;

  // const {
  //   transcript,
  //   transcripts,
  //   listening,
  //   startListening,
  //   stopListening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition({
  //   lang: "",
  //   onTranslated: (resp: any) => {
  //     console.log("TRANSLATIONS", resp);
  //     setResults((prevResult: any) => {
  //       return {
  //         ...prevResult,
  //         [lesson.id]: resp,
  //       };
  //     });

  //     setLessonHistories({
  //       lessonId: lesson?.id,
  //       time: new Date().getTime(),
  //       answer: resp,
  //     });
  //   },
  // });

  const isCorrect = () => {
    return lesson?.hanziV2?.replace(", ", "").replace("?", "");
    // return (
    //   res.transcript === lesson?.hanzi ||
    //   lesson?.alternateAnswers?.includes(res.transcript)
    // )
  };

  const calcConfidenceColor = (
    val: any,
    answer: any,
    expectedAnswer: any,
    alternateAnswers = []
  ) => {
    console.log("ANSWER", answer);
    // alert('answer', answer)
    // alert(answer)
    // alert(expectedAnswer)
    const expAns = expectedAnswer
      .replace(", ", "")
      .replace("?", "")
      .split("")
      .filter(Boolean)
      .join("")
      .split(" ")
      .filter((item: any) => ![", ", "？", "，"].includes(item))
      .join("");

    console.log("ANS", answer);

    console.log("expAns", expAns);

    if (expAns.includes(answer)) {
      return "text-green-500";
    }
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

  // const browserSupportsSpeechRecognition = true

  const res = results?.[lesson?.id];

  const viewMode = useViewModeStore((state: any) => state.viewMode);

  if (viewMode === "analytics") {
    return (
      <PronounciationAnalytics
        // lessonId={lesson?.id}
        lessonIndex={lessonIndex}
      />
    );
  }

  // if (viewMode === "suggestion") {
  //   return <PronounciationSuggestions lessonIndex={lessonIndex} />;
  // }

  // const setPrevCourse = (lessonId) => {
  //   const lessonIdx = course1.lessons?.findIndex(
  //     (lesson) => lesson.id === lessonId
  //   );

  //   const lesson = course?.lessons?.[lessonIdx - 1];

  //   router.push(`/speak/${lesson?.id}`);
  // };
  // const setNextCourse = (lessonId) => {
  //   const lessonIdx = course1.lessons?.findIndex(
  //     (lesson) => lesson.id === lessonId
  //   );

  //   const lesson = course?.lessons?.[lessonIdx + 1];

  //   router.push(`/speak/${lesson?.id}`);
  // };

  const trans = res?.[0]?.transcript;

  // console.log(l;)

  console.log("hanzi", res);

  // const selectedDictionary = dictionary?.[selectedChar?.selected];

  // if (browserSupportsSpeechRecognition && lesson) {
  if (true && lesson) {
    return (
      <div className="pt-28 grow flex flex-col items-center min-h-screen overflow-y-auto">
        {/* <Dictaphone /> */}
        {/* <Speak /> */}
        <div className="mb-8 md:my-8 text-center">
          <Header className="text-black dark:text-gray-400 text-xl font-extrabold mb-8">
            {lesson?.type === "quiz/multiple-choice"
              ? "Select the correct answer"
              : "Please repeat the following"}
          </Header>

          <Header className="my-2 text-black dark:text-white text-4xl font-extrabold">
            {(lesson?.pinyin || lesson?.title)
              .split("")
              .map((item: any, idx: any) => {
                return (
                  <span
                    key={`${item}-${idx}`}
                    className={`${
                      trans?.includes(lesson?.hanziV2) ||
                      trans === lesson?.hanziV2 ||
                      lesson?.alternateAnswers?.includes(trans) ||
                      lesson?.hanziV2.includes(trans)
                        ? "dark:text-gray-300"
                        : "text-gray-300"
                    }`}
                  >
                    {item}
                  </span>
                );
              })}
          </Header>
          {lesson?.type === "quiz/multiple-choice" ? null : (
            <Header className="text-black dark:text-white text-3xl font-extrabold">
              {lesson?.hanzi?.split("").map((item: any, idx: number) => {
                return (
                  <span
                    key={`${JSON.stringify(item)}-${idx}`}
                    className={`${
                      trans?.includes(lesson?.hanziV2) ||
                      trans === lesson?.hanziV2 ||
                      lesson?.alternateAnswers?.includes(trans) ||
                      lesson?.hanziV2.includes(trans)
                        ? "dark:text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {item}
                  </span>
                );
              })}
            </Header>
          )}
          <Header className="md:mx-32 my-4 text-black text-xl dark:text-gray-400 text-gray-600">
            {lesson?.en}
          </Header>
        </div>
        {lesson ? (
          <div>
            {/* <h1>{lesson.title}</h1> */}
            <div>
              <Music
                className="text-4xl dark:text-gray-500 dark:hover:text-gray-400 hover:text-gray-900"
                onAudioEnd={() => {
                  // setLessonIndex(idx => idx + 1)
                }}
                url={lesson.sound}
              />
            </div>
          </div>
        ) : (
          <div>You have run out of content</div>
        )}
        <div className={"dark:text-white my-16"}>
          {res?.length &&
            [res[res.length - 1]]?.map((res: any, idx) => {
              return (
                <div
                  key={`${JSON.stringify(res)}-${idx}`}
                  className="flex flex-col justify-start space-y-2 items-center"
                >
                  <p
                    // onClick={() => {
                    //   setSelectedChar({
                    //     hanziV2: lesson?.hanziV2,
                    //     selected: lesson?.hanziV2
                    //   })
                    // }}
                    // role={'button'}
                    className={
                      "text-5xl md:text-6xl dark:text-gray-200 text-gray-800"
                    }
                  >
                    {/* {res.transcript} */}
                    {res.transcript.split("").map((c: any, idx: number) => {
                      return (
                        <span
                          key={`${JSON.stringify(c)}-${idx}`}
                          onClick={() => {
                            // alert(c)
                            setSelectedChar({
                              hanziV2: lesson?.hanziV2,
                              selected: c,
                            });
                          }}
                          className={
                            lesson?.hanziV2.includes(c)
                              ? "dark:text-gray-300 text-gray-700"
                              : lesson.alternateAnswers?.includes(c)
                              ? "text-purple-500"
                              : "text-orange-500"
                          }
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
          {/* {JSON.stringify(results?.[lesson.id])} */}
        </div>
        {/* {lesson?.type === "quiz" ? (
          <SpeechToText
            play={play}
            togglePlay={togglePlay}
            handleSuggestion={() => {
              setViewMode("suggestion");
            }}
            onClear={() => {
              setResults({});
            }}
          />
        ) : null} */}
        {lesson?.type === "quiz/multiple-choice" ? (
          <div className="absolute bottom-40 space-x-8 text-4xl mt-16 space-x-8 ">
            {lesson?.options?.map((option: any) => {
              return (
                <button
                  className="dark:bg-slate-900 dark:text-gray-300 dark:hover:text-white px-8 py-2 shadow-2 shadow-md hover:shadow-blue-600 rounded-full transition"
                  onClick={() => {
                    setResults((prevResult: any) => {
                      return {
                        ...prevResult,
                        [lesson.id]: [{ transcript: option, confidence: 0.99 }],
                      };
                    });

                    setLessonHistories({
                      lessonId: lesson?.id,
                      time: new Date().getTime(),
                      answer: [{ transcript: option, confidence: 0.99 }],
                    });
                  }}
                  key={option}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : null}
        <div className="absolute w-full top-0 py-8 px-8 md:px-16">
          <div className="flex justify-between items-center w-full grow">
            {/* <div className='' /> */}

            <div>
              <Link
                href="/speak"
                className="text-xl md:text-4xl dark:hover:text-white shadow-md md:px-4 py-1 rounded-full dark:text-slate-600 shadow-md rounded-full"
                // onClick={() => {
                //   setViewMode('')
                //   setLesson('')
                //   console.log('SHOW ANALYTICS')
                // }}
              >
                <CloseIcon />
              </Link>
            </div>

            <div className="mr-[-72px] space-x-2">
              <button
                className="dark:hover:text-white shadow-md px-4 py-1 rounded-full dark:text-gray-600 shadow-md px-4 py-1 rounded-full"
                onClick={() => {
                  setLessonIndex((idx) =>
                    idx === 0 ? course?.lessons?.length + 2 : idx - 1
                  );
                }}
                // disabled={lessonIndex === 0}
              >
                <PrevIcon className="text-4xl" />
              </button>
              <button
                className="dark:hover:text-white shadow-md px-4 py-1 rounded-full dark:text-gray-600 shadow-md px-4 py-1 rounded-full"
                onClick={() => {
                  setLessonIndex((idx) => idx + 1);
                }}
              >
                <NextIcon className="text-4xl" />
              </button>
            </div>

            <div>
              <button
                className="text-4xl dark:hover:text-white shadow-md px-4 py-1 rounded-full dark:text-gray-600 shadow-md px-4 py-1 rounded-full"
                onClick={() => {
                  setViewMode("pinyin");
                }}
              >
                <PinyinChartIcon />
              </button>
              <button
                className="text-4xl dark:hover:text-white shadow-md px-4 py-1 rounded-full dark:text-gray-600 shadow-md px-4 py-1 rounded-full"
                onClick={() => {
                  setViewMode("analytics");
                }}
              >
                <AnalyticsIcon />
              </button>
            </div>
          </div>
        </div>
        {lesson?.hanziV2 === selectedChar?.hanziV2 ? (
          <div className="">
            {/* {selectedChar?.selected} */}
            {/* {JSON.stringify(dictionary?.[selectedChar?.selected])} */}
            <p>{}</p>
          </div>
        ) : null}
      </div>
    );
  }

  // if (browserSupportsSpeechRecognition) {
  //   return (
  //     <div className="grow flex flex-col items-center min-h-screen overflow-y-auto">
  //       <div className="pt-60 text-3xl dark:text-gray-300 font-extralight">
  //         You have run out of content
  //       </div>

  //       <button
  //         className="my-4"
  //         onClick={() => {
  //           setLessonIndex(0);
  //         }}
  //       >
  //         Restart
  //       </button>
  //     </div>
  //   );
  // }
  return (
    <div className="grow ml-4 md:ml-16 flex flex-col items-center min-h-screen overflow-y-auto">
      <Header className="my-2 md:my-16 text-black dark:text-white text-3xl font-extrabold">
        xiǎo húlí
      </Header>
    </div>
  );
};
