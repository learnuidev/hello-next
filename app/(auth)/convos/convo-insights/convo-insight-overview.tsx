"use client";

import { InsightItem } from "@/app/(auth)/insights/insights-v2/components/insight-item";
import {
  secondsToTimestamp,
  secondsToTimestampV2,
} from "@/app/profile/utils/seconds-to-timestamp";
import { useListRepeatHistory } from "./hooks/use-list-repeat-history";
import { usePlayHistoryState } from "@/components/youtube-page/hooks/use-play-history-state";
import { groupBy } from "ramda";

export const ConvoInsightOverview = ({ contentId }: { contentId: string }) => {
  const history = useListRepeatHistory({ contentId });

  const totalTimeReviewed = secondsToTimestampV2(
    history
      .map((item: any) => (item.end - item.start) * 1000)
      .reduce((acc: any, curr: any) => acc + curr, 0)
  );

  const { history: playedHistory } = usePlayHistoryState({ contentId });

  const groupbyContextId = groupBy((item: any) => item?.contextId);

  const groupedByContextId = groupbyContextId(playedHistory);

  const _totalTimePlayed = Object.values(groupedByContextId)
    .map((histories) => {
      const progressTimes =
        histories?.map((history) => history?.progressTime) || [];

      const minProgressTime = Math.min(...progressTimes);
      const maxProgessTime = Math.max(...progressTimes);

      return (maxProgessTime - minProgressTime) * 1000;
    })
    .reduce((acc, curr) => acc + curr, 0);

  const totalTimePlayed = secondsToTimestampV2(_totalTimePlayed);

  const insightsList = [
    {
      id: "total",
      stat: totalTimePlayed,
      title: "Total Minutes Played",
    },
    {
      id: "total",
      stat: totalTimeReviewed,
      title: "Total Minutes Repeated",
    },
    { id: "correct", stat: history?.length || 0, title: "Total Repeats" },
  ];

  return (
    <section className="grid grid-cols-3 gap-4 mt-8 md:mt-0 md:mb-16 justify-center items-center">
      {insightsList.map((item) => (
        <InsightItem
          // href={`/insights?view=${view}&filter=${item?.id}`}
          key={item.id}
          id={item.id}
          stat={item.stat}
          title={item.title}
        />
      ))}
    </section>
  );
};
