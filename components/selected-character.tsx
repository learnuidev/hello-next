// import Image from 'next/image'
"use client";

import { useMemo, useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

import * as R from "ramda";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheckCircle,
  faGlassesRound,
  faLanguage,
  faLightbulb,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";

import { useListContentsQuery } from "@/domain/content/content.queries";

import { useListComponents } from "@/domain/lesson/component.queries";
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
import { Summary } from "./summary";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { Icons } from "./ui/icons.v2";
import { SearchResult } from "./search-result";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import { GrammarAnalysis } from "./grammar-analysis";
import { faSpinner } from "@fortawesome/sharp-solid-svg-icons";
import { formatComponentName } from "@/app/nmm/format-component-name";
import { useDeleteComponentMutation } from "@/domain/lesson/component.mutations";

export function SelectedCharacter({ characterId }: { characterId: string }) {
  const [view, setView] = useState("home");
  const routeName = usePathname();
  const { toast } = useToast();

  const addHistoryMutation = useAddHistoryMutation();

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

  // const { }

  const { data: contents } = useListContentsQuery();

  const allContents = useMemo(
    () => contents?.map((content: any) => content?.transcriptions)?.flat(),
    [contents]
  );

  const selectedChar = characterId;

  const relevantAnswersHanzi = useMemo(
    () => [
      // @ts-ignore
      ...new Set(
        allAnswers
          ?.filter((answer: any) => {
            if (answer?.phraseId) {
              return answer?.phraseId?.includes(selectedChar);
            }
          })
          ?.map((x: any) => x?.phraseId)
      ),
    ],
    [allAnswers, selectedChar]
  );

  const relevantAnswers = useMemo(
    () =>
      allAnswers?.filter((answer: any) => {
        if (answer?.phraseId) {
          return answer?.phraseId?.includes(selectedChar);
        }
      }),
    [allAnswers, selectedChar]
  );

  const answerMap = useMemo(
    () => R.indexBy(R.prop("hanzi"), relevantAnswers),
    [relevantAnswers]
  ) as Record<
    string,
    {
      hanzi: string;
      journeyId: string;
      phraseId: string;
      input?: string;
      explanation?: string;
    }
  >;

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

  const { data: components } = useListComponents({
    includeAll: true,
  });

  const allSteps = useMemo(
    () =>
      components
        ?.map((component: any) => component?.steps)
        ?.filter(Boolean)
        ?.flat() || [],
    [components]
  );

  console.log();

  const selectedComp = useMemo(
    () =>
      characters?.find(
        (component: any) =>
          (component?.hanzi || component?.item) === selectedChar
      ),
    [characters, selectedChar]
  );

  const selectedComp2 = useMemo(
    () =>
      components?.find(
        (component: any) =>
          (component?.hanzi || component?.item) === selectedChar
      ),
    [components, selectedChar]
  );

  console.log("SELECTED COMP 2", selectedComp2);

  const [readMode, setReadMode] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || selectedComp?.lang;

  const { data: meaning } = useListMeaningsQuery({
    content: characterId,
    lang,
  });

  const isAlreadyLearned = useMemo(
    () =>
      characters?.find((character: { hanzi: string }) => {
        return character?.hanzi === selectedChar;
      }),
    [characters, selectedChar]
  );

  const router = useRouter();

  const discoverMutation = useDiscoverMutation();
  const deleteComponentMutation = useDeleteComponentMutation();

  const firstLesson = useMemo(
    () =>
      components?.find(
        (component: any) =>
          (component?.hanzi || component?.item) === selectedChar
      ),
    [components, selectedChar]
  );

  const color = calculateColor({ tone: selectedComp?.tone_level });

  const { data: sentences } = useListSentencesQuery({
    component: selectedChar,
    lang,
  });

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

      // return "TODO";

      return (
        <div className="flex justify-between w-full">
          {currentPhrase?.input && (
            <p className="text-sm text-gray-400">{currentPhrase?.input}</p>
          )}
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
                      <button
                        onClick={() => {
                          alert("Yoo 1");
                          router.push(`/nmm/${val}`);

                          if (hanz?.pinyin === "??") {
                            return discoverMutation
                              .mutateAsync({
                                lang: lang || selectedComp?.lang,
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
                        {hanz?.pinyin?.toLocaleLowerCase() || hanz?.roman}
                      </button>

                      <button
                        onClick={() => {
                          // alert("yoo 2");

                          addHistoryMutation.mutate({
                            lang: lang,
                            pathName: routeName,
                            hanzi: val,
                            contentId: selectedComp?.id || "",
                            eventType: "CONTENT_VIEWED",
                          } as any);

                          router.push(`/nmm/${val}`);

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

          {currentPhrase?.input && (
            <p className="text-sm text-gray-400">{currentPhrase?.input}</p>
          )}

          <div className="flex space-x-4 items-center">
            {currentPhrase?.audio ? (
              <AudioComponent currentPhrase={currentPhrase} />
            ) : null}

            <Link
              target="_blank"
              href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
                currentPhrase?.hanzi
              )}&op=translate`}
              className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
            >
              <FontAwesomeIcon icon={faGoogle} />
            </Link>
            <Link
              href={`/nmm/${encodeURIComponent(currentPhrase?.hanzi)}`}
              className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-between space-x-4 py-4 items-center w-full">
        <div role="button" className="flex flex-col">
          {" "}
          <Link
            target="_blank"
            href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
              currentPhrase?.hanzi
            )}`}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentPhrase?.pinyin || currentPhrase?.roman}
            </span>
          </Link>
          <span className="text-gray-500 dark:text-gray-300 text-md">
            {(currentPhrase?.input
              ? currentPhrase?.input.split(" ")
              : currentPhrase?.hanzi?.split("")
            )?.map((val: string, idy: number) => {
              const color = calculateColor({
                tone: selectedComp?.tone_level,
              });

              return (
                <span
                  key={`${val}-${idy}`}
                  onClick={() => {
                    addHistoryMutation.mutate({
                      hanzi: val,
                      lang: lang,
                      pathName: routeName,
                      contentId: selectedComp?.id || "",
                      eventType: "CONTENT_VIEWED",
                    } as any);

                    router.push(
                      lang ? `/nmm/${val}?lang=${lang}` : `/nmm/${val}`
                    );
                  }}
                  className={`${
                    selectedChar === val
                      ? color
                      : "text-gray-400 dark:text-gray-300"
                  }`}
                >
                  {val}
                  {currentPhrase?.input ? " " : ""}
                </span>
              );
            })}
          </span>
          {/* <span className="text-2xl text-gray-300">{currentPhrase?.input}</span> */}
          <span className="text-sm text-gray-400">
            {currentPhrase?.en || currentPhrase?.title}
          </span>
          {!currentPhrase?.hanzi && false && (
            <span className="text-xs text-gray-600">
              {currentPhrase?.explanation}
            </span>
          )}
        </div>

        <div className="flex space-x-4 items-center">
          {currentPhrase?.audio ? (
            <AudioComponent currentPhrase={currentPhrase} />
          ) : null}

          <Link
            target="_blank"
            href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
              currentPhrase?.hanzi
            )}&op=translate`}
            className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
          >
            <FontAwesomeIcon icon={faGoogle} />
          </Link>
          <Link
            href={
              lang || selectedComp?.lang
                ? `/nmm/${encodeURIComponent(currentPhrase?.hanzi || currentPhrase?.input)}?lang=${lang || selectedComp?.lang}`
                : `/nmm/${encodeURIComponent(currentPhrase?.hanzi || currentPhrase?.input)}`
            }
            className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </div>
      </div>
    );
  };

  const ReadModeView = () => {
    const discoverMutation = useDiscoverMutation();
    return (
      <div className="w-full">
        <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
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
                            <button
                              onClick={() => {
                                alert("yoo 4");
                                // setSelectedChar(val);
                                router.push(`/nmm/${val}`);

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
                                addHistoryMutation.mutate({
                                  hanzi: val,
                                  lang: lang,
                                  pathName: routeName,
                                  contentId: selectedComp?.id || "",
                                  eventType: "CONTENT_VIEWED",
                                } as any);

                                router.push(`/nmm/${val}`);

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

  console.log("SELECTED", selectedComp);

  const NormalView = () => {
    return (
      <div className="w-full">
        {/* <div>{JSON.stringify(sentences, null, 2)}</div>; */}
        <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
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
                key={`${idx}-${char?.hanzi || char?.input}-${idx}-${Math.random()}`}
              >
                <div role="button" className="pb-8 flex flex-col">
                  {" "}
                  <Link
                    target="_blank"
                    href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                      char?.hanzi
                    )}`}
                  >
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {currentPhrase?.pinyin || currentPhrase?.roman}
                    </span>
                  </Link>
                  <span className="text-gray-500 dark:text-gray-300">
                    {currentPhrase?.hanzi
                      ?.split("")
                      ?.map((val: string, idy: number) => {
                        const color = calculateColor({
                          tone: selectedComp?.tone_level,
                        });

                        return (
                          <span
                            key={`${idx}-${val}-${idx}-${idy}-${idy}-${idx}`}
                            onClick={() => {
                              // setSelectedChar(val);
                              console.log("yoo 3");
                              router.push(`/nmm/${val}`);
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

          <div className="space-y-2 w-full">
            {sentences?.map((sentence: any) => {
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
    return (
      <>
        {/* <Summary characterId={selectedChar} showMeanings={false} /> */}
        {readMode ? <ReadModeView /> : <NormalView />}
      </>
    );
  };

  console.log("SELECTED", selectedComp);

  const NavItems = () => {
    return (
      <div className="space-x-8 flex items-center">
        <button
          className="text-xl"
          onClick={() => {
            console.log("yoo 4");
            router.push(`/nmm`);
          }}
        >
          <FontAwesomeIcon className="text-2xl" icon={faXmark} />
        </button>
        {/* {meaning ? (
      <button
        className="text-xl"
        onClick={() => {
          setView("home");
        }}
      >
        <FontAwesomeIcon className="text-2xl" icon={faHome} />
      </button>
    ) : null} */}

        <button
          className="text-xl"
          onClick={() => {
            setReadMode(!readMode);
          }}
        >
          <FontAwesomeIcon icon={faGlassesRound} />
        </button>
        {/* <button
      className="text-xl"
      onClick={() => {
        setView("sentences");
      }}
    >
      <FontAwesomeIcon className="text-2xl" icon={faSpaceStationMoon} />
    </button> */}
        {/* <button
      className="text-xl"
      onClick={() => {
        setView("review");
      }}
    >
      <FontAwesomeIcon className="text-2xl" icon={faMale} />
    </button> */}
        <button
          className="text-xl"
          onClick={() => {
            setView("play");
          }}
        >
          <PlayIcon className="text-2xl" />
        </button>
        {isAlreadyLearned ? null : (
          <button
            className="text-xl"
            onClick={() => {
              addCharacterMutation?.mutateAsync({
                lang: lang,
                status: "DISCOVERED",
                hanzi: firstLesson?.hanzi || selectedChar,
                journeyId: firstLesson?.id || "default",
              });
            }}
          >
            {addCharacterMutation.isLoading ? (
              <FontAwesomeIcon spinPulse icon={faSpinner} />
            ) : addCharacterMutation.isSuccess ? (
              <FontAwesomeIcon className="transition" icon={faCheckCircle} />
            ) : (
              <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
            )}
          </button>
        )}
        {selectedComp2?.level &&
        characterId?.length >= 1 &&
        selectedComp2?.updated_at ? null : (
          <button
            className="text-xl"
            disabled={discoverMutation.isLoading || discoverMutation.isSuccess}
            onClick={() => {
              discoverMutation
                .mutateAsync({
                  hanzi: selectedComp?.hanzi || characterId,
                })
                .then((resp) => {
                  toast({
                    title: "Success!",
                    description: `Component Successfully discovered ${JSON.stringify(resp)}`,
                  });
                  console.log("Discovered!!", resp);
                });
            }}
          >
            {discoverMutation.isLoading ? (
              <FontAwesomeIcon spinPulse icon={faSpinner} />
            ) : discoverMutation.isSuccess ? (
              <FontAwesomeIcon className="transition" icon={faCheckCircle} />
            ) : (
              <FontAwesomeIcon icon={faLanguage} />
            )}
          </button>
        )}
        {true ? null : (
          <button
            className="text-xl"
            disabled={
              deleteComponentMutation.isLoading ||
              deleteComponentMutation.isSuccess
            }
            onClick={() => {
              deleteComponentMutation
                .mutateAsync({
                  hanzi: selectedComp?.hanzi || characterId,
                } as any)
                .then((resp) => {
                  toast({
                    title: "Success!",
                    description: `Component: ${selectedComp?.hanzi || characterId} Successfully deleted  
                  \n 
                  ${JSON.stringify(resp)}`,
                  });
                  console.log("Discovered!!", resp);
                });
            }}
          >
            {deleteComponentMutation.isLoading ? (
              <FontAwesomeIcon spinPulse icon={faSpinner} />
            ) : discoverMutation.isSuccess ? (
              <FontAwesomeIcon className="transition" icon={faCheckCircle} />
            ) : (
              <Icons.powerOff />
            )}
          </button>
        )}
      </div>
    );
  };

  const TitleView = () => {
    return (
      <div
        className={`flex md:flex-row flex-col space-x-0 md:space-x-2 font-extralight`}
      >
        <Link
          target="_blank"
          href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
            selectedChar
          )}`}
          className={`${color} flex items-end space-x-2 text-xl md:text-4xl`}
        >
          {" "}
          <span>{selectedChar}</span>{" "}
        </Link>
        <Link
          target="_blank"
          href={`https://hanzicraft.com/character/${encodeURIComponent(
            selectedChar
          )}`}
          className="flex items-end space-x-2"
        >
          {" "}
          <span className="text-xs">
            {selectedComp?.pinyin ||
              selectedComp?.en ||
              selectedComp?.roman ||
              selectedComp2?.pinyin}
          </span>
        </Link>
        {/* {selectedComp?.pinyin && selectedComp?.en?.length < 20 && ( */}
        <Link
          target="_blank"
          href={`https://hanzicraft.com/character/${encodeURIComponent(
            selectedChar
          )}`}
          className="flex items-end space-x-2 text-gray-400"
        >
          {" "}
          <span className="text-xs truncate">
            {formatComponentName(selectedComp, 2) || selectedComp2?.en}
          </span>
        </Link>
        {/* )} */}
      </div>
    );
  };

  const HeaderView = () => {
    return (
      <div className="flex my-4 justify-between items-center">
        <NavItems />
        {selectedChar?.length < 4 && <TitleView />}
      </div>
    );
  };

  const ViewType = () => {
    const SubComponentsView = () => {
      const { data: sub_components } = useListSubComponentsQuery({
        componentId: characterId,
      });

      if (sub_components?.length < 2) {
        return null;
      }

      return (
        <div className="text-gray-500">
          {JSON.stringify(sub_components, null, 2)}
        </div>
      );
    };

    return (
      <div
        className={
          "relative grid grid-cols-1 md:grid-cols-[1fr_500px] gap-x-8 md:grid-rows-[70px_1fr] pt-0"
        }
      >
        <div className={"row-span-2 overflow-hidden col-span-1"}>
          {selectedChar?.length > 3 && (
            <div className="flex flex-col items-start w-full mt-4 space-y-2">
              {!["es", "it", "ro", "fr"]?.includes(selectedComp?.lang) && (
                <h2 className="text-gray-400 font-light">
                  {selectedComp?.pinyin || selectedComp?.roman}
                </h2>
              )}
              <h1 className="text-2xl">
                {selectedComp?.hanzi || selectedChar}
              </h1>

              <h2 className="text-gray-500 font-light">{selectedComp?.en}</h2>
            </div>
          )}

          {selectedComp2 && (
            <div className="font-light flex space-x-4 items-center text-gray-400 mb-8">
              {selectedComp2?.level && (
                <div className="flex space-x-2 items-center">
                  <Icons.earthAsia />
                  <p>{selectedComp2?.level}</p>
                </div>
              )}
              {selectedComp?.tone_level && (
                <div className="flex space-x-2 items-center">
                  <Icons.musicNote />
                  <p>{selectedComp?.tone_level}</p>
                </div>
              )}
              {selectedComp?.initial && (
                <div className="flex space-x-2 items-center">
                  <p>initial - </p>
                  <p>{selectedComp?.initial}</p>
                </div>
              )}
              {selectedComp?.final && (
                <div className="flex space-x-2 items-center">
                  <p>final - </p>
                  <p>{selectedComp?.final}</p>
                </div>
              )}
            </div>
          )}

          {characterId?.length === 1 && <SubComponentsView />}

          <article>
            <div>
              {characterId?.length < 10 && (
                <div className="mt-[-32px]">
                  <Summary showMeanings={true} characterId={characterId} />
                </div>
              )}

              <div className="my-8">
                <GrammarAnalysis
                  contentId={selectedChar}
                  lang={lang || selectedComp?.lang}
                />
              </div>
            </div>
          </article>
        </div>

        <div>
          <div className="">
            {" "}
            {sentences?.length > 7 ? (
              <ScrollArea className="hidden md:block space-y-2 h-[700px] rounded-md p-4">
                <SentencesView />
              </ScrollArea>
            ) : (
              <div className="hidden md:block space-y-2 h-[700px] rounded-mdp-4">
                <SentencesView />
              </div>
            )}
          </div>

          <div className="md:hidden block">
            <SentencesView />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-4 md:px-12">
      <HeaderView />

      <ViewType />
    </div>
  );
}
