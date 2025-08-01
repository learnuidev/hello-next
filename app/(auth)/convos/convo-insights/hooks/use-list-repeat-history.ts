"use client";

import { groupBy } from "ramda";
import { useMemo } from "react";
import { FancyAreaChart } from "../../../insights/insights-v3/components/fancy-area-chart";
import { useRepeatHistoryStore } from "../../_play/use-repeat-history";

export const useListRepeatHistory = ({ contentId }: { contentId: string }) => {
  const repeatHistories = useRepeatHistoryStore((state: any) => state.history);

  return useMemo(() => {
    return repeatHistories?.filter(
      (item: any) => item?.contentId === contentId && !!item?.input
    );
  }, [contentId, repeatHistories]);
};
