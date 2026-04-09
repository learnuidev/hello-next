"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useInsightsSettingsStore } from "@/app/(auth)/convos/use-insights-settings-store";

export function ConvoInsightsViewToggle() {
  const displayMode = useInsightsSettingsStore((state) => state.displayMode);
  const setDisplayMode = useInsightsSettingsStore(
    (state) => state.setDisplayMode
  );

  return (
    <div className="flex flex-row gap-2 border-gray-300 dark:border-gray-600 pl-4 ml-2">
      <button
        onClick={() => {
          setDisplayMode("grid");
        }}
        className={cn(
          displayMode === "grid" ? "dark:text-white" : "text-gray-500",
          "px-0"
        )}
        aria-label="Grid view"
      >
        <Icons.apps className="text-xl md:text-xl" />
      </button>
      <button
        onClick={() => {
          setDisplayMode("list");
        }}
        className={cn(
          displayMode === "list" ? "dark:text-white" : "text-gray-500",
          "px-0"
        )}
        aria-label="List view"
      >
        <Icons.list className="text-xl md:text-xl" />
      </button>
    </div>
  );
}
