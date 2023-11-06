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
import { faChartSimple, faTable } from "@fortawesome/pro-thin-svg-icons";
import { CharacterDiscoveryAreaChart } from "./CharacterDiscoveryAreaChart";
import { useRepeatHistoryStore } from "../convos/_play/use-repeat-history";
import { useUniqueAnswers } from "@/app/nmm/use-unique-answers";

import { useParams, useSearchParams } from "next/navigation";

import Link from "next/link";
import { useSelectedCharacter } from "../convos/use-selected-character";

import { useListContentsQuery } from "@/domain/content/content.queries";

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
  const { data: allAnswers, isLoading } = useListAnswersQuery();

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
          <Link
            target="_blank"
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
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {uniqueAnswerIds?.map((id: any, idx: number) => {
            const char = answerMap?.[id] || {};

            const currentLesson = allContents?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

            const currentPhrase = allContents?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

            return (
              <div
                role="button"
                className="pb-8 flex flex-col"
                key={`${idx}-${char?.hanzi}-${idx}`}
              >
                {" "}
                <span className="text-md text-gray-600 dark:text-gray-300">
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
                <span className="text-md text-gray-700 dark:text-gray-400">
                  {currentPhrase?.en}
                </span>
              </div>
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

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );
  const router = useRouter();

  const repeatHistories = useRepeatHistoryStore((state: any) => state.history);

  console.log("YO", repeatHistories);

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
          <TabsList className="w-full px-4 md:px-32 my-4 md:my-8">
            <TabsTrigger value="default">
              <FontAwesomeIcon icon={faTable} className="text-xl" />
            </TabsTrigger>
            <TabsTrigger value="charts">
              <FontAwesomeIcon icon={faChartSimple} className="text-xl" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <div className="space-y-16">
              <div className="w-full px-4 md:px-32">
                <div className="flex justify-around">
                  <h2 className="flex flex-col-reverse items-center text-4xl md:text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                    <span>{unlockedNMMCharacters?.length} </span>
                    <span className="text-sm md:text-lg">
                      Characters Discovered{" "}
                    </span>
                  </h2>

                  <h2 className="flex flex-col-reverse items-center text-4xl md:text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                    <span>
                      {repeatHistories?.length}{" "}
                      <span className="text-md">loops </span>{" "}
                    </span>
                    <span className="text-sm md:text-lg">Listening</span>
                  </h2>

                  <h2 className="flex flex-col-reverse items-center text-4xl md:text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                    {/* <span>{accuracyPercentage} </span> */}
                    <span>
                      {allAnswers?.length}{" "}
                      <span className="text-md">loops </span>
                    </span>
                    <span className="text-sm md:text-lg">Writing</span>
                  </h2>

                  <h2 className="flex flex-col-reverse items-center text-4xl md:text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
                    {/* <span>97.8% </span> */}
                    <span>
                      942 <span className="text-md">loops </span>
                    </span>
                    <span className="text-sm md:text-lg">Speaking</span>
                  </h2>
                </div>
              </div>

              <div className="w-full px-4 md:px-32 my-4 md:my-8">
                <div className="my-8">
                  <div className="my-2 flex justify-start items-center text-2xl text-gray-700 flex-wrap">
                    {unlockedNMMCharacters?.map((char, idx: number) => {
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
                            currentLevel?.maxCharacterLevel >=
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
            </div>
          </TabsContent>
          <TabsContent value="charts">
            <div className="w-full px-4 md:px-32 my-4 md:my-8">
              <CharacterDiscoveryAreaChart />
            </div>
          </TabsContent>
        </Tabs>
      )}
    </main>
  );
}
