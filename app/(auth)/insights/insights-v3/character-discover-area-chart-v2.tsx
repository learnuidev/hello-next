"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListWeeklyLearnedCharacters } from "../use-list-weekly-learned-characters";
import { useListWeeklyReviewedCharacters } from "../use-list-weekly-reviewed-characters";
import { useState } from "react";
import { useTheme } from "next-themes";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-4 shadow-sm w-72">
        <p className="text-sm font-extralight text-gray-400">
          {payload[0].payload.date}
        </p>

        <p className="text-4xl">
          {payload[0].value}

          <span className="text-sm"> characters</span>
        </p>
      </div>
    );
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Value
            </span>
            <span className="font-bold text-muted-foreground">
              €{payload[0].value.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Date
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].payload.date}
              {/* {new Date(payload[0].payload.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })} */}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

function FancyAreaChart({
  data,
  title,
}: {
  title: string;
  data: { date: string; value: number }[];
}) {
  const { theme } = useTheme();
  const total = data?.reduce((acc, curr) => {
    return acc + curr?.value;
  }, 0);

  return (
    <div className="space-y-4">
      <div className="mb-12">
        <span className="text-lg dark:text-gray-400">{title}</span>
        <h2 className="text-5xl font-mono dark:text-white">{total}</h2>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <pattern
                id="pattern"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke={
                    theme === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(20,20,20,0.1)"
                  }
                  strokeWidth="2"
                />
              </pattern>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={
                    theme === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.4)"
                  }
                />
                <stop
                  offset="100%"
                  stopColor={
                    theme === "dark" ? "rgba(255,255,255,0)" : "rgba(0,0,20,0)"
                  }
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              fontSize={12}
              tickLine={false}
              stroke="#666"
            />
            <YAxis
              axisLine={false}
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
              stroke="#666"
            />
            <ChartTooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="white"
              fill="url(#areaGradient)"
              strokeWidth={2}
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="transparent"
              fill="url(#pattern)"
              fillOpacity={0.5}
            />
          </AreaChart>
        </ResponsiveContainer>
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

  return (
    <div className="w-full dark:bg-black bg-gray-50 p-8">
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
        {/* <Select defaultValue="year">
          <SelectTrigger className="w-[180px] bg-transparent text-white border-gray-800">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year">July 2023 - July 2024</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {chartView === "characters-learned" ? (
        <WeeklyLearnedCharactersChart />
      ) : (
        <WeeklyReviewedCharactersChart />
      )}
    </div>
  );
}
