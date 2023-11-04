"use client";
import React from "react";

import { SentenceIcon, PlayIcon } from "@/components/ui/icons";
import { useState } from "react";
import { dictionary } from "@/data/hmm/data/dictionary";
import { Music } from "@/components/music";

import { WordIcon } from "@/components/ui/icons";

import { faXmark } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PageView } from "./page-view";

import { calculateColor } from "./utils";
import { ICharacter, getCharacterToneLevel } from "@/data/hmm/data/utils";
export function SelectedComponent({ selectedId, setSelectedId, belt }: any) {
  // @ts-ignore
  const dict = dictionary?.[selectedId];

  const [view, setView] = useState("sentences");

  const toneLevel = getCharacterToneLevel(dict as ICharacter);

  const color = calculateColor({ tone: toneLevel });

  return (
    <div>
      <div className="my-4 text-black dark:text-white grid grid-cols-12 items-center justify-between w-full">
        <button
          onClick={() => {
            setSelectedId(null);
          }}
          className={`col-span-1 text-3xl my-4 flex flex-col items-center dark:text-gray-500 hover:dark:text-white transition`}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="col-span-9 space-x-2 flex flex-col items-center">
          {dict?.pinyin ? (
            <span
              className={`items-center flex space-x-4 text-2xl font-bold ${color}`}
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

        <div className="col-span-2 dark:text-gray-500 my-4 md:space-x-12 flex justify-center items-center">
          <button
            onClick={() => {
              setView("play");
            }}
            className={`${
              view === "play"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-500 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <PlayIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Play</p>
          </button>

          <button
            onClick={() => {
              setView("words");
            }}
            className={`${
              view === "words"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-500 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <WordIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Words</p>
          </button>

          <button
            onClick={() => {
              setView("sentences");
            }}
            className={`${
              view === "sentences"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-500 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <SentenceIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Sentences</p>
          </button>
        </div>
      </div>
      {/* <div className="px-32 my-4 text-black dark:text-white flex flex-wrap items-center justify-between">
        <button
          onClick={() => {
            setSelectedId(null);
          }}
          className={`text-3xl my-4 flex flex-col items-center dark:text-gray-500 hover:dark:text-white transition`}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="space-x-2 flex flex-col items-center">
          {dict?.pinyin ? (
            <span
              className={`items-center flex space-x-4 text-2xl font-bold ${color}`}
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

        <div className="dark:text-gray-500 my-4 md:space-x-12 flex justify-center items-center">
          <button
            onClick={() => {
              setView("play");
            }}
            className={`${
              view === "play"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-500 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <PlayIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Play</p>
          </button>

          <button
            onClick={() => {
              setView("words");
            }}
            className={`${
              view === "words"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-500 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <WordIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Words</p>
          </button>

          <button
            onClick={() => {
              setView("sentences");
            }}
            className={`${
              view === "sentences"
                ? "dark:text-white text-gray-800"
                : "dark:text-gray-500 text-gray-200"
            } my-4 flex flex-col items-center hover:dark:text-white transition`}
          >
            <SentenceIcon className="text-2xl" />
            <p className="text-[8px] p-0 m-0">Sentences</p>
          </button>
        </div>
      </div> */}

      <PageView
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        view={view}
        belt={belt}
      />
    </div>
  );
}
