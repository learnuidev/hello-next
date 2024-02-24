// import Image from 'next/image'
"use client";

import { useMemo, useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGlass,
  faGlassesRound,
  faLanguage,
  faLightbulb,
  faMale,
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
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { useMusic } from "@/app/(auth)/convos/_play/use-music";
import { PauseIcon } from "lucide-react";
import { useRepeatHistoryStore } from "@/app/(auth)/convos/_play/use-repeat-history";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Editor } from "./Editor";
import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";

export function SelectedCharacter() {
  const [view, setView] = useState("sentences");
  const searchParams = useSearchParams();

  const lessonId = searchParams.get("lessonId");

  const addCharacterMutation = useAddCharacterMutation();
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
    [allAnswers, selectedChar]
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
    [relevantAnswers]
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

  // const readMode = true;

  const color = calculateColor({ tone: selectedComp?.tone_level });

  const { data: sentences } = useListSentencesQuery({
    component: selectedChar,
  });

  // if (view === "review") {
  //   return <div> TODO Sentences </div>;
  // }
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

  const AudioComponent = ({ currentPhrase }: any) => {
    const { play, togglePlay, seek, currentTime, reset } = useMusic({
      url: currentPhrase?.audio?.female || currentPhrase?.audio?.female,
    });

    const setRepeatHistories = useRepeatHistoryStore(
      (state: any) => state.setHistory
    );

    return (
      <button
        className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${
          play
            ? `dark:text-white ring-slate-900/5 dark:ring-white`
            : "ring-slate-900/5 dark:ring-slate-300 dark:text-slate-300"
        } shadow-lg rounded-full flex items-center justify-center transition`}
        onClick={() => {
          if (!play) {
            setRepeatHistories({
              ...currentPhrase,
              eventType: "sentence/repeat",
              eventTime: new Date().getTime(),
            });
          }
          togglePlay();
        }}
      >
        {play ? <PauseIcon /> : <PlayIcon className="ml-1" />}
      </button>
    );
  };

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
        <div className="flex justify-between w-full">
          <div
            role="button"
            className="pb-8 flex flex-col"
            // key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
          >
            <div className="flex flex-row flex-wrap space-x-[1px]">
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
                      className={`flex flex-wrap items-center flex-col ${
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

          {/* {currentPhrase?.audio ? (
            <AudioComponent currentPhrase={currentPhrase} />
          ) : null} */}

          <div className="flex space-x-4 items-center">
            {currentPhrase?.audio ? (
              <AudioComponent currentPhrase={currentPhrase} />
            ) : null}

            <Link
              target="_blank"
              // href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
              //   currentPhrase?.hanzi
              // )}`}

              href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
                currentPhrase?.hanzi
              )}&op=translate`}
              // href={`https://www.google.com/search?q=google+translate&query=${encodeURIComponent(
              //   currentPhrase?.hanzi
              // )}in%20english`}
              className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
              // className="text-gray-500 dark:text-gray-300 text-xs"
            >
              <FontAwesomeIcon icon={faGoogle} />
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-between space-x-4 py-4 items-center w-full hover:bg-gray-900 px-4">
        <div role="button" className="flex flex-col">
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
          <span className="text-gray-500 dark:text-gray-300 text-md">
            {currentPhrase?.hanzi
              ?.split("")
              ?.map((val: string, idy: number) => {
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

        <div className="flex space-x-4 items-center">
          {currentPhrase?.audio ? (
            <AudioComponent currentPhrase={currentPhrase} />
          ) : null}

          <Link
            target="_blank"
            // href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
            //   currentPhrase?.hanzi
            // )}`}

            href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
              currentPhrase?.hanzi
            )}&op=translate`}
            // href={`https://www.google.com/search?q=google+translate&query=${encodeURIComponent(
            //   currentPhrase?.hanzi
            // )}in%20english`}
            className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
            // className="text-gray-500 dark:text-gray-300 text-xs"
          >
            <FontAwesomeIcon icon={faGoogle} />
          </Link>
        </div>
      </div>
    );
  };

  const ReadModeView = () => {
    const discoverMutation = useDiscoverMutation();
    return (
      <div className="my-8">
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {/* {firstLesson?.steps?.slice(0, 5)?.map((lesson: any) => {
            return <HanziViewer key={lesson?.id} currentPhrase={lesson} />;
          })} */}

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
                key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
                className="flex justify-between w-full"
              >
                <div role="button" className="pb-8 flex flex-col">
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

                {currentPhrase?.audio ? (
                  <div className="text-white"> Audio </div>
                ) : null}
              </div>
            );
          })}

          {sentences?.slice(0, 10)?.map((sentence: any) => {
            return <HanziViewer key={sentence?.id} currentPhrase={sentence} />;
          })}
        </div>
      </div>
    );
  };

  const NormalView = () => {
    return (
      <div className="my-8">
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
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
              <div key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}>
                <div role="button" className="pb-8 flex flex-col">
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

                {currentPhrase?.audio ? (
                  <div className="text-white"> Audio </div>
                ) : null}
              </div>
            );
          })}

          <div className="space-y-4 w-full">
            {sentences?.slice(0, 10)?.map((sentence: any) => {
              return (
                <HanziViewer key={sentence?.id} currentPhrase={sentence} />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const SentencesView = () => {
    return readMode ? <ReadModeView /> : <NormalView />;
  };

  const HeaderView = () => {
    return (
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
              setView("sentences");
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
              setView("review");
            }}
            // onClick={() => {
            //   setReadMode(!readMode);
            // }}
          >
            <FontAwesomeIcon className="text-2xl" icon={faMale} />
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
          {isAlreadyLearned ? null : (
            <button
              className="text-xl"
              onClick={() => {
                addCharacterMutation?.mutateAsync({
                  hanzi: firstLesson?.hanzi,
                  pinyin: firstLesson?.pinyin,
                  en: firstLesson?.en,
                  level: firstLesson?.level,
                  nomad: "na",
                  destination: "na",
                  location: "na",
                  journeyId: firstLesson.id,
                  // todo | completed
                  status: "completed",
                  story: "na",
                  component: "na",
                  sub_components: [],
                });
                // .then(() => {
                //   reset();
                // });
              }}

              // onClick={() => {
              //   setView("play");
              // }}
              // onClick={() => {
              //   setReadMode(!readMode);
              // }}
            >
              <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
              {/* <FontAwesomeIcon icon={faGlassesRound} /> */}
            </button>
          )}
          {selectedComp?.group ? null : (
            <button
              className="text-xl"
              onClick={() => {
                // setView("play");

                discoverMutation
                  .mutateAsync({
                    hanzi: selectedComp?.hanzi,
                  })
                  .then((resp) => {
                    console.log("Discovered!!", resp);
                  });
              }}
              // onClick={() => {
              //   setReadMode(!readMode);
              // }}
            >
              <FontAwesomeIcon icon={faLanguage} />
              {/* <FontAwesomeIcon icon={faGlassesRound} /> */}
            </button>
          )}
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
    );
  };

  return (
    <div className="w-full px-4 md:px-12">
      <HeaderView />

      {view === "review" ? (
        // <p dangerouslySetInnerHTML={{ __html: isAlreadyLearned?.story }}></p>

        <div className="my-8">
          <p className="text-gray-300 text-center">
            <a
              role="a"
              href={`https://www.youtube.com/results?search_query=${isAlreadyLearned?.nomad}`}
              target="_blank"
            >
              {isAlreadyLearned?.nomad} @{" "}
            </a>
            <span className="font-bold">
              {isAlreadyLearned?.destination}, {isAlreadyLearned?.location}
            </span>
          </p>

          <Editor
            id="story-123"
            // className="text-center border-solid h-12 border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
            content={isAlreadyLearned?.story || ""}
          />
        </div>
      ) : null}

      {/* {isAlreadyLearned?.story && (
        <Editor
          id="story-123"
          className="text-center border-solid h-12 border-b-2 w-[320px] md:w-[660px] text-2xl px-2 focus:outline-none active:outline-none dark:border-gray-900"
          content={isAlreadyLearned?.story || ""}
        />
      )} */}

      {view === "sentences" ? <SentencesView /> : null}
    </div>
  );
}
