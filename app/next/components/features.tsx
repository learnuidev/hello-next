import { FlipCardFeature } from "@/app/next/features/flip-card/flip-card-feature";
import { InsightsV2 } from "@/app/next/features/insights-v2/insights-v2";
import { Speak } from "@/app/next/features/speak/speak";

export const features = [
  {
    id: "flip-card",
    name: "Flip Card",
    Component: FlipCardFeature,
  },
  {
    id: "insights-v2",
    name: "Insights V2",
    Component: InsightsV2,
  },
  {
    id: "speak",
    name: "Speak",
    Component: Speak,
  },
];

export const defaultFeature = features[2];

export const getFeatureById = (id: string) => {
  return features.find((feature) => feature.id === id) || defaultFeature;
};
