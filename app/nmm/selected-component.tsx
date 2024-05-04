"use client";
import React from "react";

import { SentenceIcon, PlayIcon } from "@/components/ui/icons";
import { useState } from "react";

import { Music } from "@/components/music";

import { WordIcon } from "@/components/ui/icons";

import { faXmark } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PageView } from "./page-view";

import { calculateColor } from "./utils";

import { useListComponents } from "@/domain/lesson/component.queries";
import { AudioComponent } from "@/components/_select-character/audio-component";
export function SelectedComponent({ selectedId, setSelectedId, belt }: any) {
  const [view, setView] = useState("sentences");

  const { data: components } = useListComponents();

  const selectedComp = components?.find(
    (component: any) => component?.hanzi === selectedId
  );

  const color = calculateColor({ tone: selectedComp?.tone_level });

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
          <div className="flex items-center flex-col items-end">
            <p className={`text-3xl font-bold ${color}`}>
              {" "}
              {selectedId} (
              {(selectedComp?.pinyin as string)?.toLocaleLowerCase()})
            </p>

            <p>{selectedComp?.en}</p>

            {selectedComp?.audio ? (
              <AudioComponent currentPhrase={selectedComp} />
            ) : null}
          </div>
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

      <PageView
        setView={setView}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        view={view}
        belt={belt}
      />
    </div>
  );
}
