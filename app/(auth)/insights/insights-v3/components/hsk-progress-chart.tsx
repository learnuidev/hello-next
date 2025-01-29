import { useGetTopTenIncorrect } from "../../insights-v2/precision-insight-view/use-get-top-ten-incorrect";
import { useListWeeklyLearnedCharacters } from "../../use-list-weekly-learned-characters";

import { ChartTooltip } from "@/components/ui/chart";

import { useTheme } from "next-themes";
import Link from "next/link";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
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
  const topTenIncorrect = useGetTopTenIncorrect();

  const progress = useGetProgress();

  const data = progress?.hskV3?.map((item) => {
    return {
      ...item,
      date: item?.title,
      value: item?.stat,
      // date: `${item?.hanzi || ""} (${item?.en?.split("/")?.[0]})`,
      // hanzi: item?.hanzi,
      // value: ((item?.totalIncorrect || 0) / (item?.totalAttempts || 1)) * 100,
    };
  });

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
