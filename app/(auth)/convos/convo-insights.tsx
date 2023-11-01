// import Image from 'next/image'
"use client";

import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { parse } from "@/data/utils";
import { faXmark } from "@fortawesome/pro-light-svg-icons/faXmark";

import { course1 } from "@/data/convos/bm1/index";
import Link from "next/link";
import { useSelectedCharacter } from "./use-selected-character";
import { learnedCharacters } from "@/data/hmm/data";

function SelectedCharacter({
  // selectedChar,
  // setSelectedChar,
  unlockedCharactersHMM,
}: {
  setSelectedChar: any;
  selectedChar: any;
  unlockedCharactersHMM: string[];
}) {
  const { data: allAnswers, isLoading } = useListAnswersQuery();

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const relevantAnswersHanzi = [
    // @ts-ignore
    ...new Set(
      allAnswers
        ?.filter((answer: any) => {
          return answer?.hanzi?.includes(selectedChar?.hanzi || selectedChar);
        })
        ?.map((x: any) => x?.hanzi)
    ),
  ];

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.hanzi?.includes(selectedChar?.hanzi || selectedChar);
  });

  console.log({ relevantAnswersHanzi });

  const uniqueAnswers = relevantAnswersHanzi?.map((x: string) => {
    return relevantAnswers?.find((ans: any) => ans?.hanzi === x);
  });

  // const relevantAnswers = [
  //   ...new Set(
  //     allAnswers
  //       ?.filter((answer: any) => {
  //         return answer?.hanzi?.includes(selectedChar?.hanzi || selectedChar);
  //       })
  //       ?.map((x) => JSON.stringify(x))
  //   ),
  // ]?.map((x) => JSON.parse(x));

  console.log("SELECTED CHAR", selectedChar);

  // return null

  return (
    <div className="w-full px-4 md:px-32 my-4 md:my-8">
      <div className="flex justify-between items-center">
        <button
          className="text-4xl"
          onClick={() => {
            setSelectedChar("");
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className="text-4xl md:text-6xl my-4 font-extralight text-gray-500">
          {selectedChar?.hanzi || selectedChar}

          <Link
            target="_blank"
            className="text-sm md:text-xl"
            href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
              selectedChar?.hanzi || selectedChar
            )}`}
          >
            {" "}
            {selectedChar?.hanzi || selectedChar}
          </Link>
        </h2>
      </div>
      <div className="my-8">
        {/* <h2>nmm</h2> */}
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {uniqueAnswers?.map((char: any, idx: number) => {
            const lesson = {};

            const currentLesson = course1?.lessons?.find(
              (lesson: any) => lesson?.id === char?.journeyId
            );

            const currentPhrase = currentLesson?.lessons?.find(
              (lesson: any) => lesson?.id === char?.hanzi
            );

            return (
              <div
                role="button"
                className="pb-8 flex flex-col"
                key={`${idx}-${char?.hanzi}-${idx}`}
              >
                {" "}
                <span className="text-sm text-gray-600">
                  {currentPhrase?.pinyin}
                </span>
                <span className="text-gray-700">
                  {currentPhrase?.hanzi?.split("")?.map((x: string) => {
                    return (
                      <span
                      key={`${x}-${Math.random() * 10000}`}
                        onClick={() => {
                          setSelectedChar(x);
                        }}
                      >
                        {x}
                      </span>
                    );
                  })}
                </span>
                <span className="text-sm">{currentPhrase?.en}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ConvoInsights({ lessonId }: { lessonId: string }) {
  const [isTocHidden, setIsTocHidden] = useState(false);
  // const [selectedChar, setSelectedChar] = useState("");

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const router = useRouter();

  // const { data: allAnswers, isLoading } = useListAnswersQuery({
  //   journeyId: lessonId,
  // });
  const { data: allAnswers, isLoading } = useListAnswersQuery();

  if (isLoading) {
    return (
      <div className=" px-4 md:px-32 my-4 md:my-8">
        <div className="text-center my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
          ...
        </div>
      </div>
    );
  }

  const allLessonAnswers = allAnswers?.filter(
    (answer: any) => answer?.journeyId === lessonId
  );

  const allNewCharaters = allLessonAnswers
    .map((curr: any) => curr?.newCharacters)
    ?.flat();

  const totalNewCharaters = allLessonAnswers.reduce(
    (acc: number, curr: any) => acc + curr?.newCharacters?.length,
    0
  );

  const uniqueWords = [
    // @ts-ignore
    ...new Set(
      allLessonAnswers
        ?.map((answer: { hanzi: string }) => answer?.hanzi)
        ?.join("")
    ),
  ]
    .join("")
    ?.toLocaleLowerCase()
    ?.split("")
    ?.filter((x: string) => !["c", "i", "n", "d", "y"]?.includes(x));

  const allWords = [
    // @ts-ignore
    ...allLessonAnswers
      ?.map((answer: { hanzi: string }) => answer?.hanzi)
      ?.join(""),
  ]
    .join("")
    ?.toLocaleLowerCase()
    ?.split("")
    ?.filter((x: string) => !["c", "i", "n", "d", "y"]?.includes(x));

  const uniqueWordsStr = uniqueWords?.join(" ");

  const unlockedNMMCharacters = parse(uniqueWordsStr)?.sort(
    (a, b) => a?.hmmCharacterLevel - b?.hmmCharacterLevel
  );

  const unlockedCharactersHMM = unlockedNMMCharacters?.map((x) => x.hanzi);
  const unlockedCharactersHMMStr = unlockedCharactersHMM?.join(" ");

  const charactersWithFrequencyList = Object.entries(
    R.countBy(R.identity, allWords)
  )
    .map(([hanzi, frequency]) => {
      return {
        hanzi,
        frequency,
      };
    })
    ?.sort((a, b) => b?.frequency - a?.frequency);

  const unlockedCharactersNMM = charactersWithFrequencyList?.map(
    (character) => character?.hanzi
  );
  const unlockedCharactersNMMStr = unlockedCharactersNMM?.join(" ");

  const currentLevel = {
    maxCharacterLevel: 600,
  };

  return selectedChar ? (
    <SelectedCharacter
      selectedChar={selectedChar}
      setSelectedChar={setSelectedChar}
      unlockedCharactersHMM={unlockedCharactersHMM}
    />
  ) : (
    <div className="w-full px-4 md:px-32 my-4 md:my-8">
      <div>
        <div className="flex justify-start space-x-16">
          <h2 className="text-4xl md:text-6xl my-4 font-extralight text-gray-500">
            {uniqueWords?.length}{" "}
            <span className="text-sm md:text-xl">total characters </span>
          </h2>
          <h2 className="text-4xl md:text-6xl my-4 font-extralight text-gray-500">
            {totalNewCharaters}{" "}
            <span className="text-sm md:text-xl">new characters </span>
          </h2>

          {/* <h2 className="text-4xl md:text-6xl my-4 font-extralight text-gray-500">
            {learnedCharacters?.length}{" "}
            <span className="text-sm md:text-xl">characters acquired </span>
          </h2> */}
          {/* <h2 className="text-4xl md:text-6xl my-4 font-extralight text-gray-500">
            {unlockedCharactersHMM?.length}{" "}
            <span className="text-sm md:text-xl">characters learned </span>
          </h2> */}
          {/* <h2 className="text-4xl md:text-6xl my-4 font-extralight text-gray-500">
            {unlockedCharactersHMM?.length}{" "}
            <span className="text-sm md:text-xl">characters learned </span>
          </h2> */}
        </div>

        <div className="my-8">
          <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
            {uniqueWords?.map((char, idx: number) => {
              return (
                <span
                  role="button"
                  onClick={() => {
                    setSelectedChar(char);
                  }}
                  className={`p-2 ${
                    // ""
                    allNewCharaters?.includes(char)
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                  // className="p-2"
                  key={`${idx}-${char}-${idx}`}
                >
                  {" "}
                  {char}
                </span>
              );
            })}
          </div>
        </div>
        {/* <div className="my-8">
          <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
            {unlockedNMMCharacters?.map((char, idx: number) => {
              return (
                <span
                  role="button"
                  onClick={() => {
                    setSelectedChar(char);
                  }}
                  className={`p-2 ${
                    currentLevel?.maxCharacterLevel >= char?.hmmCharacterLevel
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                  // className="p-2"
                  key={`${idx}-${char?.hanzi}-${idx}`}
                >
                  {" "}
                  {char?.hanzi}
                </span>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
}
