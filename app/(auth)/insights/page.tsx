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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faChartSimple, faTable, faX } from "@fortawesome/pro-thin-svg-icons";
import { CharacterDiscoveryAreaChart } from "./CharacterDiscoveryAreaChart";
import { useRepeatHistoryStore } from "../convos/_play/use-repeat-history";
import { useUniqueAnswers } from "@/app/nmm/use-unique-answers";

import { useParams, useSearchParams } from "next/navigation";

import Link from "next/link";
import { useSelectedCharacter } from "../convos/use-selected-character";

import { useListContentsQuery } from "@/domain/content/content.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { calculateColor } from "@/app/nmm/utils";
import { cleanString } from "@/data/convos/bm1/utils";

function SelectedCharacter({
  unlockedCharactersHMM,
}: {
  setSelectedChar: any;
  selectedChar: any;
  unlockedCharactersHMM: string[];
}) {
  const searchParams = useSearchParams();

  const lessonId = searchParams.get("lessonId");
  // const params = useParams() as {
  //   lessonId: string
  // }
  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: contents } = useListContentsQuery();

  const allContents = contents
    ?.map((content: any) => content?.transcriptions)
    ?.flat();

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const relevantAnswersHanzi = [
    // @ts-ignore
    ...new Set(
      allAnswers
        ?.filter((answer: any) => {
          return answer?.phraseId?.includes(selectedChar);
        })
        ?.map((x: any) => x?.phraseId)
    ),
  ];

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.phraseId?.includes(selectedChar?.hanzi || selectedChar);
  });

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

  const { data: components } = useListComponentsQuery();

  const allSteps =
    components
      ?.map((component: any) => component?.steps)
      ?.filter(Boolean)
      ?.flat() || [];

  const selectedComp = components?.find(
    (component: any) => component?.hanzi === selectedChar
  );

  return (
    <div className="w-full px-4 md:px-12">
      <div className="flex justify-between items-center">
        <button
          className="text-xl"
          onClick={() => {
            setSelectedChar("");
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
          <Link
            target="_blank"
            href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
              selectedChar?.hanzi || selectedChar
            )}`}
            className="flex items-end space-x-2"
          >
            {" "}
            <span>{selectedChar?.hanzi || selectedChar}</span>{" "}
            <span className="text-xs">{selectedComp?.en}</span>
          </Link>
        </h2>
      </div>
      <div className="my-8">
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {uniqueAnswerIds?.map((id: any, idx: number) => {
            const char = answerMap?.[id] || {};

            const currentLesson = allContents?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

            const currentPhrase =
              allContents?.find(
                (lesson: any) => lesson?.id === char?.phraseId
              ) ||
              allSteps?.find((step: any) => cleanString(step?.hanzi) === id);

            return (
              <div
                role="button"
                className="pb-8 flex flex-col"
                key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
              >
                {" "}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentPhrase?.pinyin}
                </span>
                <span className="text-gray-500 dark:text-gray-300">
                  {currentPhrase?.hanzi
                    ?.split("")
                    ?.map((val: string, idy: number) => {
                      // const toneLevel = getCharacterToneLevel(
                      //   currentPhrase as ICharacter
                      // );

                      // const color = calculateColor({ tone: toneLevel });

                      const color = calculateColor({
                        tone: selectedComp?.tone_level,
                      });

                      return (
                        <span
                          key={`${idx}-${val}-${idx}-${idy}-${idy}-${idx}`}
                          onClick={() => {
                            setSelectedChar(val);
                          }}
                          className={`${
                            selectedChar === val
                              ? color
                              : "text-gray-400 dark:text-gray-300"
                          }`}
                        >
                          {val}
                        </span>
                      );
                    })}
                </span>
                <span className="text-sm text-gray-500">
                  {currentPhrase?.en || currentPhrase?.title}
                </span>
              </div>
              // <div
              //   role="button"
              //   className="pb-8 flex flex-col"
              //   key={`${idx}-${char?.hanzi}-${idx}`}
              // >
              //   {" "}
              //   <span className="text-md text-gray-600 dark:text-gray-300">
              //     {currentPhrase?.pinyin}
              //   </span>
              //   <p>
              //     {currentPhrase?.hanzi?.split("")?.map((str: string) => {
              //       return (
              //         <span
              //           key={`${selectedChar}-${str}`}
              //           className={`${
              //             selectedChar === str
              //               ? "text-gray-700 dark:text-yellow-300"
              //               : "text-gray-500 dark:text-gray-300"
              //           }`}
              //         >
              //           {str}
              //         </span>
              //       );
              //     })}
              //   </p>
              //   <span className="text-md text-gray-700 dark:text-gray-400">
              //     {currentPhrase?.en || title}
              //   </span>
              // </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Insights() {
  const [isTocHidden, setIsTocHidden] = useState(false);
  // const [selectedChar, setSelectedChar] = useState("");

  const { data: learnedCharacters } = useListCharactersQuery();

  const { data: components } = useListComponentsQuery();

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );
  const router = useRouter();

  const repeatHistories = useRepeatHistoryStore((state: any) => state.history);

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
    ?.filter(
      (x: string) =>
        !["c", "i", "n", "d", "y"]?.includes(x?.toLocaleLowerCase())
    );

  const allWords = [
    // @ts-ignore
    ...allAnswers?.map((answer: { hanzi: string }) => answer?.hanzi)?.join(""),
  ]
    .join("")
    ?.toLocaleLowerCase()
    ?.split("")
    ?.filter(
      (x: string) =>
        !["c", "i", "n", "d", "y"]?.includes(x?.toLocaleLowerCase())
    );

  const uniqueWordsStr = uniqueWords
    ?.join(" ")
    ?.concat(learnedCharacters?.map((x: any) => x?.hanzi)?.join(" "));

  const unlockedNMMCharacters = parse(uniqueWordsStr)?.sort(
    (a, b) => a?.hmmCharacterLevel - b?.hmmCharacterLevel
  );

  console.log("unlockedNMMCharacters", unlockedNMMCharacters);

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
    // ?.sort((a, b) => b?.frequency - a?.frequency)
    ?.map((a) => {
      const char = unlockedNMMCharacters?.find(
        (char) => char?.hanzi === a?.hanzi
      );
      return {
        ...char,
        ...a,
      };
    });

  const unlockedCharactersNMM = charactersWithFrequencyList?.map(
    (character) => character?.hanzi
  );
  const unlockedCharactersNMMStr = unlockedCharactersNMM?.join(" ");

  // TODO Fix this
  const currentLevel = {
    maxCharacterLevel: 300,
  };

  function formatPercentage(number: number) {
    return Intl.NumberFormat("en-GB", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(number);
  }

  const correctAnswers = allAnswers?.filter(
    (answer: any) => answer?.status === "correct"
  );

  const accuracyPercentage = formatPercentage(
    correctAnswers?.length / allAnswers?.length
  );

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
        <Tabs defaultValue="default">
          {/* <TabsList className="w-full px-4 md:px-32 my-4 md:my-8">
            <TabsTrigger value="default">
              <FontAwesomeIcon icon={faTable} className="text-xl" />
            </TabsTrigger>
            <TabsTrigger value="charts">
              <FontAwesomeIcon icon={faChartSimple} className="text-xl" />
            </TabsTrigger>
          </TabsList> */}
          <TabsContent value="default">
            <div className="">
              <div className="flex flex-col md:flex-row justify-between my-4 md:mt-16">
                <div className="w-full px-4 md:px-32">
                  <div className="flex justify-start space-x-8">
                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      <span>
                        {unlockedNMMCharacters?.length}
                        <span className="text-md">x </span>{" "}
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Characters Discovered{" "}
                      </span>
                    </h2>

                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      <span>
                        {learnedCharacters?.length}
                        <span className="text-md">x </span>{" "}
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Characters Learned
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="w-full px-4 md:px-32">
                  <div className="flex justify-end space-x-4 md:space-x-8">
                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      <span>
                        {repeatHistories?.length}
                        <span className="text-md">x </span>{" "}
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Listening
                      </span>
                    </h2>

                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      {/* <span>{accuracyPercentage} </span> */}
                      <span>
                        {allAnswers?.length}
                        <span className="text-md">x </span>
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Writing
                      </span>
                    </h2>

                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      {/* <span>97.8% </span> */}
                      {/* <span>
                      {942} <span className="text-md">x </span>
                    </span> */}
                      <span>
                        {42}
                        <span className="text-md">x </span>
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Speaking
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 md:px-32 my-4 md:my-8 flex items-center justify-center">
                <div className="my-8">
                  <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
                    {unlockedNMMCharacters?.map((char, idx: number) => {
                      const selectedComp = components?.find(
                        (component: any) => component?.hanzi === char?.hanzi
                      );

                      const color = calculateColor({
                        tone: selectedComp?.tone_level,
                      });
                      return (
                        <button
                          role="button"
                          onClick={() => {
                            setSelectedChar(char?.hanzi);
                          }}
                          // disabled={
                          //   currentLevel?.maxCharacterLevel <
                          //   char?.hmmCharacterLevel
                          // }
                          className={`p-2 ${
                            learnedCharacters?.find(
                              (item: any) => item?.hanzi === char?.hanzi
                            )
                              ? `${color}`
                              : currentLevel?.maxCharacterLevel >=
                                char?.hmmCharacterLevel
                              ? "text-gray-700 dark:text-gray-300"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                          key={`${idx}-${char}-${idx}`}
                        >
                          {" "}
                          {char?.hanzi}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="w-full px-4 md:px-32 my-4 md:my-12">
                <CharacterDiscoveryAreaChart />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="charts">
            <div>
              <div className="flex justify-between px-12">
                <div className="w-full">
                  <div className="flex justify-start space-x-4 md:space-x-8">
                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      <span>
                        {unlockedNMMCharacters?.length}
                        <span className="text-md">x </span>{" "}
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Characters Discovered{" "}
                      </span>
                    </h2>

                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      <span>
                        {learnedCharacters?.length}
                        <span className="text-md">x </span>{" "}
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Characters Learned
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex justify-end space-x-4 md:space-x-8">
                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      <span>
                        {repeatHistories?.length}
                        <span className="text-md">x </span>{" "}
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Listening
                      </span>
                    </h2>

                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      {/* <span>{accuracyPercentage} </span> */}
                      <span>
                        {allAnswers?.length}
                        <span className="text-md">x </span>
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Writing
                      </span>
                    </h2>

                    <h2 className="flex flex-col-reverse items-center text-2xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                      {/* <span>97.8% </span> */}
                      {/* <span>
                      {942} <span className="text-md">x </span>
                    </span> */}
                      <span>
                        {42}
                        <span className="text-md">x </span>
                      </span>
                      <span className="text-sm md:text-md dark:text-gray-400">
                        Speaking
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 md:px-32 my-4 md:my-12">
                <CharacterDiscoveryAreaChart />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </main>
  );
}
