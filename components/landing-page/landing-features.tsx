"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ClozeStage } from "./showcase/cloze-stage";
import { DictionaryStage } from "./showcase/dictionary-stage";
import { PlayerStage } from "./showcase/player-stage";
import { ReaderStage } from "./showcase/reader-stage";

/**
 * The features, as links on top and the real screen underneath.
 *
 * Every panel is the app's own component — the player stack, the cloze view, the
 * reader and the dictionary — driven by the example import instead of an
 * account. The tab strip is the app's `Tabs`, so this looks like the rest of the
 * app because it is made of it.
 */
const features = [
  {
    value: "player",
    label: "Content player",
    stage: <PlayerStage />,
    note: "The player, the dock and the karaoke, on the real import",
  },
  {
    value: "cloze",
    label: "Dyna-cloze",
    stage: <ClozeStage />,
    note: "One word hidden, four to choose from",
  },
  {
    value: "reader",
    label: "Reader",
    stage: <ReaderStage />,
    note: "The reader app, on the transcript",
  },
  {
    value: "dictionary",
    label: "Dictionary",
    stage: <DictionaryStage />,
    note: "Tap a word for its entry",
  },
];

export const LandingFeatures = () => {
  return (
    <section id="features" className="px-4 md:px-12 my-16 md:my-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-bold text-3xl md:text-5xl lowercase">features</h2>
        <p className="mt-3 font-extralight text-gray-500">
          Checkout some of our core features
        </p>

        <Tabs defaultValue="player" className="mt-8">
          <TabsList className="h-auto flex-wrap justify-start gap-1">
            {features.map((feature) => (
              <TabsTrigger key={feature.value} value={feature.value}>
                {feature.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent
              key={feature.value}
              value={feature.value}
              className="mt-8"
            >
              <p className="mb-4 font-extralight text-sm text-gray-400">
                {feature.note}
              </p>
              {feature.stage}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
