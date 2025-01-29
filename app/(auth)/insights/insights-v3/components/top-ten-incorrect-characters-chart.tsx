import { useGetTopTenIncorrect } from "../../insights-v2/precision-insight-view/use-get-top-ten-incorrect";
import { useListWeeklyLearnedCharacters } from "../../use-list-weekly-learned-characters";

import { ChartTooltip } from "@/components/ui/chart";

import { useTheme } from "next-themes";
import Link from "next/link";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Link
        target="_blank"
        href={`/nmm/${encodeURIComponent(payload[0].payload?.hanzi)}${payload[0].payload?.lang ? `?lang=${payload[0].payload?.lang}` : ""}`}
        className="rounded-lg border bg-background p-4 shadow-sm w-72 block"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-extralight dark:text-gray-400 text-2xl">
              {payload[0].payload?.hanzi} {payload[0].payload?.pinyin}
            </p>
          </div>

          <div className="flex items-end flex-col">
            <span className="text-xs">incorrect rate</span>
            <p className="text-2xl">{payload[0].value?.toFixed(1)}%</p>
          </div>
        </div>

        <p>{payload[0]?.payload?.en}</p>
      </Link>
    );
  }
  return null;
};

export const TopTencorrectCharactersChart = () => {
  const topTenIncorrect = useGetTopTenIncorrect();

  const data = topTenIncorrect?.map((item) => {
    return {
      ...item,
      date: `${item?.hanzi || ""}`,
      hanzi: item?.hanzi,
      value: ((item?.totalIncorrect || 0) / (item?.totalAttempts || 1)) * 100,
    };
  });

  if (!topTenIncorrect) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="mb-12">
        <span className="text-lg dark:text-gray-400">
          {"top ten incorrect characters"}
        </span>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              axisLine={false}
              fontSize={16}
              tickLine={false}
              href="/"
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
