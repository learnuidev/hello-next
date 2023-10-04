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
import { HanziMovieMethod as HanziMovieMethodPlay } from "./hanzi-movie-method";

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

const PageView = ({ view, setSelectedId }: any) => {
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

                // className={`${
                //   learnedActors.find(place => prop?.id === place.id)
                //     ? prop?.id?.includes('i')
                //       ? 'dark:text-pink-500'
                //       : prop?.id?.includes('u')
                //       ? 'dark:text-purple-500'
                //       : 'dark:text-blue-500'
                //     : 'dark:text-gray-500'
                // }

                // dark:hover:text-white p-6 text-4xl`}
                // className='dark:hover:text-white dark:text-gray-500 p-6 text-4xl'
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
          {charsArr.map((prop, idx) => {
            // return <p className='p-4'>{prop?.hanzi}</p>
            return (
              <button
                key={`${prop.hanzi}-chars-${idx}`}
                onClick={() => {
                  setSelectedId(prop.hanzi);
                }}
                className={`${
                  learnedCharacters.includes(prop?.hanzi)
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
    case "words":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {wordsArr.map((prop, idx) => {
            // return <p className='p-4'>{prop?.hanzi}</p>
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
                // className='dark:hover:text-white dark:text-gray-500 p-6 text-4xl'
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
      return "text-green-400";
    case 3:
      return "text-sky-400";
    case 4:
      return "text-purple-400";
    default:
      return "text-black dark:text-white";
  }
};

function ComponentEditor({ selectedId, setSelectedId }: any) {
  // @ts-ignore
  const dict = dictionary?.[selectedId];

  const actor = learnedActors.find((actor) => actor.id === selectedId);
  return (
    <div>
      <div className="my-4 mx-8 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
        <div></div>

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

        <button
          onClick={() => {
            setSelectedId(null);
          }}
          className={`my-4 flex flex-col items-center dark:text-gray-800 hover:dark:text-white transition`}
        >
          <CloseIcon className="text-4xl" />
        </button>
      </div>
      {/* 
      <div className='flex space-x-2 justify-center'>
        {dict?.sound ? <Music url={dict?.sound} /> : null}
        <p className={`my-4 text-2xl dark:text-gray-300 text-gray-600`}>
          {dict?.en || actor?.actor}
        </p>
      </div> */}

      {dict?.movie ? (
        <div className="my-4 mx-8 md:mx-16 dark:text-gray-300 text-gray-800 flex flex-col items-center justify-center">
          <div className="flex space-x-4">
            <p>
              <ActorIcon /> {dict?.movie?.actor}
            </p>
            <p>
              <PropsIcon />{" "}
              {dict?.movie?.props.map((prop: string) => {
                return <span key={prop}> {prop}</span>;
              })}
            </p>
            <p>
              <PlaceIcon /> {dict?.movie?.set}, {dict?.movie?.room}
            </p>
          </div>

          <div className="md:px-60 my-16 leading-[60px] tracking-wider">
            {" "}
            {dict?.movie?.scene.split(" ").map((word: string) => {
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
                      {/* <div>
                <MessageIcon />
              </div> */}

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
                              {/* <p className='dark:text-gray-600 text-gray-300'>
                                {example?.hanzi}
                              </p> */}
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
        {dict?.examples ? (
          <div className="flex flex-col items-center">
            {/* <div>
              <MessageIcon />
            </div> */}

            <div className="space-y-8 my-4">
              {dict?.examples.map((example: any) => {
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
    </div>
  );
}

export default function HanziMovieMethod(props: any) {
  const [selectedId, setSelectedId] = useState<any>("");
  const [view, setView] = useState("characters");
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const selectedItem = propsArr.find((item) => item?.hanzi === selectedId);

  return (
    <div className="grow">
      <NavBar />
      <div className="dark:text-gray-500 my-4 space-x-8 flex justify-center items-center">
        <button
          onClick={() => {
            setSelectedId(null);
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
            setSelectedId(null);
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
            setSelectedId(null);
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
            setSelectedId(null);
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
            setSelectedId(null);
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
            setSelectedId(null);
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
            setSelectedId(null);
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
        {/* <button
          onClick={() => {
            setSelectedId(null);
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
        </button> */}
      </div>

      {selectedId ? (
        <ComponentEditor
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ) : (
        <PageView setSelectedId={setSelectedId} view={view} />
      )}
    </div>
  );
}
