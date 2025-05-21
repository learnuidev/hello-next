"use client";

import { Icons } from "@/components/ui/icons.v2";

export function AverageCharacterReview({ averageCharacterReview }: any) {
  return (
    <p>
      <span className="mr-1">
        <Icons.glassesRound />{" "}
      </span>
      You have reviewed an average of{" "}
      <span className="font-bold">{averageCharacterReview}</span> times per
      character.
    </p>
  );
}
