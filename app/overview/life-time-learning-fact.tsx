"use client";

import { Icons } from "@/components/ui/icons.v2";

export const LifeTimeLearningFact = ({
  lifeTimeCharacters,
  totalComponentsLength,
  characterLearningRatio,
}: any) => {
  return (
    <p>
      <span className="mr-1">
        <Icons.lightBulb />{" "}
      </span>
      You have learned <span className="font-bold">{lifeTimeCharacters}</span>{" "}
      characters out of{" "}
      <span className="font-bold">{totalComponentsLength}</span>, which
      represents a character learning percentage{" "}
      <span className="font-bold">{characterLearningRatio}</span>
    </p>
  );
};
