// import Image from 'next/image'
"use client";

import { Editor } from "@/components/Editor";
import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { Link } from "@/components/link";
import { SearchPage } from "@/components/search";
import { NavigatorMap } from "@/components/navigator-map";
import { parse } from "@/data/utils";
import { faX } from "@fortawesome/sharp-solid-svg-icons";

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
          className="text-xl"
          onClick={() => {
            setSelectedChar("");
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <div className="my-8">
        {/* <h2>nmm</h2> */}
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {relevantAnswers?.map((char: any, idx: number) => {
            return (
              <div
                role="button"
                // onClick={() => {
                //   setSelectedChar(char);
                // }}
                className="p-2"
                key={`${idx}-${char?.hanzi}-${idx}`}
              >
                {" "}
                {char?.hanzi}
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
  // ?.join(" ");

  const allWords = [
    // @ts-ignore
    ...allAnswers?.map((answer: { hanzi: string }) => answer?.hanzi)?.join(""),
  ]
    .join("")
    ?.toLocaleLowerCase()
    ?.split("")
    ?.filter((x: string) => !["c", "i", "n", "d", "y"]?.includes(x));
  // ?.join(" ");

  const uniqueWordsStr = uniqueWords?.join(" ");

  const unlockedNMMCharacters = parse(uniqueWordsStr)?.sort(
    (a, b) => a?.hmmCharacterLevel - b?.hmmCharacterLevel
  );

  console.log({ unlockedNMMCharacters });

  // const unlockedNMMCharacters = parsed?.map((x) => x.hanzi);
  const unlockedCharactersHMM = unlockedNMMCharacters?.map((x) => x.hanzi);
  const unlockedCharactersHMMStr = unlockedCharactersHMM?.join(" ");

  // console.log("ALL WORDS", allWords);

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

          {/* <div className="my-8">
          <h2>frequency</h2>
          <div className="my-2 flex justify-between items-center text-2xl text-gray-700">
            {unlockedCharactersNMMStr}
          </div>
        </div> */}
          <div className="my-8">
            {/* <h2>nmm</h2> */}
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
