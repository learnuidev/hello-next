"use client";

import "@/libs/cognito/init";

import { useCallback } from "react";

import { useWordsClickedHistoryState } from "@/components/youtube-page/hooks/use-words-clicked-history-state";
import {
  useGetContentInsightsRaw,
  useUpsertContentAnalyticsMutation,
} from "../../convo-insights/hooks/use-content-insights";
import { useFocusMode } from "../../play-v3/hooks/use-focus-mode";
import { useFocusIndex } from "../../play-v3/hooks/use-focus-index";

export function useUpsetContentAnalyticsHandler(contentId: string) {
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

  const upsertContentAnalyticsHandler = useCallback(() => {
    updateContentInsightsMutation.mutateAsync({
      totalPlays,
      focusMode,
      focusIndex,
      totalRepeats,
      totalTimePlayed,
      data: insightsData,
      words,
    });
  }, [
    focusIndex,
    focusMode,
    insightsData,
    totalPlays,
    totalRepeats,
    totalTimePlayed,
    updateContentInsightsMutation,
    words,
  ]);

  return {
    upsertContentAnalyticsHandler,
  };
}
