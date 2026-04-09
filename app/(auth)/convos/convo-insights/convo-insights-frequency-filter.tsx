"use client";

import { useInsightsSettingsStore, FrequencySort } from "../use-insights-settings-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ConvoInsightsFrequencyFilter() {
  const frequencySort = useInsightsSettingsStore((state) => state.frequencySort);
  const setFrequencySort = useInsightsSettingsStore((state) => state.setFrequencySort);

  return (
    <Select value={frequencySort} onValueChange={(value) => setFrequencySort(value as FrequencySort)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="频率排序" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">默认</SelectItem>
        <SelectItem value="most">从高到低</SelectItem>
        <SelectItem value="least">从低到高</SelectItem>
      </SelectContent>
    </Select>
  );
}
