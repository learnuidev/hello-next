"use client";
import React from "react";

import {
  PlaceIcon,
  ActorIcon,
  SceneIcon,
  SentenceIcon,
  MessageIcon,
  PlayIcon,
  NomadIcon,
  StoryIcon,
} from "@/components/ui/icons";
import { useState, useEffect } from "react";
import { dictionary } from "@/data/hmm/data/dictionary";
import { Music } from "@/components/music";
import { HanziMovieMethod as HanziMovieMethodPlay } from "./explorer-method";

import {
  places,
  learnedActors,
  propsArr,
  learnedCharacters,
  learnedWords,
  hanziToPinyin,
  learnedProps,
  learnedPlaces,
} from "@/data/hmm/data";

// import { allWords as wordsArr, } from "@/data/hmm/data/v2";
import {
  allWords as wordsArr,
  allChars as charsArr,
} from "@/data/hmm/data/v1000";
import { actors } from "@/data/hmm/actors";

import {
  PropsIcon,
  CharacterIcon,
  WordIcon,
  CloseIcon,
} from "@/components/ui/icons";
import { NavBar } from "@/components/navbar";
import { getGraph } from "../pinyin/utils";
import { ICharacter, getCharacterToneLevel } from "@/data/hmm/data/utils";
import { useListTonePairsQuery } from "@/domain/tone-pairs/tone-pairs.queries";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { course1 } from "@/data/convos/bm1";

const PageView = ({ view, setSelectedId, belt }: any) => {
  const { data: answers } = useListAnswersQuery();

  const lastAnswer = answers?.[answers?.length - 1];

  console.log("LAST", { lastAnswer });

  switch (view) {
    case "places":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {places.map((prop) => {
            // return <p className='p-4'>{prop?.hanzi}</p>
            return (
              <button
                key={JSON.stringify(prop)}
                onClick={() => {
                  setSelectedId(prop.id);
                }}
                className={`${
                  learnedPlaces.find((place) => prop?.id === place.id)
                    ? "dark:text-white text-gray-700"
                    : "dark:text-gray-500 text-gray-200"
                } dark:hover:text-white p-6 text-4xl transition`}
                // className='dark:hover:text-white dark:text-gray-500 p-6 text-4xl'
              >
                {prop?.component ? <prop.component /> : prop?.id}
              </button>
            );
          })}
        </div>
      );

    case "play":
      return <HanziMovieMethodPlay />;
    case "actors":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {actors.map((prop) => {
            // return <p className='p-4'>{prop?.hanzi}</p>
            return (
              <button
                key={`${prop.id}-nomads`}
                onClick={() => {
                  setSelectedId(prop.id);
                }}
                className={`${
                  learnedActors.find((place) => prop?.id === place.id)
                    ? "dark:text-white text-gray-700"
                    : "dark:text-gray-500 text-gray-200"
                }
                
                dark:hover:text-white p-6 text-4xl transition`}
              >
                {prop?.value}
              </button>
            );
          })}
        </div>
      );
    case "props":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {propsArr.map((prop, idx) => {
            // return <p className='p-4'>{prop?.hanzi}</p>
            return (
              <button
                key={`${prop.hanzi}-components-${idx}`}
                onClick={() => {
                  setSelectedId(prop.hanzi);
                }}
                className={`${
                  learnedProps.includes(prop?.hanzi)
                    ? "dark:text-white text-gray-700"
                    : "dark:text-gray-500 text-gray-200"
                } dark:hover:text-white p-6 text-4xl transition`}
                // className='dark:hover:text-white dark:text-gray-500 p-6 text-4xl'
              >
                {prop?.hanzi}
              </button>
            );
          })}
        </div>
      );
    case "characters":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {charsArr
            ?.slice(0, belt?.maxCharacterLevel || 4000)
            .map((prop, idx) => {
              calculateColor;

              const toneLevel = getCharacterToneLevel(prop as ICharacter);

              const color = calculateColor({ tone: toneLevel });

              const graph = getGraph(prop?.hanzi)?.graph || "";

              const showIf = graph
                ?.split("")
                ?.find((elem: string) => learnedCharacters?.includes(elem));

              return (
                <button
                  key={`${prop.hanzi}-chars-${idx}`}
                  onClick={() => {
                    setSelectedId(prop.hanzi);
                  }}
                  className={`${
                    learnedCharacters.includes(prop?.hanzi)
                      ? `dark:text-white ${color}`
                      : // : Boolean(showIf)
                      lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                      ? "dark:text-white text-yellow-500"
                      : "dark:text-gray-500 text-gray-200"
                  } dark:hover:text-white p-4 text-3xl md:text-2xl transition lowercase`}
                >
                  {prop?.hanzi}
                </button>
              );
            })}
        </div>
      );
    case "words":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {wordsArr.map((prop, idx) => {
            return (
              <button
                key={`${prop.hanzi}-words-${idx}`}
                onClick={() => {
                  setSelectedId(prop.hanzi);
                }}
                className={`${
                  learnedWords.includes(prop?.hanzi)
                    ? "dark:text-white text-gray-700"
                    : "dark:text-gray-500 text-gray-200"
                } dark:hover:text-white p-6 text-4xl transition`}
              >
                {prop?.hanzi}
              </button>
            );
          })}
        </div>
      );
    case "scenes":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          TODO
        </div>
      );
    default:
      return null;
  }
};

const calculateColor = (dict: any) => {
  switch (dict?.tone) {
    case 1:
      return "text-red-400";
    case 2:
      return "text-green-500";
    case 3:
      return "text-purple-400";
    case 4:
      return "text-pink-400";
    default:
      return "text-gray-600 dark:text-white";
  }
};

function SelectedComponent({ selectedId, setSelectedId }: any) {
  // @ts-ignore
  const dict = dictionary?.[selectedId];

  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [view, setView] = useState("sentences");

  const actor = learnedActors.find((actor) => actor.id === selectedId);
  const { data } = useListTonePairsQuery({});

  const relatedData = data?.filter((item: any) =>
    item?.hanzi?.includes(dict?.hanzi)
  );

  const { data: allAnswers, isLoading } = useListAnswersQuery();

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.hanzi?.includes(selectedId);
  });

  return (
    <div>
      <div className="my-4 mx-8 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
        <div></div>

        <div className="dark:text-gray-500 my-4 space-x-8 flex justify-center items-center">
          <button
            onClick={() => {
              setView("play");
            }}
            className={`${
              view === "play"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-800 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <PlayIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Play</p>
          </button>
          <button
            onClick={() => {
              // setSelectedId(null);
              setView("actors");
            }}
            className={`${
              view === "actors"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-800 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <NomadIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Nomads</p>
          </button>
          <button
            onClick={() => {
              // setSelectedId(null);
              setView("places");
            }}
            className={`${
              view === "places"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-800 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <PlaceIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Destinations</p>
          </button>

          <button
            onClick={() => {
              // setSelectedId(null);
              setView("props");
            }}
            className={`${
              view === "props"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-800 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <PropsIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Components</p>
          </button>

          <button
            onClick={() => {
              // setSelectedId(null);
              setView("scenes");
            }}
            className={`${
              view === "scenes"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-800 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <StoryIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Stories</p>
          </button>

          <button
            onClick={() => {
              // setSelectedId(null);
              setView("characters");
            }}
            className={`${
              view === "characters"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-800 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <CharacterIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Characters</p>
          </button>
          <button
            onClick={() => {
              // setSelectedId(null);
              setView("words");
            }}
            className={`${
              view === "words"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-800 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <WordIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Words</p>
          </button>
          <button
            onClick={() => {
              // setSelectedId(null);
              setView("sentences");
            }}
            className={`${
              view === "sentences"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-800 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <SentenceIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Sentences</p>
          </button>
        </div>

        <button
          onClick={() => {
            setSelectedId(null);
          }}
          className={`my-4 flex flex-col items-center dark:text-gray-800 hover:dark:text-white transition`}
        >
          <CloseIcon className="text-4xl" />
        </button>
      </div>

      <div className="flex items-center justify-center flex-col">
        <h1 className="space-x-2 flex flex-col items-center">
          {dict?.pinyin ? (
            <span
              className={`items-center flex space-x-4 text-2xl font-bold ${calculateColor(
                dict
              )}`}
            >
              {" "}
              <span>{dict?.sound ? <Music url={dict?.sound} /> : null} </span>
              <span>
                {" "}
                {dict?.pinyin} ({dict?.hanzi})
              </span>
            </span>
          ) : (
            <span className={`text-3xl font-bold ${calculateColor(dict)}`}>
              {" "}
              {selectedId}
            </span>
          )}
        </h1>

        <h2>
          <span className={`text-xl text-gray-500 font-light`}>
            {dict?.en || actor?.actor}
          </span>
        </h2>
      </div>

      <div className="flex space-x-2 justify-center">
        {dict?.sound ? <Music url={dict?.sound} /> : null}
        <p className={`my-4 text-2xl dark:text-gray-300 text-gray-600`}>
          {dict?.en || actor?.actor}
        </p>
      </div>

      {dict?.movie ? (
        <div className="my-4 mx-8 md:mx-16 dark:text-gray-300 text-gray-800 flex flex-col items-center justify-center">
          <div className="flex space-x-4">
            <p>
              <ActorIcon /> {dict?.movie?.actor}
            </p>
            <p>
              <PropsIcon />{" "}
              {dict?.movie?.props?.map((prop: string) => {
                return <span key={prop}> {prop}</span>;
              })}
            </p>
            <p>
              <PlaceIcon /> {dict?.movie?.set}, {dict?.movie?.room}
            </p>
          </div>

          <div className="md:px-60 my-16 leading-[60px] tracking-wider">
            {" "}
            {dict?.movie?.scene?.split(" ").map((word: string) => {
              const first = word.slice(0, 3);
              const rest = word.slice(3);

              return (
                <span
                  key={JSON.stringify(word)}
                  className="text-2xl leading-10"
                >
                  <span className="dark:text-gray-300 font-semibold">
                    {first}
                  </span>
                  <span className="font-light dark:text-gray-300">{rest} </span>
                </span>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex justify-center">
        {dict?.variants
          ? dict.variants.map((variant: any) => {
              return (
                <div
                  key={JSON.stringify(variant)}
                  className="my-4 mx-8 md:mx-16 text-black dark:text-white"
                >
                  <div className="flex justify-center">
                    <p
                      className={`my-4 text-2xl dark:text-gray-300 text-gray-600`}
                    >
                      {variant?.en}
                    </p>
                  </div>

                  {variant?.examples ? (
                    <div className="flex flex-col items-center">
                      <div className="space-y-8 my-4">
                        {variant?.examples.map((example: any) => {
                          return (
                            <div key={JSON.stringify(example)}>
                              {example?.hanzi.split("").map((item: any) => {
                                return (
                                  <span
                                    key={JSON.stringify(item)}
                                    className={
                                      item === selectedId ||
                                      selectedId.includes(item)
                                        ? calculateColor(dict)
                                        : `dark:text-gray-600 text-gray-300`
                                    }
                                  >
                                    {item}
                                  </span>
                                );
                              })}

                              <p className="dark:text-gray-500 text-gray-400">
                                {example?.pinyin}
                              </p>
                              <p className="dark:text-gray-400 text-gray-500">
                                {example?.en}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
      </div>

      <div className="my-4 mx-8 md:mx-16 text-black dark:text-white">
        {relatedData?.length ? (
          <div className="flex flex-col items-center">
            {/* <div>
              <MessageIcon />
            </div> */}

            <div className="my-4 mx-8 md:mx-16 text-black dark:text-white">
              {relatedData?.length ? (
                <div className="flex flex-col items-start">
                  {/* <div>
              <MessageIcon />
            </div> */}

                  <div className="space-x-8 my-4 flex flex-row">
                    {relatedData.map((example: any) => {
                      return (
                        <div
                          key={JSON.stringify(example)}
                          className="flex space-x-4 items-start"
                        >
                          {example?.sound ? (
                            <Music
                              className="min-w-[40px] text-2xl dark:text-gray-500 text-gray-700"
                              url={example?.sound}
                            />
                          ) : null}
                          <div className="">
                            {/* <p className='dark:text-gray-600 text-gray-300'>
                      {example?.hanzi}
                    </p> */}
                            {example?.hanzi.split("").map((item: any) => {
                              return (
                                <span
                                  key={JSON.stringify(item)}
                                  className={
                                    item === selectedId ||
                                    selectedId.includes(item)
                                      ? calculateColor(dict)
                                      : `dark:text-gray-600 text-gray-300`
                                  }
                                >
                                  {item}
                                </span>
                              );
                            })}
                            <p className="dark:text-gray-500 text-gray-400">
                              {example?.pinyin}
                            </p>
                            <p className="dark:text-gray-400 text-gray-500">
                              {example?.en}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-8 my-4">
              {dict?.examples?.map((example: any) => {
                return (
                  <div
                    key={JSON.stringify(example)}
                    className="flex space-x-4 items-start"
                  >
                    {example?.sound ? (
                      <Music
                        className="min-w-[40px] text-2xl dark:text-gray-500 text-gray-700"
                        url={example?.sound}
                      />
                    ) : null}
                    <div className="">
                      {/* <p className='dark:text-gray-600 text-gray-300'>
                      {example?.hanzi}
                    </p> */}
                      {example?.hanzi.split("").map((item: any) => {
                        return (
                          <span
                            key={JSON.stringify(item)}
                            className={
                              item === selectedId || selectedId.includes(item)
                                ? calculateColor(dict)
                                : `dark:text-gray-600 text-gray-300`
                            }
                          >
                            {item}
                          </span>
                        );
                      })}
                      <p className="dark:text-gray-500 text-gray-400">
                        {example?.pinyin}
                      </p>
                      <p className="dark:text-gray-400 text-gray-500">
                        {example?.en}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <div className="my-8 flex justify-center">
        {/* <h2>nmm</h2> */}
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {relevantAnswers?.map((char: any, idx: number) => {
            const lesson = {};

            const currentLesson = course1?.lessons?.find(
              (lesson: any) => lesson?.id === char?.journeyId
            );

            const currentPhrase = currentLesson?.lessons?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

            return (
              <div
                role="button"
                className="pb-8 flex flex-col"
                key={`${idx}-${char?.hanzi}-${idx}`}
              >
                {" "}
                <span className="text-sm text-gray-500">
                  {currentPhrase?.pinyin}
                </span>
                <span className="text-gray-500">
                  {currentPhrase?.hanzi?.split("")?.map((val: string) => {
                    return (
                      <span
                        className={`${
                          selectedId === val ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {val}
                      </span>
                    );
                  })}
                </span>
                <span className="text-sm text-gray-500">{currentPhrase?.en}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div>
        <code>
          <pre>{JSON.stringify(relevantAnswers, null, 2)}</pre>
        </code>
      </div> */}
    </div>
  );
}

const bgs = [
  "bg-slate-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-red-500",
  "bg-slate-600",
  "bg-yellow-600",
  "bg-green-600",
  "bg-blue-600",
  "bg-red-600",
  "bg-slate-700",
  "bg-yellow-700",
  "bg-green-700",
  "bg-blue-700",
  "bg-red-700",
];

export default function NomadMethod(props: any) {
  const [selectedBelt, setSelectedBelt] = useState<any>();
  const [selectedId, setSelectedId] = useState<any>("");
  const [view, setView] = useState("characters");
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const { data } = useListTonePairsQuery({});

  const { data: answers } = useListAnswersQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const selectedItem = propsArr.find((item) => item?.hanzi === selectedId);

  const belts = [
    {
      fill: "bg-slate-200",
      unselected: "bg-slate-100",
      maxCharacterLevel: 105,
      level: "white",
    },
    {
      fill: "bg-yellow-500",
      unselected: "bg-yellow-200",
      maxCharacterLevel: 300,
      type: "yellow",
    },
    {
      fill: "bg-green-500",
      unselected: "bg-green-200",
      maxCharacterLevel: 600,
      level: "green",
    },
    {
      fill: "bg-blue-500",
      unselected: "bg-blue-200",
      maxCharacterLevel: 1200,
      level: "blue",
    },
    {
      fill: "bg-red-500",
      unselected: "bg-red-200",
      maxCharacterLevel: 2000,
      level: "red",
    },
    {
      fill: "bg-black",
      unselected: "bg-gray-300",
      maxCharacterLevel: 3000,
      level: "black",
    },
  ];

  return (
    <div className="grow">
      <NavBar />

      <div className="w-full text-center flex justify-center items-center space-x-4 mt-12 mb-8">
        {belts?.map?.((belt) => {
          return (
            <button
              key={belt?.fill}
              onClick={() => {
                setSelectedBelt(belt as any);
              }}
              className={`${
                belt?.level === (selectedBelt?.level as any)
                  ? belt?.fill
                  : belt?.unselected
              } h-4 w-4 rounded-full text`}
            ></button>
          );
        })}
      </div>

      {selectedId ? (
        <SelectedComponent
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ) : (
        <PageView
          setSelectedId={setSelectedId}
          view={view}
          belt={selectedBelt}
        />
      )}
    </div>
  );
}
