// import Image from 'next/image'
"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { NavBar } from "@/components/navbar";

import { useRepeatHistoryStore } from "../convos/_play/use-repeat-history";

import { useSelectedCharacter } from "../convos/use-selected-character";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { useListParseQuery } from "@/domain/nmm/nmm.queries";

import { InsightsFilters } from "./InsightsFilters";

import { useCharactersDiscovered } from "./use-characters-discovered";
import { InsightsV2 } from "./_v2/insights-v2";

export default function Insights() {
  const { data: charactersDiscovered } = useCharactersDiscovered();

  const { data: learnedCharacters } = useListCharactersQuery();

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const repeatHistories = useRepeatHistoryStore((state: any) => state.history);

  const { data: allAnswers, isLoading } = useListAnswersQuery();

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
    ...(allAnswers || [])
      ?.map((answer: { hanzi: string }) => answer?.hanzi)
      ?.join(""),
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

  const { data: unlockedNMMCharacters } =
    useListParseQuery({
      content: uniqueWordsStr,
    }) || [];

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
        (char: any) => char?.hanzi === a?.hanzi
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

  if (isLoading) {
    return <div> is loading ...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <NavBar />
        <div className="mx-4 md:mx-20">
          <InsightsFilters />
        </div>
      </div>

      <main className="mx-4 md:mx-48">
        <InsightsV2 />
      </main>
    </div>
  );
}
