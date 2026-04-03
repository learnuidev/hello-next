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

export function ConvoInsightsHskLevelFilter() {
  const hskLevel = useInsightsSettingsStore((state) => state.hskLevel);
  const setHskLevel = useInsightsSettingsStore((state) => state.setHskLevel);

  return (
    <Select
      value={String(hskLevel)}
      onValueChange={(value) =>
        setHskLevel(
          value === "na" ? "na" : (parseInt(value, 10) as HskLevelFilter)
        )
      }
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="HSK等级" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">全部</SelectItem>
        <SelectItem value="1">HSK 1</SelectItem>
        <SelectItem value="2">HSK 2</SelectItem>
        <SelectItem value="3">HSK 3</SelectItem>
        <SelectItem value="4">HSK 4</SelectItem>
        <SelectItem value="5">HSK 5</SelectItem>
        <SelectItem value="6">HSK 6</SelectItem>
        <SelectItem value="9">HSK 9</SelectItem>
        <SelectItem value="na">N/A</SelectItem>
      </SelectContent>
    </Select>
  );
}
