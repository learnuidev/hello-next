"use client";

import { groupBy } from "ramda";
import { useMemo } from "react";
import { FancyAreaChart } from "../../insights/insights-v3/components/fancy-area-chart";
import { useRepeatHistoryStore } from "../_play/use-repeat-history";

const useListRepeatHistory = ({ contentId }: { contentId: string }) => {
  const repeatHistories = useRepeatHistoryStore((state: any) => state.history);

  console.log("repeat history", repeatHistories);

  return useMemo(() => {
    return repeatHistories?.filter(
      (item: any) => item?.contentId === contentId
    );
  }, [contentId, repeatHistories]);
};

export const RepeatHistoryChart = ({ contentId }: { contentId: string }) => {
  const history = useListRepeatHistory({ contentId });

  const groupByInputAndStartTime = groupBy(
    (item: any) => `${item?.input}_${item?.start}`
  );

  const groupedByInputAndStart = groupByInputAndStartTime(history);

  console.log("grouped", groupedByInputAndStart);

  return (
    <section className="my-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
      <h3 className="text-center mb-12 text-2xl mt-8">Repeat History</h3>

      {/* <code>
            <pre>
              {JSON.stringify(groupByInputAndStartTime(history), null, 4)}
            </pre>
          </code> */}

      <FancyAreaChart
        title={"Total Repeats"}
        tooltipTitle="repeats"
        total={history?.length}
        data={Object.entries(groupedByInputAndStart).map((item) => {
          const hanzi = item?.[0]?.split("_")?.[0];

          // const dict = context?.find(
          //   (val) => val?.input === hanzi || val?.hanzi === hanzi
          // );

          return {
            value: item?.[1]?.length || 0,
            date: hanzi,
          };
        })}
      />
    </section>
  );
};
