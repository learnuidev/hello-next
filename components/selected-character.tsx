// import Image from 'next/image'
"use client";

import { useMemo, useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGlass,
  faGlassesRound,
  faRocketLaunch,
  faSpaceStationMoon,
  faX,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";

import { useParams, useSearchParams } from "next/navigation";

import Link from "next/link";
import { useSelectedCharacter } from "@/app/(auth)/convos/use-selected-character";

import { useListContentsQuery } from "@/domain/content/content.queries";

import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { calculateColor } from "@/app/nmm/utils";
import { cleanString } from "@/data/convos/bm1/utils";
import { PlayIcon } from "./ui/icons";
import { NomadMethod } from "@/app/nmm/nomad-method";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";

export function SelectedCharacter() {
  const [view, setView] = useState("sentences");
  const searchParams = useSearchParams();

  const lessonId = searchParams.get("lessonId");
  // const params = useParams() as {
  //   lessonId: string
  // }
  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: contents } = useListContentsQuery();

  const allContents = useMemo(
    () => contents?.map((content: any) => content?.transcriptions)?.flat(),
    [contents]
  );

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const relevantAnswersHanzi = useMemo(
    () => [
      // @ts-ignore
      ...new Set(
        allAnswers
          ?.filter((answer: any) => {
            return answer?.phraseId?.includes(selectedChar);
          })
          ?.map((x: any) => x?.phraseId)
      ),
    ],
    []
  );

  const relevantAnswers = useMemo(
    () =>
      allAnswers?.filter((answer: any) => {
        return answer?.phraseId?.includes(selectedChar?.hanzi || selectedChar);
      }),
    [allAnswers, selectedChar]
  );

  // const uniqueAnswers = relevantAnswersHanzi?.map((x: string) => {
  //   return relevantAnswers?.find((ans: any) => ans?.hanzi === x);
  // });

  const answerMap = useMemo(
    () => R.indexBy(R.prop("hanzi"), relevantAnswers),
    [R, relevantAnswers]
  ) as Record<string, { hanzi: string; journeyId: string; phraseId: string }>;

  const uniqueAnswerIds = useMemo(
    () => [
      // @ts-ignore
      ...new Set(relevantAnswers?.map((answer: any) => answer?.hanzi)),
    ],
    [relevantAnswers]
  );

  const { data: characters } = useListCharactersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: components } = useListComponentsQuery();

  const allSteps = useMemo(
    () =>
      components
        ?.map((component: any) => component?.steps)
        ?.filter(Boolean)
        ?.flat() || [],
    [components]
  );

  const selectedComp = useMemo(
    () =>
      components?.find((component: any) => component?.hanzi === selectedChar),
    [components, selectedChar]
  );

  const [readMode, setReadMode] = useState(false);

  const isAlreadyLearned = useMemo(
    () =>
      characters?.find((character: { hanzi: string }) => {
        return character?.hanzi === selectedChar;
      }),
    [characters, selectedChar]
  );

  const discoverMutation = useDiscoverMutation();

  const firstLesson = useMemo(
    () =>
      components?.find((component: any) => component?.hanzi === selectedChar),
    [components, selectedChar]
  );

  console.log(" ALREADY LEARNED", isAlreadyLearned);

  // const readMode = true;

  const color = calculateColor({ tone: selectedComp?.tone_level });

  if (view === "review") {
    return <div> TODO Sentences </div>;
  }
  if (view === "play") {
    return (
      <NomadMethod
        selectedId={selectedChar}
        onClose={() => {
          setView("");
        }}
      />
    );
  }

  const HanziViewer = ({ currentPhrase }: any) => {
    if (readMode) {
      const currentPhrasePinyin = currentPhrase?.hanzi
        ?.split("")
        ?.filter((item: any) => {
          return components?.find(
            (component: any) => component?.hanzi === item
          );
        })
        .map((item: any) => {
          const currComp = components?.find(
            (component: any) => component?.hanzi === item
          );
          return {
            hanzi: currComp?.hanzi,
            pinyin: currComp?.pinyin || "??",
            unknown: true,
          };
        });

      return (
        <div
          role="button"
          className="pb-8 flex flex-col"
          // key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
        >
          <div className="flex flex-row space-x-[1px]">
            {currentPhrase?.hanzi
              ?.split("")
              ?.map((val: string, idy: number) => {
                const color = calculateColor({
                  tone: selectedComp?.tone_level,
                });

                const hanz = currentPhrasePinyin?.find(
                  (x: any) => x?.hanzi === val
                );

                return (
                  <div
                    key={`${val}-${idy}`}
                    className={`flex items-center flex-col ${
                      selectedChar === val
                        ? color
                        : "text-gray-400 dark:text-gray-300"
                    }`}
                  >
                    {/* <p className="text-sm">{hanz?.pinyin}</p> */}

                    {/* <Link
                  target="_blank"
                  href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                    char?.hanzi
                  )}`}
                  // className="flex items-end space-x-2"
                > */}
                    <button
                      onClick={() => {
                        setSelectedChar(val);
                        console.log("YO");

                        if (hanz?.pinyin === "??") {
                          return discoverMutation
                            .mutateAsync({
                              hanzi: hanz?.hanzi,
                            })
                            .then((resp) => {
                              console.log("Discovered!!");
                            });
                        }
                      }}
                      className={`text-sm ${
                        selectedChar === val
                          ? color
                          : "text-gray-500 dark:text-gray-400 "
                      }`}
                    >
                      {hanz?.pinyin?.toLocaleLowerCase()}
                    </button>
                    {/* </Link> */}
                    <button
                      onClick={() => {
                        setSelectedChar(val);

                        console.log("HANZ", hanz);

                        if (hanz?.pinyin === "??") {
                          return discoverMutation
                            .mutateAsync({
                              hanzi: hanz?.hanzi,
                            })
                            .then((resp) => {
                              console.log("Discovered!!");
                            });
                        }
                      }}
                    >
                      {hanz?.hanzi}
                    </button>
                  </div>
                );
              })}
          </div>
          <span className="text-sm text-gray-500">
            {currentPhrase?.en || currentPhrase?.title}
          </span>
        </div>
      );
    }
    return (
      <div role="button" className="pb-8 flex flex-col">
        {" "}
        <Link
          target="_blank"
          href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
            currentPhrase?.hanzi
          )}`}
          // className="flex items-end space-x-2"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentPhrase?.pinyin}
          </span>
        </Link>
        <span className="text-gray-500 dark:text-gray-300">
          {currentPhrase?.hanzi?.split("")?.map((val: string, idy: number) => {
            const color = calculateColor({
              tone: selectedComp?.tone_level,
            });

            return (
              <span
                key={`${val}-${idy}`}
                onClick={() => {
                  setSelectedChar(val);
                }}
                className={`${
                  selectedChar === val
                    ? color
                    : "text-gray-400 dark:text-gray-300"
                }`}
              >
                {val}
              </span>
            );
          })}
        </span>
        <span className="text-sm text-gray-500">
          {currentPhrase?.en || currentPhrase?.title}
        </span>
      </div>
    );
  };

  const ReadModeView = () => {
    const discoverMutation = useDiscoverMutation();
    return (
      <div className="my-8">
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {firstLesson?.steps?.slice(0, 5)?.map((lesson: any) => {
            return <HanziViewer key={lesson?.id} currentPhrase={lesson} />;
          })}

          {uniqueAnswerIds?.map((id: any, idx: number) => {
            const char = answerMap?.[id] || {};

            const currentLesson = allContents?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

            const currentPhrase =
              allContents?.find(
                (lesson: any) => lesson?.id === char?.phraseId
              ) ||
              allSteps?.find((step: any) => cleanString(step?.hanzi) === id);

            const currentPhrasePinyin = currentPhrase?.hanzi
              ?.split("")
              ?.filter((item: any) => {
                return components?.find(
                  (component: any) => component?.hanzi === item
                );
              })
              .map((item: any) => {
                const currComp = components?.find(
                  (component: any) => component?.hanzi === item
                );
                return {
                  hanzi: currComp?.hanzi,
                  pinyin: currComp?.pinyin || "??",
                };
              });

            return (
              <div
                role="button"
                className="pb-8 flex flex-col"
                key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
              >
                <div className="flex flex-row space-x-[1px]">
                  {currentPhrase?.hanzi
                    ?.split("")
                    ?.map((val: string, idy: number) => {
                      const color = calculateColor({
                        tone: selectedComp?.tone_level,
                      });

                      const hanz = currentPhrasePinyin?.find(
                        (x: any) => x?.hanzi === val
                      );

                      return (
                        <div
                          key={`${val}-${idx}-${idx}-${val}`}
                          className={`flex items-center flex-col ${
                            selectedChar === val
                              ? color
                              : "text-gray-400 dark:text-gray-300"
                          }`}
                        >
                          {/* <p className="text-sm">{hanz?.pinyin}</p> */}

                          {/* <Link
                        target="_blank"
                        href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                          char?.hanzi
                        )}`}
                        // className="flex items-end space-x-2"
                      > */}
                          <button
                            onClick={() => {
                              setSelectedChar(val);

                              if (hanz?.pinyin === "??") {
                                return discoverMutation
                                  .mutateAsync({
                                    hanzi: hanz?.hanzi,
                                  })
                                  .then((resp) => {
                                    console.log("Discovered!!");
                                  });
                              }
                            }}
                            className={`text-sm ${
                              selectedChar === val
                                ? color
                                : "text-gray-500 dark:text-gray-400 "
                            }`}
                          >
                            {hanz?.pinyin?.toLocaleLowerCase()}
                          </button>
                          {/* </Link> */}
                          <button
                            onClick={() => {
                              setSelectedChar(val);

                              if (hanz?.pinyin === "??") {
                                return discoverMutation
                                  .mutateAsync({
                                    hanzi: hanz?.hanzi,
                                  })
                                  .then((resp) => {
                                    console.log("Discovered!!");
                                  });
                              }
                            }}
                          >
                            {hanz?.hanzi}
                          </button>
                        </div>
                      );
                    })}
                </div>
                <span className="text-sm text-gray-500">
                  {currentPhrase?.en || currentPhrase?.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const NormalView = () => {
    return (
      <div className="my-8">
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {firstLesson?.steps?.slice(0, 5)?.map((lesson: any) => {
            return <HanziViewer key={lesson?.id} currentPhrase={lesson} />;
          })}

          {uniqueAnswerIds?.map((id: any, idx: number) => {
            const char = answerMap?.[id] || {};

            const currentLesson = allContents?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

            const currentPhrase =
              allContents?.find(
                (lesson: any) => lesson?.id === char?.phraseId
              ) ||
              allSteps?.find((step: any) => cleanString(step?.hanzi) === id);

            return (
              <div
                role="button"
                className="pb-8 flex flex-col"
                key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
              >
                {" "}
                <Link
                  target="_blank"
                  href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                    char?.hanzi
                  )}`}
                  // className="flex items-end space-x-2"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentPhrase?.pinyin}
                  </span>
                </Link>
                <span className="text-gray-500 dark:text-gray-300">
                  {currentPhrase?.hanzi
                    ?.split("")
                    ?.map((val: string, idy: number) => {
                      // const toneLevel = getCharacterToneLevel(
                      //   currentPhrase as ICharacter
                      // );

                      // const color = calculateColor({ tone: toneLevel });

                      const color = calculateColor({
                        tone: selectedComp?.tone_level,
                      });

                      return (
                        <span
                          key={`${idx}-${val}-${idx}-${idy}-${idy}-${idx}`}
                          onClick={() => {
                            setSelectedChar(val);
                          }}
                          className={`${
                            selectedChar === val
                              ? color
                              : "text-gray-400 dark:text-gray-300"
                          }`}
                        >
                          {val}
                        </span>
                      );
                    })}
                </span>
                <span className="text-sm text-gray-500">
                  {currentPhrase?.en || currentPhrase?.title}
                </span>
              </div>
              // <div
              //   role="button"
              //   className="pb-8 flex flex-col"
              //   key={`${idx}-${char?.hanzi}-${idx}`}
              // >
              //   {" "}
              //   <span className="text-md text-gray-600 dark:text-gray-300">
              //     {currentPhrase?.pinyin}
              //   </span>
              //   <p>
              //     {currentPhrase?.hanzi?.split("")?.map((str: string) => {
              //       return (
              //         <span
              //           key={`${selectedChar}-${str}`}
              //           className={`${
              //             selectedChar === str
              //               ? "text-gray-700 dark:text-yellow-300"
              //               : "text-gray-500 dark:text-gray-300"
              //           }`}
              //         >
              //           {str}
              //         </span>
              //       );
              //     })}
              //   </p>
              //   <span className="text-md text-gray-700 dark:text-gray-400">
              //     {currentPhrase?.en || title}
              //   </span>
              // </div>
            );
          })}
        </div>
      </div>
    );
  };

  const SentencesView = () => {
    return readMode ? <ReadModeView /> : <NormalView />;
  };

  return (
    <div className="w-full px-4 md:px-12">
      <div className="flex justify-between items-center">
        <div className="space-x-8 flex items-center">
          <button
            className="text-xl"
            onClick={() => {
              setSelectedChar("");
            }}
          >
            <FontAwesomeIcon className="text-2xl" icon={faXmark} />
          </button>

          <button
            className="text-xl"
            onClick={() => {
              setReadMode(!readMode);
            }}
          >
            <FontAwesomeIcon icon={faGlassesRound} />
          </button>
          <button
            className="text-xl"
            onClick={() => {
              setView("review");
            }}
            // onClick={() => {
            //   setReadMode(!readMode);
            // }}
          >
            <FontAwesomeIcon className="text-2xl" icon={faSpaceStationMoon} />
            {/* <FontAwesomeIcon icon={faGlassesRound} /> */}
          </button>
          <button
            className="text-xl"
            onClick={() => {
              setView("play");
            }}
            // onClick={() => {
            //   setReadMode(!readMode);
            // }}
          >
            <PlayIcon className="text-2xl" />
            {/* <FontAwesomeIcon icon={faGlassesRound} /> */}
          </button>
        </div>
        <div
          className={`${color} flex space-x-2 text-4xl my-4 font-extralight `}
        >
          <Link
            target="_blank"
            href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
              selectedChar?.hanzi || selectedChar
            )}`}
            className="flex items-end space-x-2"
          >
            {" "}
            <span>{selectedChar?.hanzi || selectedChar}</span>{" "}
          </Link>
          <Link
            target="_blank"
            href={`https://hanzicraft.com/character/${encodeURIComponent(
              selectedChar?.hanzi || selectedChar
            )}`}
            className="flex items-end space-x-2"
          >
            {" "}
            <span className="text-xs">{selectedComp?.pinyin}</span>
          </Link>
          <Link
            target="_blank"
            href={`https://hanzicraft.com/character/${encodeURIComponent(
              selectedChar?.hanzi || selectedChar
            )}`}
            className="flex items-end space-x-2"
          >
            {" "}
            <span className="text-xs">{selectedComp?.en}</span>
          </Link>
        </div>
      </div>

      <SentencesView />
    </div>
  );
}
