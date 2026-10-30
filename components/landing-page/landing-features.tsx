"use client";

import { useCallback, useRef, useState } from "react";

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
  /**
   * The frame is as tall as the tallest feature, through all of its own taller
   * screens: the content player is the reference, and switching to a shorter
   * tab must not shrink the box under it.
   */
  const tallestRef = useRef(0);
  const [minHeight, setMinHeight] = useState<number | null>(null);

  const handleMeasure = useCallback((height: number) => {
    // Capped by the frame's own max height, so the measurement can never push
    // the box past the space the page gives it.
    const capped = Math.min(height, window.innerHeight * 0.8);

    if (capped <= tallestRef.current) {
      return;
    }

    tallestRef.current = capped;
    setMinHeight(capped);
  }, []);

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
              <FeatureFrame
                minHeight={minHeight}
                onMeasure={handleMeasure}
                // Only the content player: it is the one with a full screen of
                // its own, and the one a visitor is being invited into.
                nudgeFullscreen={feature.value === "player"}
              >
                {feature.stage}
              </FeatureFrame>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
