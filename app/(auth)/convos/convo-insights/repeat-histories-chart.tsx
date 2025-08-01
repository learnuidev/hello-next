"use client";

import { groupBy } from "ramda";
import { FancyAreaChart } from "../../insights/insights-v3/components/fancy-area-chart";
import { useListRepeatHistory } from "./hooks/use-list-repeat-history";

export const RepeatHistoryChart = ({ contentId }: { contentId: string }) => {
  const history = useListRepeatHistory({ contentId });

  const groupByInputAndStartTime = groupBy(
    (item: any) => `${item?.input}_${item?.start}`
  );

  const groupedByInputAndStart = groupByInputAndStartTime(history);

  return (
    <section className="my-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
      <h3 className="text-center mb-12 text-2xl mt-8">Repeat History</h3>

      <FancyAreaChart
        title={"Total Repeats"}
        tooltipTitle="repeats"
        total={history?.length}
        data={Object.entries(groupedByInputAndStart).map((item) => {
          const hanzi = item?.[0]?.split("_")?.[0];

          return {
            value: item?.[1]?.length || 0,
            date: hanzi,
          };
        })}
      />
    </section>
  );
};
