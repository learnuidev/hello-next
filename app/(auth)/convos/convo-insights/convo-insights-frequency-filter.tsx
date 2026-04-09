"use client";

import { useInsightsSettingsStore, FrequencyFilter } from "../use-insights-settings-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ConvoInsightsFrequencyFilter() {
  const frequencyFilter = useInsightsSettingsStore((state) => state.frequencyFilter);
  const setFrequencyFilter = useInsightsSettingsStore((state) => state.setFrequencyFilter);

  return (
    <Select value={frequencyFilter} onValueChange={(value) => setFrequencyFilter(value as FrequencyFilter)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="频率" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">全部</SelectItem>
        <SelectItem value="high">高频</SelectItem>
        <SelectItem value="medium">中频</SelectItem>
        <SelectItem value="low">低频</SelectItem>
      </SelectContent>
    </Select>
  );
}
