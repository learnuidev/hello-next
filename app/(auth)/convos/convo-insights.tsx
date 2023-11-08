"use client";

import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import * as R from "ramda";
import { useRouter } from "next/navigation";
import { parse } from "@/data/utils";
import { useSelectedCharacter } from "./use-selected-character";
import { SelectedCharacter } from "@/components/selected-character";

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
  // const { data: allAnswers, isLoading } = useListAnswersQuery();

  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

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
          <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
            {uniqueWords?.length}{" "}
            <span className="text-sm md:text-xl">total characters </span>
          </h2>
          <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <span className="text-yellow-500"> {totalNewCharaters}</span>
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
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-500"
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
