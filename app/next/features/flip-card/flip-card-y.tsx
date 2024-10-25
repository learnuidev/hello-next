"use client";

import type { AnimationScope } from "framer-motion";
import React, { useState } from "react";
import { useAnimate, motion } from "framer-motion";
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

export const FlipCardY = ({
  animationScope,
  editable,
  flashcard,
  fullscreen,
  //   session,
}: FlipCardProps) => {
  const [flipScope, flipAnimate] = useAnimate<HTMLDivElement>();
  const [flipped, setFlipped] = useState<boolean>(false);

  const flipCard = () => {
    if (flipped) {
      void flipAnimate(
        flipScope.current,
        { rotateX: [0, 180] },
        { duration: 0.6 }
      );
    } else {
      void flipAnimate(
        flipScope.current,
        { rotateX: [180, 360] },
        { duration: 0.6 }
      );
    }

    setFlipped((prev) => !prev);
  };

  return (
    <div>
      <div
        role="presentation"
        ref={animationScope}
        className={cn("w-full [perspective:1000px]", {
          "min-h-[21rem] sm:min-h-[25rem]": !fullscreen,
          "min-h-[40rem]": fullscreen,
        })}
      >
        <motion.div
          ref={flipScope}
          onClick={flipCard}
          initial={{ rotateY: 0 }}
          className="relative w-[400px] h-64 rounded-2xl shadow-sm bg-[rgb(21,22,23)] cursor-pointer [transform-style:preserve-3d]"
        >
          <FlipCardContent
            title="Get a hint"
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
        </motion.div>
      </div>
    </div>
  );
};
