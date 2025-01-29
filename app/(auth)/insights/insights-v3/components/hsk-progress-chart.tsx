import { ChartTooltip } from "@/components/ui/chart";

import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useGetProgress } from "../../insights-v2/use-get-progress";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Link
        target="_blank"
        href={`/nmm/${encodeURIComponent(payload[0].payload?.hanzi)}${payload[0].payload?.lang ? `?lang=${payload[0].payload?.lang}` : ""}`}
        className="rounded-lg border bg-background p-4 shadow-sm w-72 block"
      >
        <p className="text-sm font-extralight text-gray-400">
          {payload[0].payload.date}
        </p>

        <p className="text-4xl">{payload[0].value?.toFixed(1)}%</p>
      </Link>
    );
  }
  return null;
};

export const HSKProgressChart = () => {
  const progress = useGetProgress();

  const data = progress?.hskV3?.map((item) => {
    return {
      ...item,
      date: item?.title,
      value: item?.stat,
    };
  });

  if (progress?.isLoading) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="mb-12">
        <span className="text-lg dark:text-gray-400">{"HSK Progress"}</span>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
            <ChartTooltip
              content={<CustomTooltip />}
              cursor={{ fill: "none" }}
            />
            <Bar
              type="monotone"
              dataKey="value"
              // stroke="white"
              fill="url(#areaGradient)"
              // strokeWidth={2}
              fillOpacity={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
