"use client";

import { cn } from "@/lib/utils";

interface ConvoInsightsCharacterStatsCardProps {
  totalNew: number;
  totalLearned: number;
  totalMastered: number;
  total: number;
}

export function ConvoInsightsCharacterStatsCard({
  totalNew,
  totalLearned,
  totalMastered,
  total,
}: ConvoInsightsCharacterStatsCardProps) {
  const stats = [
    { value: totalNew, label: "新汉字" },
    { value: totalLearned, label: "已学" },
    { value: totalMastered, label: "掌握" },
  ];

  const getPercentage = (value: number) => {
    if (total === 0) return "0%";
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center"
        >
          <p className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100">
            {stat.value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-extralight">
            {getPercentage(stat.value)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-extralight mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
