// import Image from 'next/image'
"use client";

import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { parse } from "@/data/utils";
import { faXmark } from "@fortawesome/pro-light-svg-icons/faXmark";

// import { course1 } from "@/data/convos/bm1/index";
import Link from "next/link";
import { useSelectedCharacter } from "./use-selected-character";
import { learnedCharacters } from "@/data/hmm/data";
import { useListContentsQuery } from "@/domain/content/content.queries";

function SelectedCharacter({
  // selectedChar,
  // setSelectedChar,
  unlockedCharactersHMM,
}: {
  setSelectedChar: any;
  selectedChar: any;
  unlockedCharactersHMM: string[];
}) {

  const searchParams = useSearchParams()

  const lessonId = searchParams.get('lessonId')
  // const params = useParams() as {
  //   lessonId: string
  // }
  const { data: allAnswers, isLoading } = useListAnswersQuery();

  const { data: contents } = useListContentsQuery();


  const currentContent = contents?.find((content: any) => content?.id === lessonId)

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const relevantAnswersHanzi = [
    // @ts-ignore
    ...new Set(
      allAnswers
        ?.filter((answer: any) => {
          return answer?.phraseId?.includes(
            selectedChar?.hanzi || selectedChar
          );
        })
        ?.map((x: any) => x?.phraseId)
    ),
  ];

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.phraseId?.includes(selectedChar?.hanzi || selectedChar);
  });

  console.log({ relevantAnswersHanzi });

  console.log("relevantAnswersHanzi", relevantAnswersHanzi);

  const uniqueAnswers = relevantAnswersHanzi?.map((x: string) => {
    return relevantAnswers?.find((ans: any) => ans?.hanzi === x);
  });

  const answerMap = R.indexBy(R.prop("hanzi"), relevantAnswers) as Record<
    string,
    { hanzi: string; journeyId: string; phraseId: string }
  >;

  const uniqueAnswerIds = [
    // @ts-ignore
    ...new Set(relevantAnswers?.map((answer: any) => answer?.hanzi)),
  ];

  console.log("answerMap", answerMap);

  console.log("uniqueAnswerIds", uniqueAnswerIds);

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
        <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
          {/* {selectedChar?.hanzi || selectedChar} */}

          <Link
            target="_blank"
            // className="text-sm md:text-xl"
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
          {uniqueAnswerIds?.map((id: any, idx: number) => {
            const char = answerMap?.[id] || {};

            console.log("CHAR", char);
            const lesson = {};

            console.log("CURRENT CONTENT", currentContent)

            const currentLesson = currentContent?.transcriptions?.find(
              (lesson: any) => lesson?.id === char?.journeyId
            );

            const currentPhrase = currentContent?.transcriptions?.find(
              (lesson: any) => lesson?.id === char?.hanzi
            );

            console.log("CURRENT PHRASE", currentPhrase);

            return (
              <div
                role="button"
                className="pb-8 flex flex-col"
                key={`${idx}-${char?.hanzi}-${idx}`}
              >
                {" "}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {currentPhrase?.pinyin}
                </span>
                <p>
                  {currentPhrase?.hanzi?.split("")?.map((str: string) => {
                    return (
                      <span
                        key={`${selectedChar}-${str}`}
                        className={`${
                          selectedChar === str
                            ? "text-gray-700 dark:text-yellow-300"
                            : "text-gray-500 dark:text-gray-300"
                        }`}
                      >
                        {str}
                      </span>
                    );
                  })}
                </p>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  {currentPhrase?.en}
                </span>
              </div>
              // <div
              //   role="button"
              //   className="pb-8 flex flex-col"
              //   key={`${idx}-${char?.hanzi}-${idx}`}
              // >
              //   {" "}
              //   <span className="text-sm text-gray-600">
              //     {currentPhrase?.pinyin}
              //   </span>
              //   <span className="text-gray-700">
              //     {currentPhrase?.hanzi?.split("")?.map((x: string) => {
              //       return (
              //         <span
              //           key={`${x}-${Math.random() * 10000}`}
              //           onClick={() => {
              //             setSelectedChar(x);
              //           }}
              //         >
              //           {x}
              //         </span>
              //       );
              //     })}
              //   </span>
              //   <span className="text-sm">{currentPhrase?.en}</span>
              // </div>
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
