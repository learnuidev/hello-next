"use client";

import { InsightErrorView } from "./insight-error-view";
import { OverviewInsightView } from "./overview-insight-view";
import { useGetInsightParams } from "./use-get-insight-params";

export const InsightsV2 = () => {
  const { view } = useGetInsightParams();

  switch (view) {
    case "errors":
      return <InsightErrorView />;
    default:
      return <OverviewInsightView />;
  }
};
