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

function SelectedCharacter({
  selectedChar,
  setSelectedChar,
  unlockedCharactersHMM,
}: {
  setSelectedChar: any;
  selectedChar: string;
  unlockedCharactersHMM: string[];
}) {
  const { data: allAnswers, isLoading } = useListAnswersQuery();

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.hanzi?.includes(selectedChar);
  });

  return (
    <div className="w-full px-4 md:px-32 my-4 md:my-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl md:text-6xl my-4 font-extralight text-gray-500">
          {selectedChar}
          <span className="text-sm md:text-xl"> {selectedChar}</span>
        </h2>
        <button
          className="text-4xl"
          onClick={() => {
            setSelectedChar("");
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="my-8">
        {/* <h2>nmm</h2> */}
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {relevantAnswers?.map((char: any, idx: number) => {
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
                <span className="text-gray-700">{currentPhrase?.hanzi}</span>
                <span className="text-sm">{currentPhrase?.en}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [isTocHidden, setIsTocHidden] = useState(false);
  const [selectedChar, setSelectedChar] = useState("");

  const router = useRouter();

  const { data: allAnswers, isLoading } = useListAnswersQuery();

  if (isLoading) {
    return <div> is loading ...</div>;
  }

  const uniqueWords = [
    // @ts-ignore
    ...new Set(
      allAnswers?.map((answer: { hanzi: string }) => answer?.hanzi)?.join("")
    ),
  ]
    .join("")
    ?.toLocaleLowerCase()
    ?.split("")
    ?.filter((x: string) => !["c", "i", "n", "d", "y"]?.includes(x));

  const allWords = [
    // @ts-ignore
    ...allAnswers?.map((answer: { hanzi: string }) => answer?.hanzi)?.join(""),
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

  return (
    <main className="">
      <NavBar />
      {selectedChar ? (
        <SelectedCharacter
          selectedChar={selectedChar}
          setSelectedChar={setSelectedChar}
          unlockedCharactersHMM={unlockedCharactersHMM}
        />
      ) : (
        <div className="w-full px-4 md:px-32 my-4 md:my-8">
          <h2 className="text-4xl md:text-6xl my-4 font-extralight text-gray-500">
            {unlockedCharactersHMM?.length}{" "}
            <span className="text-sm md:text-xl">characters discovered </span>
          </h2>

          <div className="my-8">
            <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
              {unlockedCharactersHMM?.map((char, idx: number) => {
                return (
                  <span
                    role="button"
                    onClick={() => {
                      setSelectedChar(char);
                    }}
                    className="p-2"
                    key={`${idx}-${char}-${idx}`}
                  >
                    {" "}
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
