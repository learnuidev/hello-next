"use client";

import { useMemo, useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { usePathname, useSearchParams } from "next/navigation";

import { useListContentsQuery } from "@/domain/content/content.queries";

import { useListComponents } from "@/domain/lesson/component.queries";
import { calculateColor } from "@/app/nmm/utils";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";

import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";

import { useAddHistoryMutation } from "@/domain/history/history.mutations";

import { useDeleteComponentMutation } from "@/domain/lesson/component.mutations";

import { SelectedCharacterProps } from "./_select-character/select-character.types";

import { create } from "zustand";

export const useViewTypeStore = create((set: any, get: any) => ({
  view: "home",
  setView: (view: any) => set({ view }),
}));

export function useSelectedCharacterData({
  characterId,
}: {
  characterId: string;
}) {
  // const view = useViewTypeStore((state) => state.view);
  // const setView = useViewTypeStore((state) => state.setView);

  const [view, setView] = useState("home");
  const routeName = usePathname();

  const addHistoryMutation = useAddHistoryMutation();

  const addCharacterMutation = useAddCharacterMutation();

  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: contents, isLoading: isContentsLoading } =
    useListContentsQuery();

  const allContents = useMemo(
    () => contents?.map((content: any) => content?.transcriptions)?.flat(),
    [contents]
  );

  const selectedChar = characterId;

  const relevantAnswers = useMemo(
    () =>
      allAnswers?.filter((answer: any) => {
        if (answer?.phraseId) {
          return answer?.phraseId?.includes(selectedChar);
        }
      }),
    [allAnswers, selectedChar]
  );

  const answerMap = useMemo(
    () => R.indexBy(R.prop("hanzi"), relevantAnswers),
    [relevantAnswers]
  ) as Record<
    string,
    {
      hanzi: string;
      journeyId: string;
      phraseId: string;
      input?: string;
      explanation?: string;
    }
  >;

  const uniqueAnswerIds = useMemo(
    () => [
      // @ts-ignore
      ...new Set(relevantAnswers?.map((answer: any) => answer?.hanzi)),
    ],
    [relevantAnswers]
  );

  const { data: characters } = useListCharactersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: components } = useListComponents({
    includeAll: true,
  });

  const allSteps = useMemo(
    () =>
      components
        ?.map((component: any) => component?.steps)
        ?.filter(Boolean)
        ?.flat() || [],
    [components]
  );

  console.log();

  const selectedComp = useMemo(
    () =>
      characters?.find(
        (component: any) =>
          (component?.hanzi || component?.item || component?.input) ===
          selectedChar
      ),
    [characters, selectedChar]
  );

  const selectedComp2 = useMemo(
    () =>
      components?.find(
        (component: any) =>
          (component?.hanzi || component?.item || component?.input) ===
          selectedChar
      ),
    [components, selectedChar]
  );

  const [readMode, setReadMode] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || selectedComp?.lang;

  const isAlreadyLearned = useMemo(
    () =>
      characters?.find((character: { hanzi: string; input: string }) => {
        return (character?.hanzi || character?.input) === selectedChar;
      }),
    [characters, selectedChar]
  );

  const discoverMutation = useDiscoverMutation();
  const deleteComponentMutation = useDeleteComponentMutation();

  const firstLesson = useMemo(
    () =>
      components?.find(
        (component: any) =>
          (component?.hanzi || component?.item) === selectedChar
      ),
    [components, selectedChar]
  );

  const toneLevel = (selectedComp || selectedComp2)?.tone_level;

  const color = calculateColor({ tone: toneLevel });

  const { data: sentences } = useListSentencesQuery({
    component: selectedChar,
    lang,
  });

  const props = {
    uniqueAnswerIds,
    answerMap,
    allContents,
    allSteps,
    components,
    selectedComp,
    selectedChar,
    routeName,
    lang,
    sentences,
    characterId,
    selectedComp2,
    setReadMode,
    readMode,
    isAlreadyLearned,
    addCharacterMutation,
    setView,
    firstLesson,
    discoverMutation,
    deleteComponentMutation,
    color,
    addHistoryMutation,
    view,
  } as SelectedCharacterProps;

  return {
    isLoading: isLoading || isContentsLoading,
    data: props,
  };
}
