"use client";

import { Icons } from "@/components/ui/icons.v2";

export function CharacterMasteryRatio({
  lifeTimeCharacters,
  totalReviedCharacters,
  characterReviewRatio,
  totalMasteredCharacters,
  characterMasteryRatio,
}: any) {
  return (
    <p>
      <span className="mr-1">
        <Icons.fire />{" "}
      </span>
      Out of the <span className="font-bold">{lifeTimeCharacters}</span> learned
      characters, you have reviewed{" "}
      <span className="font-bold">
        {totalReviedCharacters} ({characterReviewRatio})
      </span>{" "}
      and mastered{" "}
      <span className="font-bold">
        {" "}
        {totalMasteredCharacters} ({characterMasteryRatio})
      </span>
      .
    </p>
  );
}
