"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

export function useUniqueAnswers(selectedId: string) {
  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.hanzi?.includes(selectedId);
  }) as {
    hanzi: string;
    journeyId: string;
    phraseId: string;
  }[];

  const answerMap = R.indexBy(R.prop("hanzi"), relevantAnswers) as Record<
    string,
    { hanzi: string; journeyId: string; phraseId: string }
  >;

  const uniqueAnswerIds = [
    // @ts-ignore
    ...new Set(relevantAnswers?.map((answer: any) => answer?.hanzi)),
  ];

  return {
    data: uniqueAnswerIds?.map((answerId: any, idx: number) => {
      const char = answerMap?.[answerId] || {};
      return char;
    }),
  };
}
