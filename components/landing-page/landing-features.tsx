"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ClozeStage } from "./showcase/cloze-stage";
import { FeatureFrame } from "./showcase/feature-frame";
import { PlayerStage } from "./showcase/player-stage";
import { ReaderStage } from "./showcase/reader-stage";

/**
 * The features, as links on top and the real screen underneath.
 *
 * Every panel is the app's own component — the player stack, the cloze view and
 * the reader — driven by the example import instead of an account. The tab strip
 * is the app's `Tabs`, so this looks like the rest of the app because it is made
 * of it.
 */
const features = [
  {
    value: "player",
    label: "Content player",
    stage: <PlayerStage />,
  },
  {
    value: "cloze",
    label: "Dynocloze",
    stage: <ClozeStage />,
  },
  {
    value: "reader",
    label: "Reader",
    stage: <ReaderStage />,
  },
];

export const LandingFeatures = () => {
  return (
    <section id="features" className="px-4 md:px-12 my-16 md:my-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-bold text-3xl md:text-5xl lowercase">
          features
        </h2>
        <p className="mt-3 text-center font-extralight text-gray-500">
          Checkout some of our core features
        </p>

        <Tabs defaultValue="player" className="mt-8">
          <div className="flex justify-center">
            <TabsList className="h-auto flex-wrap gap-1 rounded-full">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.value}
                  value={feature.value}
                  className="rounded-full"
                >
                  {feature.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {features.map((feature) => (
            <TabsContent
              key={feature.value}
              value={feature.value}
              className="mt-8"
            >
              <FeatureFrame>{feature.stage}</FeatureFrame>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
