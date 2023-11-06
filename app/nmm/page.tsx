"use client";
import React from "react";
import { useState, useEffect } from "react";
// import { propsArr } from "@/data/hmm/data";
import { NavBar } from "@/components/navbar";
import { useListTonePairsQuery } from "@/domain/tone-pairs/tone-pairs.queries";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useSelectedCharacter } from "../(auth)/convos/use-selected-character";
import { PageView } from "./page-view";
import { SelectedComponent } from "./selected-component";
import { getGraph } from "../pinyin/utils";

import { propsArr, learnedCharacters } from "@/data/hmm/data";

import { ICharacter, getCharacterToneLevel } from "@/data/hmm/data/utils";

import {
  allWords as wordsArr,
  allChars as charsArr2,
} from "@/data/hmm/data/v1000";
//
// import { yellowBelt as charsArr } from "@/data/nmm/yellow";
import { belts, calculateColor } from "./utils";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";

// const yellowHanzis = charsArr2?.map((x) => x?.hanzi);

// const yellowHmm = charsArr?.filter((x) => x?.level < 1200);

// console.log(
//   "hmm",
//   yellowHmm
//     ?.map((x) => x?.level)
//     ?.filter((l) => !charsArr2?.map((x) => x?.level)?.includes(l))
//     ?.map(level => yellowHmm?.find(x => x.level === level)?.hanzi)
//     ?.join(" ")
// );

// console.log(
//   "nmm",
//   charsArr2
//     ?.map((x) => x?.level)
//     ?.filter((l) => !charsArr?.map((x) => x?.level)?.includes(l))
//     ?.map(level => charsArr2?.find(x => x.level === level)?.hanzi)
//     ?.join(" ")
// );
// console.log(
//   "nmm",
//   charsArr2?.map((x) => x?.level)
// );

// console.log("HELLO HMM", yellowHmm?.filter(x => charsArr2?.map(item => item?.hanzi)?.join(" ")?.includes(x?.hanzi)))

// console.log("PINYIN", charsArr2)
// console.log(
//   "DIFF YO",
//   charsArr?.filter((item) => !yellowHanzis?.includes(item?.hanzi) && item?.level < 1171)
// );

export default function NomadMethodPage(props: any) {
  const [selectedBelt, setSelectedBelt] = useState<any>();
  // const [selectedId, setSelectedId] = useState<any>("");

  const selectedId = useSelectedCharacter((state: any) => state?.character);
  const setSelectedId = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );
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

  const { data: charsArr } = useListComponentsQuery();

  const selectedItem = propsArr.find((item) => item?.hanzi === selectedId);

  const lastAnswer = answers?.[answers?.length - 1];

  return (
    <div className="grow">
      <NavBar />

      {selectedId ? null : (
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
      )}

      {selectedId ? (
        <SelectedComponent
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          belt={selectedBelt}
        />
      ) : (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
          {charsArr?.length &&
            charsArr
              ?.slice(0, selectedBelt?.maxCharacterLevel || 4000)
              .map((prop: any, idx: number) => {
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
                        : lastAnswer?.totalCharacters?.includes(prop?.hanzi)
                        ? "text-yellow-500"
                        : "dark:text-gray-500 text-gray-200"
                    } dark:hover:text-white p-4 text-3xl md:text-2xl transition lowercase`}
                  >
                    {prop?.hanzi}
                  </button>
                );
              })}
        </div>
      )}
    </div>
  );
}
