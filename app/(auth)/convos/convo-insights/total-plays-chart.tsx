"use client";

import { usePlayHistoryState } from "@/components/youtube-page/hooks/use-play-history-state";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { groupBy } from "ramda";
import { useMemo } from "react";
import { FancyAreaChart } from "../../insights/insights-v3/components/fancy-area-chart";
import { useGetContentInsights } from "./hooks/use-content-insights";

export const TotalPlaysChart = ({ contentId }: { contentId: string }) => {
  const props = useGetContentInsights({
    contentId,
  });

  const { data, totalRepeats, totalTimePlayed } = props;

  return (
    <section className="my-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
      <h3 className="text-center mb-12 text-2xl mt-8">Repeat History</h3>

      <FancyAreaChart hideXAxis={false} tooltipTitle={"repeats"} data={data}>
        <div></div>
      </FancyAreaChart>
    </section>
  );
};
