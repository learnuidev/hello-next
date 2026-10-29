"use client";

import { useGetReviewCharacter } from "@/domain/lesson/review-character.queries";
import { useGetReviewParams } from "./use-get-review-params";

/**
 * The character to review, and how many are left after it.
 *
 * Which character comes next is the API's decision — it is the only side that
 * knows every character the user has studied, which of them is due, and what
 * the review is of — so nothing is selected here. The browser only says what
 * the URL asks for and how far along the page is.
 */
export const useGetCurrentReviewCharacter = () => {
  const { date, level, input, entryId, reviewMode, mode, lang, character } =
    useGetReviewParams();

  const { data, isPending, isFetching } = useGetReviewCharacter({
    contentId: mode,
    mode,
    date,
    input,
    entryId,
    level,
    reviewMode,
    lang,
    character: character || "",
    tzOffset: new Date().getTimezoneOffset(),
  });

  const currentCharacter: any = data?.character || null;
  const currentComponent: any = data?.component || null;
  const remainingItems = data?.remainingCharacters;

  console.log("DATA", data);

  // The next character arrives with the answer's refetch; there is no list here
  // to walk to it, and nothing to navigate to.
  const goToNextChar = () => {};

  return {
    currentCharacter,
    currentComponent,
    goToNextChar,
    isContent: Boolean(data?.isContent),
    isEntry: Boolean(data?.isEntry),
    hasNoChars: remainingItems === 0,
    lang: data?.lang || currentComponent?.lang,
    remainingItems,
    isLoading: isPending,
    isRefetching: isFetching && !isPending,
  };
};
