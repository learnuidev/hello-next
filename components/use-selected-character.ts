"use client";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useMemo } from "react";

import * as R from "ramda";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";

import { useListCharactersMapQuery } from "@/domain/lesson/character.queries";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";

import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";

import { useAddHistoryMutation } from "@/domain/history/history.mutations";

import { SelectedCharacterProps } from "./_select-character/select-character.types";

import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";
import { listUniqueCharaters } from "@/app/(auth)/convos/use-get-unique-characters-by-content-id";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useGetLangParams } from "@/hooks/use-get-lang-params";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import { useReadModeStore } from "@/stores/use-readmode-store";

export function useSelectedCharacterData({
  characterId,
}: {
  characterId: string;
}) {
  const searchParams = useSearchParams();

  const view = searchParams.get("view") || "overview";
  const contentId = searchParams.get("contentId") || "";

  const router = useRouter();

  const setView = (view: string) => {
    router.push(getNmmLink({ id: characterId, lang, view, contentId }));
  };

  // const [view, setView] = useState("home");
  const routeName = usePathname();

  const { data } = useGetComponentQuery({
    hanzi: characterId,
  });

  const addHistoryMutation = useAddHistoryMutation();

  const addCharacterMutation = useAddCharacterMutation();

  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const { data: contentItems } = useListPublishedContentsQuery({});

  // MAJOR BUG IF NOT WRAPPED
  const contents = useMemo(() => contentItems?.items, [contentItems]);

  const allContents = useMemo(
    () => contents?.map((content: any) => content?.transcriptions)?.flat(),
    [contents],
  );

  const selectedChar = characterId;

  const relevantAnswers = useMemo(
    () =>
      allAnswers?.filter((answer: any) => {
        if (answer?.phraseId) {
          return answer?.phraseId?.includes(selectedChar);
        }
      }),
    [allAnswers, selectedChar],
  );

  const answerMap = useMemo(
    () => R.indexBy(R.prop("hanzi"), relevantAnswers),
    [relevantAnswers],
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
    [relevantAnswers],
  );

  const langParam = useGetLangParams();

  const hanzis = listUniqueCharaters({
    text: characterId,
    lang: langParam || data?.lang,
  });

  const { data: characters } = useListCharactersMapQuery(
    {
      from: "use-selected-character",
      hanzis,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  // const { data: components } = useListComponents({
  //   includeAll: true,
  // });

  const selectedComp = useMemo(
    () => characters?.[selectedChar],
    [characters, selectedChar],
  );

  const { data: selectedComp2 } = useGetComponentQuery({
    hanzi: characterId || "",
  });

  const readMode = useReadModeStore((state) => state.readMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);

  const lang = (useGetLangParams() || selectedComp?.lang)?.split("-")?.[0];
  const contentLang = searchParams.get("content") || "";

  const isAlreadyLearned = useMemo(
    () => characters?.[selectedChar],
    [characters, selectedChar],
  );

  const discoverMutation = useDiscoverMutation();

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
    color,
    addHistoryMutation,
    view,
  } as SelectedCharacterProps;

  return {
    isLoading: isLoading,
    data: props,
  };
}
