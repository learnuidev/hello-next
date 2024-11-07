"use client";

import { InsightItem } from "@/app/(auth)/insights/insights-v2/components/insight-item";
import { useGetFailureRate } from "@/app/(auth)/insights/insights-v2/use-get-failure-rate";
import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useListCorrect } from "@/app/(auth)/insights/insights-v2/use-list-correct";
import { useListErrors } from "@/app/(auth)/insights/insights-v2/use-list-errors";
import { useGetInsightParams } from "@/app/(auth)/insights/insights-v2/use-get-insight-params";

export const PrecisionInsightHeaders = () => {
  const totalErrors = useListErrors();
  const totalAttempts = useListAttempts();
  const totalCorrect = useListCorrect();
  const failureRate = useGetFailureRate();

  const { filter, view } = useGetInsightParams();

  const insightsList = [
    {
      id: "total",
      stat: totalAttempts?.length || 0,
      title: "Total Attempts",
    },
    { id: "correct", stat: totalCorrect?.length || 0, title: "Correct" },
    { id: "incorrect", stat: totalErrors?.length || 0, title: "Incorrect" },
    {
      id: "failure-rate",
      stat: failureRate,
      title: "Failure Rate",
    },
  ];

  return (
    <section className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-8 md:mt-0 md:mb-16 justify-center items-center">
      {insightsList.map((item) => (
        <InsightItem
          href={`/insights?view=${view}&filter=${item?.id}`}
          key={item.id}
          id={item.id}
          stat={item.stat}
          title={item.title}
        />
      ))}
    </section>
  );
};
