import { useState } from "react";

import { FlipCard } from "./flip-card";
import { useAnimate } from "framer-motion";

export const FlipCardFeature = () => {
  const [mode, setMode] = useState<"vertical" | "horizontal">("horizontal");
  const [animationScope, animate] = useAnimate();

  return (
    <div>
      <div className="space-x-4 mb-8">
        <button
          className={mode === "horizontal" ? "text-white" : "text-gray-500"}
          onClick={() => {
            setMode("horizontal");
          }}
        >
          Horizontal{" "}
        </button>
        <button
          className={mode === "vertical" ? "text-white" : "text-gray-500"}
          onClick={() => {
            setMode("vertical");
          }}
        >
          Vertical{" "}
        </button>
      </div>

      <FlipCard
        animationScope={animationScope}
        variant={mode}
        flashcard={{
          term: "你好",
          definition: "Hello",
        }}
        editable={false}
      />
    </div>
  );
};
