"use client";

import type { AnimationScope } from "framer-motion";
import React, { useState } from "react";
import { useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

// import type { RouterOutputs } from "@acme/api";
// import type { Session } from "@acme/auth";
// import { cn } from "@acme/ui";

import FlipCardContent from "./flip-card-content";

interface FlipCardProps {
  flashcard: {
    term: string;
    definition: string;
  };
  editable: boolean;
  animationScope: AnimationScope<HTMLDivElement>;
  fullscreen?: boolean;
  //   session: Session | null;
}

export const FlipCardComp = ({
  animationScope,
  editable,
  flashcard,
  fullscreen,
  //   session,
}: FlipCardProps) => {
  const [flipScope, flipAnimate] = useAnimate<HTMLDivElement>();
  const [flipped, setFlipped] = useState<boolean>(false);

  //   const flipCard = () => {
  //     if (flipped) {
  //       //   void flipAnimate(flipScope.current, { rotateX: [0, 180] });
  //       void flipAnimate(flipScope.current, { rotateY: [180, 0] });
  //     } else {
  //       //   void flipAnimate(flipScope.current, { rotateX: [180, 360] });
  //       void flipAnimate(flipScope.current, { rotateY: [360, 180] });
  //     }
  //     setFlipped((prev) => !prev);
  //   };

  const flipCard = () => {
    if (flipped) {
      void flipAnimate(flipScope.current, { rotateX: [0, 180] });
    } else {
      void flipAnimate(flipScope.current, { rotateX: [180, 360] });
    }
    setFlipped((prev) => !prev);
  };

  return (
    <div>
      <h1>{`${flipped}`}</h1>
      <div
        role="presentation"
        ref={animationScope}
        className={cn("w-full [perspective:1000px]", {
          "min-h-[21rem] sm:min-h-[25rem]": !fullscreen,
          "min-h-[40rem]": fullscreen,
        })}
      >
        <div
          ref={flipScope}
          onClick={flipCard}
          className="relative h-72 w-64 rounded-xl shadow-sm shadow-gray-400 cursor-pointer [transform-style:preserve-3d]"
        >
          <FlipCardContent
            title="Term"
            content={flashcard.term}
            editable={editable}
            //   flashcard={flashcard}
            //   session={session}
          />
          <FlipCardContent
            title="Definition"
            content={flashcard.definition}
            editable={editable}
            //   flashcard={flashcard}
            //   session={session}
            back
          />
        </div>
      </div>
    </div>
  );
};
