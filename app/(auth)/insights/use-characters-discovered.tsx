"use client";

import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { useListParseQuery } from "@/domain/nmm/nmm.queries";

export function useCharactersDiscovered() {
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
