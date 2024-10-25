import { useState } from "react";

import { FlipCardY } from "./flip-card-y";
import { useAnimate } from "framer-motion";
import { FlipCardX } from "./flip-card-x";

export const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState("horizontal");

  const [scope, animate] = useAnimate();

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

      {mode === "vertical" ? (
        <FlipCardY
          flashcard={{
            term: "你好",
            definition: "Hello",
          }}
          editable={false}
          animationScope={scope}
        />
      ) : (
        <FlipCardX
          flashcard={{
            term: "你好",
            definition: "Hello",
          }}
          editable={false}
          animationScope={scope}
        />
      )}
    </div>
  );

  return (
    <FlipCardX
      flashcard={{
        term: "你好",
        definition: "Hello",
      }}
      editable={false}
      animationScope={scope}
    />
  );
};
