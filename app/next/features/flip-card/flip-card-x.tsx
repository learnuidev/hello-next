import { useState } from "react";
import { AnimationScope, motion, useAnimate } from "framer-motion";

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

export function FlipCardX({
  animationScope,
  editable,
  flashcard,
  fullscreen,
  //   session,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [scope, animate] = useAnimate();

  const handleFlip = async () => {
    await animate(
      scope.current,
      { rotateY: isFlipped ? 0 : 180 },
      { duration: 0.6 }
    );
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      ref={scope}
      className="relative w-[400px] h-64 rounded-2xl shadow-sm bg-[rgb(21,22,23)] cursor-pointer [transform-style:preserve-3d]"
      onClick={handleFlip}
    >
      <motion.div
        className="absolute w-full h-full rounded-lg shadow-lg flex items-center justify-center"
        style={{ backfaceVisibility: "hidden" }}
      >
        <h2 className="text-2xl font-bold text-white">Front</h2>
      </motion.div>
      <motion.div
        className="absolute w-full h-full rounded-lg shadow-lg flex items-center justify-center"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <h2 className="text-2xl font-bold text-white">Back</h2>
      </motion.div>
    </div>
  );
}
