"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { useInsightsSettingsStore } from "../use-insights-settings-store";

export const ConvoInsightsFilter = () => {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const setViewType = useInsightsSettingsStore((state) => state.setType);
  const setSortType = useInsightsSettingsStore((state) => state.setSortType);
  const sortType = useInsightsSettingsStore((state) => state.sortType);

  return (
    <div className="flex justify-between items-center">
      <div className="space-x-8 my-8">
        <button
          onClick={() => {
            setViewType("character");
          }}
          className={cn(
            viewType === "character" ? "dark:text-white" : " text-gray-500",
            "px-0 "
          )}
        >
          <Icons.seedling className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={() => {
            setViewType("word");
          }}
          className={cn(
            viewType === "word" ? "dark:text-white" : " text-gray-500",
            "px-0"
          )}
        >
          <Icons.tree className="text-xl md:text-2xl" />
        </button>
      </div>
      <div className="space-x-8 my-8">
        <button
          onClick={() => {
            setSortType("popular");
          }}
          className={cn(
            sortType === "popular" ? "dark:text-white" : " text-gray-500",
            "px-0 "
          )}
        >
          <Icons.fire className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={() => {
            setSortType("timeline");
          }}
          className={cn(
            sortType === "timeline" ? "dark:text-white" : " text-gray-500",
            "px-0 "
          )}
        >
          <Icons.timeline className="text-xl md:text-2xl" />
        </button>
      </div>
    </div>
  );
};
