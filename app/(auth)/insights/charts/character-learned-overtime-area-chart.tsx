"use client";

import { useState } from "react";

import { AnimatedLoadingText } from "@/components/animated-loading-text";
import { FancyAreaChart } from "../insights-v3/components/fancy-area-chart";
import { useListAllTimeCharacters } from "../use-list-all-time-learned-characters";

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
  const { data: chartData, isLoading, totalData } = useListAllTimeCharacters();

  const data = chartData?.map((item) => {
    return {
      date: item.day,
      value: item.count,
    };
  });

  if (isLoading) {
    return <ChartLoadingText />;
  }

  return (
    <FancyAreaChart
      total={totalData}
      title={"total characters learned"}
      data={data}
    />
  );
}

export function CharacterLearnedOvertimeChart() {
  return (
    <>
      <div className="w-full dark:bg-[rgb(21,22,24)] bg-gray-50 py-8 rounded-2xl px-4">
        <WeeklyLearnedCharactersChart />
      </div>
    </>
  );
}
