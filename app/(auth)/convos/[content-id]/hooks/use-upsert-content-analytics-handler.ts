"use client";

import "@/libs/cognito/init";

import { useCallback } from "react";

import { useWordsClickedHistoryState } from "@/components/youtube-page/hooks/use-words-clicked-history-state";
import {
  useGetContentInsightsRaw,
  useUpsertContentAnalyticsMutation,
} from "../../convo-insights/hooks/use-content-insights";

export function useUpsetContentAnalyticsHandler(contentId: string) {
  const {
    totalPlays,
    totalRepeats,
    totalTimePlayed,
    data: insightsData,
  } = useGetContentInsightsRaw({ contentId });

  const { words } = useWordsClickedHistoryState({ contentId });

  const updateContentInsightsMutation = useUpsertContentAnalyticsMutation({
    contentId,
  });

  const upsertContentAnalyticsHandler = useCallback(() => {
    updateContentInsightsMutation.mutateAsync({
      totalPlays,
      totalRepeats,
      totalTimePlayed,
      data: insightsData,
      words,
    });
  }, [
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
