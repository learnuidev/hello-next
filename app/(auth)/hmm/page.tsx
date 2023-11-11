"use client";
import React from "react";

import {
  PlaceIcon,
  ActorIcon,
  SceneIcon,
  SentenceIcon,
  MessageIcon,
  PlayIcon,
} from "@/components/ui/icons";
import { useState, useEffect } from "react";

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

import { allWords as wordsArr } from "@/data/hmm/data/v2";

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
                key={JSON.stringify(prop)}
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
          {propsArr.map((prop) => {
            // return <p className='p-4'>{prop?.hanzi}</p>
            return (
              <button
                key={JSON.stringify(prop)}
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
    // case "characters":
    //   return (
    //     <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
    //       {charsArr.map((prop) => {
    //         // return <p className='p-4'>{prop?.hanzi}</p>
    //         return (
    //           <button
    //             key={JSON.stringify(prop)}
    //             onClick={() => {
    //               setSelectedId(prop.hanzi);
    //             }}
    //             className={`${
    //               learnedCharacters.includes(prop?.hanzi)
    //                 ? "dark:text-white text-gray-700"
    //                 : "dark:text-gray-500 text-gray-200"
    //             } dark:hover:text-white p-6 text-4xl transition`}
    //           >
    //             {prop?.hanzi}
    //           </button>
    //         );
    //       })}
    //     </div>
    //   );
    case "words":
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {wordsArr.map((prop) => {
            // return <p className='p-4'>{prop?.hanzi}</p>
            return (
              <button
                key={JSON.stringify(prop)}
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
          {wordsArr.map((prop) => {
            // return <p className='p-4'>{prop?.hanzi}</p>
            return (
              <button
                key={JSON.stringify(prop)}
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
      return "text-purple-400";
    case 4:
      return "text-pink-400";
    default:
      return "text-black dark:text-white";
  }
};

function ComponentEditor({ selectedId, setSelectedId }: any) {
  // @ts-ignore
  // const dict = dictionary?.[selectedId];

  const actor = learnedActors.find((actor) => actor.id === selectedId);
  return (
    <div>
      <NavBar />
      <div className="my-4 mx-8 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
        <div></div>

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
    </div>
  );
}

export default function HanziMovieMethod(props: any) {
  const [selectedId, setSelectedId] = useState<any>("");
  const [view, setView] = useState("words");
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
      <div className="dark:text-gray-500 my-4 space-x-8 flex justify-center items-center">
        <button
          onClick={() => {
            setSelectedId(null);
            setView("play");
          }}
          className={`${
            view === "play" ? "dark:text-white" : "dark:text-gray-800"
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
            view === "actors" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <ActorIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Actors</p>
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            setView("places");
          }}
          className={`${
            view === "places" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <PlaceIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Sets</p>
        </button>

        <button
          onClick={() => {
            setSelectedId(null);
            setView("scenes");
          }}
          className={`${
            view === "scenes" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <SceneIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Scripts</p>
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            setView("props");
          }}
          className={`${
            view === "props" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <PropsIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Props</p>
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            setView("characters");
          }}
          className={`${
            view === "characters" ? "dark:text-white" : "dark:text-gray-800"
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
            view === "words" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <WordIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Words</p>
        </button>
        <button
          onClick={() => {
            setSelectedId(null);
            setView("sentences");
          }}
          className={`${
            view === "sentences" ? "dark:text-white" : "dark:text-gray-800"
          } my-4 flex flex-col items-center hover:dark:text-white transition`}
        >
          <SentenceIcon className="text-2xl" />
          <p className="text-[8px] p-0 m-0">Sentences</p>
        </button>
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
