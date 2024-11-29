"use client";

import { PrecisionInsightView } from "@/app/(auth)/insights/insights-v2/precision-insight-view/precision-insight-view";
import { OverviewInsightView } from "@/app/(auth)/insights/insights-v2/overview-insight-view/overview-insight-view";
import { useGetInsightParams } from "@/app/(auth)/insights/insights-v2/use-get-insight-params";
import { ProgressInsightView } from "./progress-insight-view/progress-insight-view";

export const InsightsV2 = () => {
  const { view } = useGetInsightParams();

  switch (view) {
    case "progress":
      return <ProgressInsightView />;
    case "errors":
    case "failure-rate":
      return <PrecisionInsightView />;
    default:
      return <OverviewInsightView />;
  }
};
