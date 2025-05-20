"use client";

import { ChartTooltip } from "@/components/ui/chart";
import { useTheme } from "next-themes";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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
  }
  return null;
};

type ColorVariants = "bw" | "rouge";

{
  /* <defs>
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
</defs> */
}

function calculateColor(variants: ColorVariants = "bw") {
  if (variants === "rouge") {
    return {
      line: {
        dark: "rgba(155,155,155,0.1)",
        light: "rgba(40,50,60,0.1)",
      },
      stop: {
        dark: {
          0: "rgba(155,155,155,0.05)",
          100: "rgba(155,155,155,0)",
        },
        light: {
          0: "rgba(1,20,40,0.4)",
          100: "rgba(40,20,30,0)",
        },
      },
    };
  }
  return {
    line: {
      dark: "rgba(255,255,255,0.1)",
      light: "rgba(20,20,20,0.1)",
    },
    stop: {
      dark: {
        0: "rgba(255,255,255,0.05)",
        100: "rgba(255,255,255,0)",
      },
      light: {
        0: "rgba(0,0,0,0.4)",
        100: "rgba(0,0,20,0)",
      },
    },
  };
}

export function FancyAreaChart({
  data,
  title,
  totalTime,
  total: _total,

  colorVariants,
}: {
  total?: number;
  title: string;
  totalTime?: string;
  data: { date: string; value: number }[];
  colorVariants?: ColorVariants;
}) {
  const { theme } = useTheme();
  const total =
    _total ||
    data?.reduce((acc, curr) => {
      return acc + curr?.value;
    }, 0);

  const { line, stop } = calculateColor(colorVariants);

  return (
    <div className="space-y-4">
      <div className="mb-12">
        <span className="text-lg dark:text-gray-400">{title}</span>
        <h2 className="font-mono dark:text-white space-x-4">
          <span className="text-5xl "> {total}</span>

          <span className="text-xl"> {totalTime}</span>
        </h2>
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
                  stroke={theme === "dark" ? line.dark : line.light}
                  strokeWidth="2"
                />
              </pattern>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={theme === "dark" ? stop.dark[0] : stop.light[0]}
                />
                <stop
                  offset="100%"
                  stopColor={
                    theme === "dark" ? stop.dark[100] : stop.light[100]
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
