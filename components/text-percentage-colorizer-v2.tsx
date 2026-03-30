"use client";

import React from "react";

interface TextPercentageColorizerV2Props {
  text: string;
  startTime: number;
  endTime: number;
  currentTime: number;
  color?: string;
  uncoloredColor?: string;
}

export function TextPercentageColorizerV2({
  text,
  startTime,
  endTime,
  currentTime,
  color = "#FFFFFF",
  uncoloredColor = "rgba(255, 255, 255, 0.3)",
}: TextPercentageColorizerV2Props) {
  const duration = endTime - startTime;
  const elapsed = Math.max(0, currentTime - startTime);
  const percentage = Math.min(Math.max(elapsed / Math.max(duration, 0.1), 0), 1);

  const exactCharPosition = text.length * percentage;
  const colorizedCount = Math.floor(exactCharPosition);
  const partialPercentage = (exactCharPosition - colorizedCount) * 100;

  return (
    <span className="font-light leading-relaxed tracking-wide">
      {text.split("").map((char, index) => {
        if (index < colorizedCount) {
          return (
            <span key={index} style={{ color }}>
              {char}
            </span>
          );
        } else if (index === colorizedCount && partialPercentage > 0) {
          return (
            <span
              key={index}
              style={{
                backgroundImage: `linear-gradient(to right, ${color} 0%, ${color} ${partialPercentage}%, ${uncoloredColor} ${partialPercentage}%, ${uncoloredColor} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {char}
            </span>
          );
        } else {
          return (
            <span key={index} style={{ color: uncoloredColor }}>
              {char}
            </span>
          );
        }
      })}
    </span>
  );
}
