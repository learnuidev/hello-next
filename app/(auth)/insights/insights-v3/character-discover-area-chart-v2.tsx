"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useGetTopTenIncorrect } from "../insights-v2/precision-insight-view/use-get-top-ten-incorrect";
import { useGetTopTenRecentlyLearned } from "../insights-v2/precision-insight-view/use-get-top-ten-recently-learned";
import { useGetTopTenRecentlyReviewed } from "../insights-v2/precision-insight-view/use-get-top-ten-recently-reviewed";
import { useGetProgress } from "../insights-v2/use-get-progress";
import { useListWeeklyLearnedCharacters } from "../use-list-weekly-learned-characters";
import { useListWeeklyReviewedCharacters } from "../use-list-weekly-reviewed-characters";
import { FancyAreaChart } from "./components/fancy-area-chart";
import { TopTencorrectCharactersChart } from "./components/top-ten-incorrect-characters-chart";
import { HSKProgressChart } from "./components/hsk-progress-chart";
import { TopTenRecentlyLearnedComponents } from "../insights-v2/precision-insight-view/top-ten-recently-learned-components";
import { TopTenRecentlyReviewedComponents } from "../insights-v2/precision-insight-view/top-ten-recently-reviewed-components";
import { TopTenIncorrectComponents } from "../insights-v2/precision-insight-view/top-ten-incorrect-components";

const categories = [
  { name: "Equipment", percentage: 35 },
  { name: "Rent", percentage: 24 },
  { name: "Travel", percentage: 22 },
  { name: "Salary", percentage: 20 },
  { name: "Furniture", percentage: 15 },
  { name: "Software", percentage: 4 },
  { name: "Transfer", percentage: 5 },
  { name: "Meals", percentage: 4 },
  { name: "Other", percentage: 2 },
];

export function SimplePercentageTable({
  title,
  data,
}: {
  title: string;
  data: { name: string; percentage: number }[];
}) {
  return (
    <div className="dark:bg-black bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg">{title}</h2>
      </div>
      <div className="space-y-2">
        {data?.map((category) => (
          <div key={category.name} className="flex flex-row items-center gap-4">
            <div className="flex justify-between text-sm w-40 truncate">
              <span>{category.name}</span>
            </div>
            <div className="h-2 w-full dark:bg-neutral-800 bg-neutral-200 overflow-hidden flex-grow">
              <div
                className={`h-full dark:bg-gray-200 bg-gray-800`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>

            <p className="w-12">
              {" "}
              <span>{parseInt(`${category.percentage}`)}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyLearnedCharactersChart() {
  const { data: chartData } = useListWeeklyLearnedCharacters();

  const data = chartData?.map((item) => {
    return {
      date: item.day,
      value: item.count,
    };
  });

  return <FancyAreaChart title={"total characters learned"} data={data} />;
}

function WeeklyReviewedCharactersChart() {
  const { data: chartData } = useListWeeklyReviewedCharacters();

  const data = chartData?.map((item) => {
    return {
      date: item.day,
      value: item.count,
    };
  });

  const totalCharactersLearned = data?.reduce((acc, curr) => {
    return acc + curr?.value;
  }, 0);

  return <FancyAreaChart title={"total characters reviewed"} data={data} />;
}

export function CharacterDiscoveryAreaChartV2() {
  const [chartView, setChartView] = useState("characters-learned");

  const progress = useGetProgress();
  const topTenIncorrect = useGetTopTenIncorrect();
  const topTenRecentlyReviewed = useGetTopTenRecentlyReviewed();
  const topTenRecentlyLearned = useGetTopTenRecentlyLearned();

  console.log("TOP INCORRECT", topTenIncorrect);

  return (
    <>
      <div className="w-full dark:bg-black bg-gray-50 p-8 rounded-2xl">
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
