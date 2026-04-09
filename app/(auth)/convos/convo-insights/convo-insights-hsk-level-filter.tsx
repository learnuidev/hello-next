"use client";

import {
  useInsightsSettingsStore,
  HskLevelFilter,
} from "../use-insights-settings-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConvoInsightsHskLevelFilterProps {
  availableHskLevels?: number[];
  showNa?: boolean;
}

const allHskLevels = [1, 2, 3, 4, 5, 6, 9] as const;

export function ConvoInsightsHskLevelFilter({
  availableHskLevels,
  showNa = true,
}: ConvoInsightsHskLevelFilterProps = {}) {
  const hskLevel = useInsightsSettingsStore((state) => state.hskLevel);
  const setHskLevel = useInsightsSettingsStore((state) => state.setHskLevel);

  const hskLevelsToShow = availableHskLevels?.length
    ? allHskLevels.filter((level) => availableHskLevels.includes(level))
    : allHskLevels;

  return (
    <Select
      value={String(hskLevel)}
      onValueChange={(value) =>
        setHskLevel(
          value === "all"
            ? "all"
            : value === "na"
              ? "na"
              : (parseInt(value, 10) as HskLevelFilter)
        )
      }
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="HSK等级" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">全部</SelectItem>
        {hskLevelsToShow.map((level) => (
          <SelectItem key={level} value={String(level)}>
            汉语水平 {level}
          </SelectItem>
        ))}
        {showNa && <SelectItem value="na">N/A</SelectItem>}
      </SelectContent>
    </Select>
  );
}
