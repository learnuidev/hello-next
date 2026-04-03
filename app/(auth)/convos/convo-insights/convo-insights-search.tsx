"use client";

import { useInsightsSettingsStore } from "../use-insights-settings-store";
import { Icons } from "@/components/ui/icons.v2";

export function ConvoInsightsSearch() {
  const searchQuery = useInsightsSettingsStore((state) => state.searchQuery);
  const setSearchQuery = useInsightsSettingsStore(
    (state) => state.setSearchQuery
  );

  return (
    <div className="relative w-80">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <Icons.magnifyingGlass />
      </span>
      <input
        type="text"
        placeholder="搜索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
      />
    </div>
  );
}
