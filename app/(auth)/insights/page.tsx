// import Image from 'next/image'
"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { NavBar } from "@/components/navbar";

import { useRepeatHistoryStore } from "../convos/_play/use-repeat-history";

import { useSelectedCharacter } from "../convos/use-selected-character";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { SelectedCharacter } from "@/components/selected-character";
import { useListParseQuery } from "@/domain/nmm/nmm.queries";

import { CharacterDiscoveryBarChart } from "./CharacterDiscoveryBarChart";
import { CharacterLearnedBarChart } from "./CharacterLearnedBarChart";
import { InsightsFilters } from "./InsightsFilters";
import { InsightsHeader } from "./InsightsHeader";
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

  return <InsightsV2 />;

  return (
    <main className="">
      <NavBar />
      <div className="w-full grid gap-4 px-4 md:px-12 my-4 md:my-12">
        <InsightsFilters />
        <InsightsHeader />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <Card className="col-span-4 dark:border-gray-600">
            <CardHeader>
              <CardTitle>Characters Learned</CardTitle>
              <CardDescription>
                You learned 42 characters this week.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {/* <Overview /> */}
              <CharacterDiscoveryBarChart />
              {/* <div>TODO</div> */}
            </CardContent>
          </Card>
          <Card className="col-span-4 dark:border-gray-600">
            <CardHeader>
              <CardTitle>Characters Discovered</CardTitle>
              <CardDescription>
                You discovered 425 characters this week.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <RecentSales /> */}
              <CharacterLearnedBarChart />
              {/* <div> TODO</div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
