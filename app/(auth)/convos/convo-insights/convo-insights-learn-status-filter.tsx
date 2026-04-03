"use client";

import {
  useInsightsSettingsStore,
  LearnStatusFilter,
} from "../use-insights-settings-store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ConvoInsightsLearnStatusFilter() {
  const learnStatus = useInsightsSettingsStore((state) => state.learnStatus);
  const setLearnStatus = useInsightsSettingsStore(
    (state) => state.setLearnStatus
  );

  const filters = [
    { label: "全部", value: "all" as LearnStatusFilter },
    { label: "未学", value: "unlearned" as LearnStatusFilter },
    { label: "已学", value: "learned" as LearnStatusFilter },
    { label: "掌握", value: "forgotten" as LearnStatusFilter },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => {
        const isActive = learnStatus === filter.value;
        return (
          <motion.button
            key={filter.value}
            onClick={() => setLearnStatus(filter.value)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-rose-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.label}
          </motion.button>
        );
      })}
    </div>
  );
}
