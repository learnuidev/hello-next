"use client";

import { useMemo, useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { usePathname, useSearchParams } from "next/navigation";

import { useListContentsQuery } from "@/domain/content/content.queries";

import { useListComponents } from "@/domain/lesson/component.queries";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";

import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";

import { useAddHistoryMutation } from "@/domain/history/history.mutations";

import { useDeleteComponentMutation } from "@/domain/lesson/component.mutations";

import { SelectedCharacterProps } from "./_select-character/select-character.types";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useReadModeStore } from "@/stores/use-readmode-store";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";

function useGetCharacter({ characterId }: { characterId: string }) {
  const { data: characters } = useListCharactersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const selectedComp = useMemo(
    () =>
      characters?.find(
        (component: any) =>
          (component?.hanzi || component?.item || component?.input) ===
          characterId
      ),
    [characters, characterId]
  );

  return selectedComp;
}

export const useViewTypeStore = create(
  persist(
    (set: any, get: any) => ({
      view: "home",
      views: {},
      setViews: (charId: string, view: any) =>
        set({ views: { ...get().views, [charId]: view } }),
      setView: (view: any) => set({ view }),
    }),
    {
      name: "component-tabs-store", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export function useSelectedCharacterData({
  characterId,
}: {
  characterId: string;
}) {
  // const view = useViewTypeStore((state) => state.view);
  const views = useViewTypeStore((state: any) => state.views) as any;
  const view = views?.[characterId] || "home";
  const setViews = useViewTypeStore((state) => state.setViews);
  const setView = (view: any) => {
    return setViews(characterId, view);
  };
  // const [view, setView] = useState("home");
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

  const readMode = useReadModeStore((state) => state.readMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);

  // const [readMode, setReadMode] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || selectedComp?.lang;
  const contentLang = searchParams.get("content") || "";

  const isAlreadyLearned = useMemo(
    () =>
      characters?.find((character) => {
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
    contentLang,
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
