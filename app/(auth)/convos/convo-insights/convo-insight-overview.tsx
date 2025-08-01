"use client";

import { InsightItem } from "@/app/(auth)/insights/insights-v2/components/insight-item";
import { useGetFailureRate } from "@/app/(auth)/insights/insights-v2/use-get-failure-rate";
import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useListCorrect } from "@/app/(auth)/insights/insights-v2/use-list-correct";
import { useListErrors } from "@/app/(auth)/insights/insights-v2/use-list-errors";
import { useGetInsightParams } from "@/app/(auth)/insights/insights-v2/use-get-insight-params";
import { useListRepeatHistory } from "./hooks/use-list-repeat-history";
import { secondsToTimestamp } from "@/app/profile/utils/seconds-to-timestamp";

export const ConvoInsightOverview = ({ contentId }: { contentId: string }) => {
  const totalErrors = useListErrors();
  const totalAttempts = useListAttempts();
  const totalCorrect = useListCorrect();
  const failureRate = useGetFailureRate();

  const history = useListRepeatHistory({ contentId });

  console.log("HISTORY", history);

  const totalTimeReviewed = secondsToTimestamp(
    history
      .map((item: any) => (item.end - item.start) * 1000)
      .reduce((acc: any, curr: any) => acc + curr, 0)
  );

  const insightsList = [
    {
      id: "total",
      stat: totalTimeReviewed,
      title: "Total Minutes Played",
    },
    { id: "correct", stat: history?.length || 0, title: "Total Repeats" },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 mt-8 md:mt-0 md:mb-16 justify-center items-center">
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
