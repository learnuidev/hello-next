"use client";

import {
  useInsightsSettingsStore,
  LearnStatusFilter,
} from "../use-insights-settings-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ConvoInsightsLearnStatusFilter() {
  const learnStatus = useInsightsSettingsStore((state) => state.learnStatus);
  const setLearnStatus = useInsightsSettingsStore((state) => state.setLearnStatus);

  return (
    <Select value={learnStatus} onValueChange={(value) => setLearnStatus(value as LearnStatusFilter)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="学习状态" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">全部</SelectItem>
        <SelectItem value="unlearned">未学</SelectItem>
        <SelectItem value="learned">已学</SelectItem>
        <SelectItem value="forgotten">掌握</SelectItem>
      </SelectContent>
    </Select>
  );
}