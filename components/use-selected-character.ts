"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useMemo } from "react";

import * as R from "ramda";

import { usePathname, useSearchParams } from "next/navigation";

import { useListContentsQuery } from "@/domain/content/content.queries";

import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";

import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";

import { useAddHistoryMutation } from "@/domain/history/history.mutations";

import { useDeleteComponentMutation } from "@/domain/lesson/component.mutations";

import { SelectedCharacterProps } from "./_select-character/select-character.types";

import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useReadModeStore } from "@/stores/use-readmode-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useGetLangParams } from "@/hooks/use-get-lang-params";
import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

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

  const { data: contentItems, isLoading: isContentsLoading } =
    useListPublishedContentsQuery({});

  // MAJOR BUG IF NOT WRAPPED
  const contents = useMemo(() => contentItems?.items, [contentItems]);

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

  // const { data: components } = useListComponents({
  //   includeAll: true,
  // });

  const selectedComp = useMemo(
    () =>
      characters?.find(
        (component: any) =>
          (component?.hanzi || component?.item || component?.input) ===
          selectedChar
      ),
    [characters, selectedChar]
  );

  const { data: selectedComp2 } = useGetComponentQuery({
    hanzi: characterId || "",
  });

  const readMode = useReadModeStore((state) => state.readMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);

  // const [readMode, setReadMode] = useState(false);
  const searchParams = useSearchParams();
  const lang = useGetLangParams() || selectedComp?.lang;
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

  const firstLesson = selectedComp2;

  const toneLevel = (selectedComp || selectedComp2)?.tone_level;

  const color = calculateColor({
    ...(selectedComp || selectedComp2),
    tone: toneLevel,
  });

  const { data: sentences } = useListSentencesQuery({
    component: selectedChar,
    lang,
    contentLang,
  });

  const props = {
    uniqueAnswerIds,
    answerMap,
    allContents,
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
