"use client";

import { InsightItem } from "@/app/(auth)/insights/insights-v2/components/insight-item";
import { useGetContentInsights } from "./hooks/use-content-insights";

export const ConvoInsightOverview = ({ contentId }: { contentId: string }) => {
  const { totalRepeats, totalTimePlayed } = useGetContentInsights({
    contentId,
  });

  const insightsList = [
    {
      id: "total-time-played",
      stat: totalTimePlayed,
      title: "Total Minutes Played",
    },

    { id: "total-repeats", stat: totalRepeats, title: "Total Repeats" },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 mt-8 md:mt-0 md:mb-16 justify-center items-center">
      {insightsList.map((item) => (
        <InsightItem
          key={item.id}
          id={item.id}
          stat={item.stat}
          title={item.title}
        />
      ))}
    </section>
  );
};
