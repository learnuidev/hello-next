"use client";

import { useGetReviewCharacter } from "@/domain/lesson/review-character.queries";
import { useGetReviewParams } from "./use-get-review-params";

/**
 * The character to review of the content the page is on, and how many are left
 * after it.
 *
 * A review of a content names it in `mode`; that is the id the API is asked
 * for. Which of the content's characters is due is the API's decision — the
 * browser cannot know it without holding every character the user has studied.
 */
export const useGetCurrentReviewCharacter = () => {
  const { mode, reviewMode } = useGetReviewParams();

  // A review that is not of a content — `?date=`, `?input=`, an HSK level —
  // names no content, so there is nothing to ask about here.
  const contentId = mode || "";

  const { data, isPending, isFetching } = useGetReviewCharacter({
    contentId,
    reviewMode,
  });

  const currentCharacter: any = data?.character || null;
  const currentComponent: any = null;
  const remainingItems = data?.remainingItems;
  const lang: any = data?.lang;

  // The next character arrives with the answer's refetch; there is no list here
  // to walk to it, and nothing to navigate to.
  const goToNextChar = () => {};

  return {
    currentCharacter,
    currentComponent,
    goToNextChar,
    isContent: Boolean(data?.contentId),
    hasNoChars: remainingItems === 0,
    lang,
    remainingItems,
    isLoading: isPending,
    isRefetching: isFetching && !isPending,
  };
};
