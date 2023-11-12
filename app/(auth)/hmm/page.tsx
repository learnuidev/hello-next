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

import { HanziMovieMethod as HanziMovieMethodPlay } from "./hanzi-movie-method";

import {
  PropsIcon,
  CharacterIcon,
  WordIcon,
  CloseIcon,
} from "@/components/ui/icons";
import { NavBar } from "@/components/navbar";

const PageView = ({ view, setSelectedId }: any) => {
  switch (view) {
    case "play":
      return <HanziMovieMethodPlay />;

    case "words":
    case "scenes":
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
        <PageView setView={setView} setSelectedId={setSelectedId} view={view} />
      )}
    </div>
  );
}
