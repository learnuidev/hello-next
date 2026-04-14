import { Speak } from "@/app/next/features/speak/speak";

import { Phrase } from "@/app/next/features/phrase/phrase";
import { FeatureContextProvider } from "../features/feature-context-provider";

export const features = [
  {
    id: "speak",
    name: "Speak",
    Component: Speak,
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
