"use client";

import { groupBy } from "ramda";
import { useMemo } from "react";
import { FancyAreaChart } from "../../../insights/insights-v3/components/fancy-area-chart";
import { useRepeatHistoryStore } from "../../_play/use-repeat-history";

const createdAtFormatter = (item: any) =>
  parseInt(`${item?.createdAt}`?.slice(0, -3));

export const useListRepeatHistory = ({ contentId }: { contentId: string }) => {
  const repeatHistories = useRepeatHistoryStore((state: any) => state.history);

  const totalRepeatHistories = useMemo(() => {
    return repeatHistories?.filter(
      (item: any) => item?.contentId === contentId && !!item?.input
    );
  }, [contentId, repeatHistories]);

  const uniquetimeStamps = useMemo(
    () => [
      ...new Set(
        totalRepeatHistories?.map((item: any) => createdAtFormatter(item))
      ),
    ],
    [totalRepeatHistories]
  );

  return useMemo(() => {
    return uniquetimeStamps.map((timeStamp) => {
      const historyItem = totalRepeatHistories?.find((item: any) => {
        return createdAtFormatter(item) === timeStamp;
      });

      return historyItem;
    });
  }, [totalRepeatHistories, uniquetimeStamps]);
};
