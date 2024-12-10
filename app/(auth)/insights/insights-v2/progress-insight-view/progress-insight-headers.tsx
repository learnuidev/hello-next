"use client";

import { InsightItem } from "@/app/(auth)/insights/insights-v2/components/insight-item";
import { useGetFailureRate } from "@/app/(auth)/insights/insights-v2/use-get-failure-rate";
import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useListCorrect } from "@/app/(auth)/insights/insights-v2/use-list-correct";
import { useListErrors } from "@/app/(auth)/insights/insights-v2/use-list-errors";
import { useGetInsightParams } from "@/app/(auth)/insights/insights-v2/use-get-insight-params";
import { useGetProgress } from "../use-get-progress";
import { useGetUserPreferenceQuery } from "@/domain/user/use-get-user-preference-query";

export const ProgressInsightHeaders = () => {
  const totalErrors = useListErrors();
  const totalAttempts = useListAttempts();
  const totalCorrect = useListCorrect();
  const failureRate = useGetFailureRate();

  const progress = useGetProgress();

  const { filter, view } = useGetInsightParams();

  const { data: userPreference } = useGetUserPreferenceQuery();

  const version = userPreference?.learningMode === "hsk3" ? 3 : 2;

  const insightsList = [
    {
      id: "total",
      stat: totalAttempts?.filter((item) => item?.totalAttempts)?.length || 0,
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
    <div className="space-y-8">
      {version === 3 ? (
        <section className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-8 md:mt-0 md:mb-16 justify-center items-center">
          {progress?.hskV3.map((item) => (
            <InsightItem
              href={`/insights?view=${view}&filter=${item?.id}`}
              key={item.id}
              id={item.id}
              stat={item.stat}
              title={item.title}
            />
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-8 md:mt-0 md:mb-16 justify-center items-center">
          {progress?.hskV2.map((item) => (
            <InsightItem
              href={`/insights?view=${view}&filter=${item?.id}`}
              key={item.id}
              id={item.id}
              stat={item.stat}
              title={item.title}
            />
          ))}
        </section>
      )}
    </div>
  );
};
