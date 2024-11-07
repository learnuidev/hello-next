"use client";

import { PrecisionInsightView } from "./precision-insight-view/precision-insight-view";
import { OverviewInsightView } from "./overview-insight-view";
import { useGetInsightParams } from "./use-get-insight-params";

export const InsightsV2 = () => {
  const { view } = useGetInsightParams();

  switch (view) {
    case "errors":
    case "failure-rate":
      return <PrecisionInsightView />;
    default:
      return <OverviewInsightView />;
  }
};
