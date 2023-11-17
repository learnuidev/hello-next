// import Image from 'next/image'
"use client";

import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";

import { CharacterDiscoveryAreaChart } from "./CharacterDiscoveryAreaChart";
import { useRepeatHistoryStore } from "../convos/_play/use-repeat-history";

import { useSelectedCharacter } from "../convos/use-selected-character";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { calculateColor } from "@/app/nmm/utils";

import { SelectedCharacter } from "@/components/selected-character";
import { useListParseQuery } from "@/domain/nmm/nmm.queries";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faMapLocation,
  faMusic,
  faPenLine,
} from "@fortawesome/pro-thin-svg-icons";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { CharacterDiscoveryBarChart } from "./CharacterDiscoveryBarChart";
import { CharacterLearnedBarChart } from "./CharacterLearnedBarChart";

function useCharactersDiscovered() {
  const [isTocHidden, setIsTocHidden] = useState(false);
  // const [selectedChar, setSelectedChar] = useState("");

  const { data: learnedCharacters } = useListCharactersQuery();

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

  const uniqueWordsStr = uniqueWords
    ?.join(" ")
    ?.concat(learnedCharacters?.map((x: any) => x?.hanzi)?.join(" "));

  const { data: unlockedNMMCharacters, isLoading: isCharactersLoading } =
    useListParseQuery({
      content: uniqueWordsStr,
    }) || [];

  return {
    data: unlockedNMMCharacters,
    isLoading: isCharactersLoading,
  };
}

export default function Insights() {
  const { data: charactersDiscovered } = useCharactersDiscovered();

  const { data: learnedCharacters } = useListCharactersQuery();

  const { data: components } = useListComponentsQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

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

  if (isLoading) {
    return <div> is loading ...</div>;
  }

  return (
    <main className="">
      <NavBar />
      {selectedChar ? (
        <SelectedCharacter />
      ) : (
        <div className="w-full grid gap-4 px-4 md:px-12 my-4 md:my-12">
          <div className="flex items-center justify-between space-y-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight"> Insights</h1>

            <div className="space-x-4 dark:text-gray-400">
              <button className="dark:hover:text-gray-100">1w</button>
              <button className="dark:hover:text-gray-100">1m</button>
              <button className="dark:hover:text-gray-100">3m</button>
              <button className="dark:hover:text-gray-100">All</button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="dark:border-gray-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Listening</CardTitle>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg> */}
                <FontAwesomeIcon icon={faMusic} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  1577{" "}
                  <span className="text-xs">
                    +{repeatHistories?.length || 0}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="dark:border-gray-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Writing</CardTitle>

                <FontAwesomeIcon icon={faPenLine} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  433{" "}
                  <span className="text-xs">
                    +{repeatHistories?.length || 0}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="dark:border-gray-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Characters Discovered{" "}
                </CardTitle>
                <FontAwesomeIcon icon={faLightbulb} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {charactersDiscovered?.length}{" "}
                  <span className="text-xs">
                    +{repeatHistories?.length || 0}
                  </span>
                </div>
                {/* <div className="text-2xl font-bold">+12,234</div> */}
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card className="dark:border-gray-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Characters Learned
                </CardTitle>

                <FontAwesomeIcon icon={faMapLocation} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {learnedCharacters?.length || 0}{" "}
                  <span className="text-xs">+12</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  +201 since last week
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            <Card className="col-span-4 dark:border-gray-600">
              <CardHeader>
                <CardTitle>Chracters Learned</CardTitle>
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
      )}
    </main>
  );
}
