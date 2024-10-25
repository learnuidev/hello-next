import { FlipCard } from "@/app/next/features/flip-card/flip-card";
import { InsightsV2 } from "@/app/next/features/insights-v2/insights-v2";

export const features = [
  {
    id: "flip-card",
    name: "Flip Card",
    Component: FlipCard,
  },
  {
    id: "insights-v2",
    name: "Insights V2",
    Component: InsightsV2,
  },
];

export const defaultFeature = features[0];

export const getFeatureById = (id: string) => {
  return features.find((feature) => feature.id === id) || defaultFeature;
};
