"use client";

import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { reviewCounterStore } from "./review-counter-store";
import { useGetReviewParams } from "./use-get-review-params";
import { useUnreviwedCharacters } from "./use-unreviewed-characters";

import { useGetCharacterAnalytics } from "@/components/_select-character/use-get-character-analytics";
import { getReviewSearchParams } from "@/components/settings-dialog/use-get-review-url";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSpeak } from "../(auth)/convos/_play/use-speak";
import { useIsContent } from "./use-is-content";
import { useIsEntry } from "./use-is-entry";

const getEndTimeAndDiff = (startTime: number, endTime: number) => {
  const diff = endTime - startTime;

  return {
    endTime,
    timeTaken: diff,
  };
};

const getPonderTime = (endTime: number) => {
  const ponderEndTime = Date.now();

  const { timeTaken: ponderTime } = getEndTimeAndDiff(endTime, ponderEndTime);

  return ponderTime;
};

export const useGetCurrentReviewCharacter = () => {
  const {
    date,
    level,
    input,
    entryId,
    reviewMode,
    mode: hskMode,
    lang: langParams,
    character: nextCharacter,
    reviewSpeed,
  } = useGetReviewParams();

  const router = useRouter();

  const { studyMode, character } = useGetReviewParams();

  const { mode: _mode } = useLearningMode();

  const mode = hskMode || _mode;

  const reviewCounts = reviewCounterStore((state: any) => state?.reviewCounts);

  const reviewCount = reviewCounts?.[date] || 0;

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });

  const group = groups?.find((group) => group?.title === date);

  const groupItems = useMemo(
    () =>
      group?.items
        // ?.filter((character: any) => character?.hanzi?.length === 1)
        ?.sort((a: any, b: any) => {
          return (
            (a?.reviewHistory?.length || 0) - (b?.reviewHistory?.length || 0)
          );
        })
        ?.filter((item: any) => {
          if (langParams) {
            return item?.lang === langParams;
          }

          return item?.hanzi?.length <= 3;

          return true;
        }),
    [group?.items, langParams],
  );

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents();

  const { uniqueComponentWords } = useGetCharacterAnalytics({
    characterId: input,
    lang: "zh",
  });

  const hasReviewedAll = useMemo(
    () =>
      input
        ? uniqueComponentWords?.length <= reviewCount
        : date
          ? groupItems?.length <= reviewCount
          : false,
    [
      date,
      groupItems?.length,
      input,
      reviewCount,
      uniqueComponentWords?.length,
    ],
  );

  const {
    data: unReviewedCharacters,
    isLoading: isUnreviewedCharactersLoading,
  } = useUnreviwedCharacters();

  const isContent = useIsContent(hskMode);
  const isEntry = useIsEntry(entryId);

  const currentCharacter = useMemo(
    () =>
      input
        ? unReviewedCharacters?.[reviewCount]
        : isEntry
          ? reviewMode === "all"
            ? unReviewedCharacters?.[reviewCount]
            : unReviewedCharacters?.[0]
          : isContent
            ? reviewMode === "all"
              ? unReviewedCharacters?.[reviewCount]
              : unReviewedCharacters?.[0]
            : date
              ? unReviewedCharacters?.[reviewCount]
              : reviewMode === "all"
                ? unReviewedCharacters?.[reviewCount]
                : unReviewedCharacters?.find(
                    (char: any) => char?.hanzi === nextCharacter,
                  ) ||
                  // allCharacters?.find((char: any) => char?.hanzi === nextCharacter) ||
                  unReviewedCharacters?.[0],
    [
      date,
      input,
      isContent,
      isEntry,
      nextCharacter,
      reviewCount,
      reviewMode,
      unReviewedCharacters,
    ],
  );

  const currentComponent = components?.find(
    (component: any) => component?.hanzi === currentCharacter?.hanzi,
  );

  const getUrl = () => {
    const reviewSearchParamsUrl = getReviewSearchParams({
      mode,
      level,
      studyMode,
      date,
      input,
      reviewSpeed,
      reviewMode,
    });
    // if (["hsk3", "hsk"]?.includes(mode)) {
    //   return `/review?mode=${mode}&level=${level}&study-mode=${studyMode}&date=${date}`;
    // }
    return `/review?${reviewSearchParamsUrl}`;

    // return `/review?date=${date}`;
  };

  const goToNextChar = () => {
    const currentCharacterIndex = unReviewedCharacters?.findIndex(
      (char: any) => char?.hanzi === character,
    );

    const nextChar = unReviewedCharacters?.[currentCharacterIndex + 1];

    if (nextChar?.hanzi) {
      const url = getUrl();

      if (url?.includes("&")) {
        return router.push(`${url}`);
      } else if (url?.includes("date") || url?.includes("input")) {
        router.push(url);
      } else {
        router.push("/review");
      }
    }
  };

  const remainingItems = useMemo(
    () =>
      input
        ? unReviewedCharacters?.length
        : date
          ? groupItems?.length - reviewCount
          : reviewMode === "all"
            ? unReviewedCharacters?.length - reviewCount
            : unReviewedCharacters?.length,
    [
      date,
      groupItems?.length,
      input,
      reviewCount,
      reviewMode,
      unReviewedCharacters?.length,
    ],
  );

  const hasNoChars = useMemo(
    () => !currentCharacter || hasReviewedAll,
    [currentCharacter, hasReviewedAll],
  );

  const lang = useMemo(
    () => currentCharacter?.lang || currentComponent?.lang,
    [currentCharacter?.lang, currentComponent?.lang],
  );

  return {
    currentCharacter,
    hasReviewedAll,
    currentComponent,
    goToNextChar,
    isContent,
    isEntry,
    hasNoChars,
    lang,

    remainingItems,
    isLoading:
      isLearnedCharactersLoading ||
      isComponentsLoading ||
      isUnreviewedCharactersLoading,
  };
};
