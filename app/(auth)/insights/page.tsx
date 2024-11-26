// import Image from 'next/image'
"use client";

import { NavBar } from "@/components/navbar";

import { InsightsFilters } from "./InsightsFilters";

import { InsightsV2 } from "./insights-v2/insights-v2";
import { CharacterDiscoveryAreaChart } from "./CharacterDiscoveryAreaChart";
import { CharacterDiscoveryBarChart } from "./CharacterDiscoveryBarChart";
import { CharacterLearnedBarChart } from "./CharacterLearnedBarChart";
import { useGetFromAndToDate } from "./use-get-from-date";
import { formatDate } from "@/components/settings-dialog/utils/format-date";
import { useGetInsightSearchResults } from "./insights-v2/precision-insight-view/use-get-insight-search-results";
import { PrecisionSearchResults } from "./insights-v2/precision-insight-view/precision-search-results";

function ToAndFromDate() {
  const { fromDate, toDate } = useGetFromAndToDate();

  return `${formatDate(Date.parse(fromDate?.toISOString()))} - ${formatDate(Date.parse(toDate?.toISOString()))}`;
}

export default function Insights() {
  const { fromDate, toDate } = useGetFromAndToDate();

  const searchResults = useGetInsightSearchResults();

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

      {/* <div className="">
        <CharacterLearnedBarChart />
      </div> */}

      <main className="mx-4 md:mx-48">
        <div className="text-gray-500 font-extralight sm:hidden block text-center">
          <ToAndFromDate />
        </div>

        {searchResults?.length > 0 ? (
          <PrecisionSearchResults searchResults={searchResults} />
        ) : (
          <InsightsV2 />
        )}
      </main>
    </div>
  );
}
