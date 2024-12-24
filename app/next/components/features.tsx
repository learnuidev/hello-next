import { FlipCardFeature } from "@/app/next/features/flip-card/flip-card-feature";
import { InsightsV2 } from "@/app/next/features/insights-v2/insights-v2";
import { Speak } from "@/app/next/features/speak/speak";
import { HtmlParser } from "@/app/next/features/html-parser/html-parser";
import { Shuo } from "@/app/next/features/shuo/shuo";

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
  {
    id: "html-parser",
    name: "Parser",
    Component: HtmlParser,
  },
  {
    id: "phrase",
    name: "Phrase",
    Component: Shuo,
  },
];

export const defaultFeature = features[4];

export const getFeatureById = (id: string) => {
  return features.find((feature) => feature.id === id) || defaultFeature;
};
