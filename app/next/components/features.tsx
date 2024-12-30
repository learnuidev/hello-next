import { FlipCardFeature } from "@/app/next/features/flip-card/flip-card-feature";
import { InsightsV2 } from "@/app/next/features/insights-v2/insights-v2";
import { Speak } from "@/app/next/features/speak/speak";
import { HtmlParser } from "@/app/next/features/html-parser/html-parser";
import { Phrase } from "@/app/next/features/phrase/phrase";
import { FeatureContextProvider } from "../features/feature-context-provider";

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

    Component: () => {
      return (
        <FeatureContextProvider
          value={{
            rootUrl: `/next`,
          }}
        >
          <HtmlParser />
        </FeatureContextProvider>
      );
    },
  },
  {
    id: "phrase",
    name: "Phrase",
    Component: () => {
      return (
        <FeatureContextProvider
          value={{
            rootUrl: `/next`,
          }}
        >
          <Phrase />
        </FeatureContextProvider>
      );
    },
  },
];

export const defaultFeature = features[4];

export const getFeatureById = (id: string) => {
  return features.find((feature) => feature.id === id) || defaultFeature;
};
