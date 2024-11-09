"use client";

import { InsightHeaders } from "@/app/(auth)/insights/insights-v2/insight-headers";
import { useInsightsState } from "@/app/(auth)/insights/use-insights-state";
import { useGetWeeklyData } from "@/app/(auth)/insights/WeeklyBarChart";
import {
  Bar,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryVoronoiContainer,
} from "victory";
import { TopEightLanguages } from "./top-eight-languages";
import { useGetInsightSearchResults } from "../precision-insight-view/use-get-insight-search-results";
import { PrecisionSearchResults } from "../precision-insight-view/precision-search-results";

export const OverviewInsightView = () => {
  const toDate = useInsightsState((state) => state.toDate);

  const { data } = useGetWeeklyData({ toDate });

  const chartData = data?.map((item) => {
    return {
      x: item.day,
      y: item.count,
    };
  });

  const searchResults = useGetInsightSearchResults();

  return (
    <div className="my-4 md:my-16">
      <h1 className="mb-12 text-2xl dark:text-gray-500 font-extralight text-center">
        Insights
      </h1>

      <InsightHeaders />

      {searchResults?.length > 0 ? (
        <PrecisionSearchResults searchResults={searchResults} />
      ) : (
        <section className="grid grid-cols-4 gap-4">
          <div className="mt-8 h-80 col-span-4 md:col-span-2">
            <VictoryChart
              // animate={{ duration: 400 }}
              // height={450}
              // width={400}
              // domainPadding={{ x: 50, y: [0, 20] }}
              scale={{ x: "time" }}
              containerComponent={
                <VictoryVoronoiContainer
                  style={{}}
                  labels={({ datum }) =>
                    datum.y > 0 ? `${datum.x} \n ${datum.y} words` : null
                  }
                />
              }
            >
              <VictoryLabel
                x={225}
                y={5}
                style={{
                  fill: "gray",
                }}
                textAnchor="middle"
                text="Number of words learned per day"
              />

              <VictoryAxis
                dependentAxis
                // label="Total # of Songs"
                // x={0}
                offsetX={40}
                // style={sharedAxisStyles}
              />

              <VictoryAxis
                style={{
                  tickLabels: { fill: "gray" },
                }}
              />

              <VictoryBar
                // dataComponent={<Bar events={{ onMouseOver: () => {} }} />}
                style={{
                  data: { fill: "tomato" },
                }}
                dataComponent={
                  <Bar
                    events={{
                      onClick: (event: any, ctx: any) => {
                        //   alert(event);
                      },
                    }}
                  />
                }
                data={chartData}
              />
            </VictoryChart>
          </div>

          <div className="h-32 col-span-4 md:col-span-2">
            <TopEightLanguages />
          </div>
        </section>
      )}
    </div>
  );
};
