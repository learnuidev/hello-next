// import Image from 'next/image'
"use client";

import { NavBar } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { InsightsFilters } from "./InsightsFilters";

import { InsightsOverview } from "@/app/insights-overview/insights-overview";
import { useSearchQueryStore } from "@/components/search/state";
import { formatDate } from "@/components/settings-dialog/utils/format-date";
// import { CharacterLearnedOvertimeChart } from "./charts/character-mastered-overtime-area-chart";
import { CharacterLearnedOvertimeChart } from "./charts/character-learned-overtime-area-chart";
import { CharacterMasteredOvertimeChart } from "./charts/character-mastered-overtime-area-chart";
import { InsightsV2 } from "./insights-v2/insights-v2";
import { SearchResults } from "./insights-v2/precision-insight-view/search-results";
import { useGetInsightSearchResults } from "./insights-v2/precision-insight-view/use-get-insight-search-results";
import { CharacterDiscoveryAreaChartV2 } from "./insights-v3/character-discover-area-chart-v2";
import { useGetFromAndToDate } from "./use-get-from-date";

function ToAndFromDate() {
  const { fromDate, toDate } = useGetFromAndToDate();

  return `${formatDate(Date.parse(fromDate?.toISOString()))} - ${formatDate(Date.parse(toDate?.toISOString()))}`;
}

export default function InsightsNew() {
  return (
    <div>
      <Tabs defaultValue="overview" className="p-0 mb-16">
        <div className="my-4 flex justify-between items-center md:mx-8">
          <TabsList className="space-x-8 dark:bg-black bg-white">
            <TabsTrigger
              value="overview"
              className="px-0 dark:data-[state=active]:text-white data-[state=active]:text-black"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="characters"
              className="px-0 dark:data-[state=active]:text-white data-[state=active]:text-black"
            >
              Characters
            </TabsTrigger>
          </TabsList>

          {/* <div className="space-x-4"></div> */}
          <div className="mx-4 md:mx-20 space-x-8 flex items-center">
            <div className="dark:text-gray-500 font-extralight hidden sm:block">
              <ToAndFromDate />
            </div>

            <InsightsFilters />
          </div>
        </div>

        <TabsContent value="overview" className="sm:mx-8 flex gap-4 flex-col">
          {/* <TimelineTabBody variant="all" /> */}

          <InsightsOverview
            hideSearch
            profileClassName="md:mt-8 lg:mt-12"
            className="mt-8 mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            <CharacterLearnedOvertimeChart />
            <CharacterMasteredOvertimeChart />
          </div>
        </TabsContent>
        <TabsContent value="characters" className="sm:mx-8 flex gap-4 flex-col">
          <CharacterDiscoveryAreaChartV2 />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Insights() {
  const { fromDate, toDate } = useGetFromAndToDate();

  const searchResults = useGetInsightSearchResults();
  const querySync = useSearchQueryStore((state) => state.query2);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <NavBar />

        <div className="mx-4 md:mx-20 space-x-8 flex items-center">
          <div className="text-gray-500 font-extralight hidden sm:block">
            <ToAndFromDate />
          </div>

          <InsightsFilters />
        </div>
      </div>

      <main className="mx-4 md:mx-48">
        <div className="text-gray-500 font-extralight sm:hidden block text-center">
          <ToAndFromDate />
        </div>

        {querySync?.length > 0 ? (
          <SearchResults searchResults={searchResults} />
        ) : (
          <InsightsV2 />
        )}
      </main>
    </div>
  );
}
