"use client";

import "@/libs/cognito/init";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { useRecentlyWatchedContent } from "../../use-recently-watched-content-store";
import { useGetContentId } from "./use-get-content-id";
import { useListPublishedContentsQuery } from "./use-list-published-contents-query";
import { useGetContentQuery } from "@/domain/content/content.queries";
import {
  useGetContentInsightsRaw,
  useUpsertContentAnalyticsMutation,
} from "../../convo-insights/hooks/use-content-insights";
import { useWordsClickedHistoryState } from "@/components/youtube-page/hooks/use-words-clicked-history-state";
import { useFocusMode } from "../../play-v3/hooks/use-focus-mode";
import { useFocusIndex } from "../../play-v3/hooks/use-focus-index";

export function useGo() {
  const contentId = useGetContentId();

  const { data: content } = useGetContentQuery({ contentId });

  const {
    totalPlays,
    totalRepeats,
    totalTimePlayed,
    data: insightsData,
  } = useGetContentInsightsRaw({ contentId });

  const { words } = useWordsClickedHistoryState({ contentId });

  const { focusMode, setFocusMode } = useFocusMode(contentId);
  const { focusIndex, setFocusIndex } = useFocusIndex(contentId);

  const updateContentInsightsMutation = useUpsertContentAnalyticsMutation({
    contentId,
  });

  const router = useRouter();

  const { data } = useListPublishedContentsQuery({});

  const sameLangContents = useMemo(() => {
    return data?.items?.filter(
      (contentItem: any) => contentItem?.lang === content?.lang
    );
  }, [content?.lang, data?.items]);

  const { setRecentlyWatched } = useRecentlyWatchedContent();

  const currentIndex = sameLangContents?.findIndex(
    (item: any) => item?.id === contentId
  );

  const goToNext = useCallback(() => {
    updateContentInsightsMutation.mutateAsync({
      totalPlays,
      totalRepeats,
      totalTimePlayed,
      data: insightsData,
      focusMode,
      focusIndex,
      words,
    });
    const nextLesson = sameLangContents?.[currentIndex + 1];
    if (nextLesson) {
      setRecentlyWatched(nextLesson);

      router.push(`/convos/${nextLesson.id}`);
    } else {
      const nextLesson = sameLangContents?.[0];
      setRecentlyWatched(nextLesson);

      router.push(`/convos/${nextLesson.id}`);
    }
  }, [
    currentIndex,
    focusIndex,
    focusMode,
    insightsData,
    router,
    sameLangContents,
    setRecentlyWatched,
    totalPlays,
    totalRepeats,
    totalTimePlayed,
    updateContentInsightsMutation,
    words,
  ]);

  const goToBefore = useCallback(() => {
    updateContentInsightsMutation.mutateAsync({
      totalPlays,
      focusMode,
      focusIndex,
      totalRepeats,
      totalTimePlayed,
      data: insightsData,
      words,
    });
    const previousLesson = sameLangContents?.[currentIndex - 1];
    if (previousLesson) {
      setRecentlyWatched(previousLesson);
      router.push(`/convos/${previousLesson.id}`);
    } else {
      const previousLesson = sameLangContents?.[sameLangContents?.length - 1];
      setRecentlyWatched(previousLesson);
      router.push(`/convos/${previousLesson.id}`);
    }
  }, [
    currentIndex,
    focusIndex,
    focusMode,
    insightsData,
    router,
    sameLangContents,
    setRecentlyWatched,
    totalPlays,
    totalRepeats,
    totalTimePlayed,
    updateContentInsightsMutation,
    words,
  ]);

  return {
    goToBefore,
    goToNext,
  };
}
