"use client";

import { InsightHeaders } from "@/app/(auth)/insights/insights-v2/insight-headers";
import { useInsightsState } from "@/app/(auth)/insights/use-insights-state";
import { PrecisionSearchResults } from "../precision-insight-view/precision-search-results";
import { useGetInsightSearchResults } from "../precision-insight-view/use-get-insight-search-results";
import { WeeklyLearnedCharactersChart } from "./weekly-learned-characters-chart";
import { TopEightLanguages } from "./top-eight-languages";
import { WeeklyReviewedCharactersChart } from "./weekly-reviewed-characters-chart";
import { TopTenRecentlyReviewedComponents } from "../precision-insight-view/top-ten-recently-reviewed-components";
import { TopTenRecentlyLearnedComponents } from "../precision-insight-view/top-ten-recently-learned-components";

export const OverviewInsightView = () => {
  const toDate = useInsightsState((state) => state.toDate);

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
        <div className="flex flex-col space-y-24">
          <section className="grid grid-cols-4 gap-4 items-start">
            <div className="mt-8 col-span-4 md:col-span-2">
              <WeeklyLearnedCharactersChart />
            </div>

            <div className="mt-8 col-span-4 md:col-span-2">
              {/* <TopEightLanguages /> */}
              <TopTenRecentlyLearnedComponents />
            </div>
          </section>

          <section className="grid grid-cols-4 gap-4 h-auto">
            <div className="mt-8 col-span-4 md:col-span-2">
              <WeeklyReviewedCharactersChart />
              {/* <WeeklyLearnedCharactersChart /> */}
            </div>

            <div className="mt-8 col-span-4 md:col-span-2">
              <TopTenRecentlyReviewedComponents />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
