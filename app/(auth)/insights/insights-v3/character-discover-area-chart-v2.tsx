"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { TopTenIncorrectComponents } from "../insights-v2/precision-insight-view/top-ten-incorrect-components";
import { TopTenRecentlyLearnedComponents } from "../insights-v2/precision-insight-view/top-ten-recently-learned-components";
import { TopTenRecentlyReviewedComponents } from "../insights-v2/precision-insight-view/top-ten-recently-reviewed-components";
import { useListWeeklyLearnedCharacters } from "../use-list-weekly-learned-characters";
import { useListWeeklyReviewedCharacters } from "../use-list-weekly-reviewed-characters";
import { FancyAreaChart } from "./components/fancy-area-chart";
import { HSKProgressChart } from "./components/hsk-progress-chart";
import { TopTencorrectCharactersChart } from "./components/top-ten-incorrect-characters-chart";
import { AnimatedLoadingText } from "@/components/animated-loading-text";

function ChartLoadingText() {
  return (
    <div className="h-[250px] flex justify-center">
      <AnimatedLoadingText
        message="Loading chart"
        className="text-center text-2xl font-extralight"
      />
    </div>
  );
}

function WeeklyLearnedCharactersChart() {
  const { data: chartData, isLoading } = useListWeeklyLearnedCharacters();

  const data = chartData?.map((item) => {
    return {
      date: item.day,
      value: item.count,
    };
  });

  if (isLoading) {
    return <ChartLoadingText />;
  }

  return <FancyAreaChart title={"total characters learned"} data={data} />;
}

function WeeklyReviewedCharactersChart() {
  const { data: chartData, isLoading } = useListWeeklyReviewedCharacters();

  const data = chartData?.map((item) => {
    return {
      date: item.day,
      value: item.count,
    };
  });

  const totalCharactersLearned = data?.reduce((acc, curr) => {
    return acc + curr?.value;
  }, 0);

  if (isLoading) {
    return <ChartLoadingText />;
  }

  return <FancyAreaChart title={"total characters reviewed"} data={data} />;
}

export function CharacterDiscoveryAreaChartV2() {
  const [chartView, setChartView] = useState("characters-learned");

  return (
    <>
      <div className="w-full dark:bg-black bg-gray-50 py-8 rounded-2xl">
        <div className="flex items-center justify-between mb-8">
          <Select
            defaultValue="characters-learned"
            value={chartView}
            onValueChange={(value) => {
              setChartView(value);
            }}
          >
            <SelectTrigger className="w-[180px] bg-transparent dark:text-white dark:border-gray-800 px-2">
              <SelectValue placeholder="Select metric" className="" />
            </SelectTrigger>
            <SelectContent className="mx-0">
              <SelectItem value="characters-learned">
                Characters Learned
              </SelectItem>
              <SelectItem value="characters-reviewed">
                Characters Reviewed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {chartView === "characters-learned" ? (
          <WeeklyLearnedCharactersChart />
        ) : (
          <WeeklyReviewedCharactersChart />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
        <TopTencorrectCharactersChart />

        <HSKProgressChart />
        {/* <Assistant />
            <Calendar hours={165.5} /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
        <TopTenRecentlyLearnedComponents />

        <TopTenRecentlyReviewedComponents />

        <TopTenIncorrectComponents />
      </div>
    </>
  );
}
