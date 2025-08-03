"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRepeatHistoryStore } from "../convos/_play/use-repeat-history";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { useListParseQuery } from "@/domain/nmm/nmm.queries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faMapLocation,
  faMusic,
  faPenLine,
} from "@fortawesome/pro-thin-svg-icons";
import { useCharactersDiscovered } from "./use-characters-discovered";
import { formatPercentage } from "@/app/insights-overview/utils/format-percentage";

export function InsightsHeader() {
  const { data: charactersDiscovered } = useCharactersDiscovered();

  const { data: learnedCharacters } = useListCharactersQuery();

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
    ?.concat((learnedCharacters || [])?.map((x: any) => x?.hanzi)?.join(" "));

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

  const correctAnswers = allAnswers?.filter(
    (answer: any) => answer?.status === "correct"
  );

  const accuracyPercentage = formatPercentage(
    correctAnswers?.length / allAnswers?.length
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="dark:border-gray-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Listening</CardTitle>

          <FontAwesomeIcon icon={faMusic} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            1577{" "}
            <span className="text-xs">+{repeatHistories?.length || 0}</span>
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
            433 <span className="text-xs">+{repeatHistories?.length || 0}</span>
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
            <span className="text-xs">+{repeatHistories?.length || 0}</span>
          </div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
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
            {learnedCharacters?.filter(
              (item: { hanzi: string }) => item?.hanzi?.length === 1
            ).length || 0}{" "}
            <span className="text-xs">+12</span>
          </div>

          <p className="text-xs text-muted-foreground">+201 since last week</p>
        </CardContent>
      </Card>
    </div>
  );
}
