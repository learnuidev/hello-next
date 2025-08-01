"use client";

import { usePlayHistoryState } from "@/components/youtube-page/hooks/use-play-history-state";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { groupBy } from "ramda";
import { useMemo } from "react";
import { FancyAreaChart } from "../../insights/insights-v3/components/fancy-area-chart";
import { useGetContentInsights } from "./hooks/use-content-insights";

export const TotalPlaysChart = ({ contentId }: { contentId: string }) => {
  const { data, totalRepeats, totalTimePlayed } = useGetContentInsights({
    contentId,
  });

  return (
    <section className="my-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
      <h3 className="text-center mb-12 text-2xl mt-8">Repeat History</h3>

      <FancyAreaChart hideXAxis={false} tooltipTitle={"repeats"} data={data}>
        <div></div>
        {/* <div className="mb-12 flex gap-8 items-center flex-row">
          <div>
            <span className="text-lg dark:text-gray-400">
              Total Minutes Played
            </span>
            <h2 className="font-mono dark:text-white space-x-4">
              <span className="text-3xl "> {totalTimePlayed}</span>
            </h2>
          </div>

          <div>
            <span className="text-lg dark:text-gray-400">Total Repeats</span>
            <h2 className="font-mono dark:text-white space-x-4">
              <span className="text-3xl ">{totalRepeats}</span>
            </h2>
          </div>
        </div> */}
      </FancyAreaChart>
    </section>
  );
};
