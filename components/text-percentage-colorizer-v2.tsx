"use client";

import React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface TextPercentageColorizerV2Props {
  text: string;
  startTime: number;
  endTime: number;
  currentTime: number;
  color?: string;
  uncoloredColor?: string;
  className?: string;
}

export function TextPercentageColorizerV2({
  text,
  startTime,
  endTime,
  currentTime,
  color,
  uncoloredColor,
  className,
}: TextPercentageColorizerV2Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const defaultColor = isDark ? "#FFFFFF" : "#000000";
  const defaultUncoloredColor = isDark
    ? "rgba(255, 255, 255, 0.3)"
    : "rgba(0, 0, 0, 0.3)";

  const finalColor = color ?? defaultColor;
  const finalUncoloredColor = uncoloredColor ?? defaultUncoloredColor;

  const duration = endTime - startTime;
  const elapsed = Math.max(0, currentTime - startTime);
  const percentage = Math.min(
    Math.max(elapsed / Math.max(duration, 0.1), 0),
    1
  );

  const exactCharPosition = text.length * percentage;
  const colorizedCount = Math.floor(exactCharPosition);
  const partialPercentage = (exactCharPosition - colorizedCount) * 100;

  return (
    <span className={cn("font-light leading-relaxed tracking-wide", className)}>
      {text.split("").map((char, index) => {
        if (index < colorizedCount) {
          return (
            <span key={index} style={{ color: finalColor }}>
              {char}
            </span>
          );
        } else if (index === colorizedCount && partialPercentage > 0) {
          return (
            <span
              key={index}
              style={{
                backgroundImage: `linear-gradient(to right, ${finalColor} 0%, ${finalColor} ${partialPercentage}%, ${finalUncoloredColor} ${partialPercentage}%, ${finalUncoloredColor} 100%)`,
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
            <span key={index} style={{ color: finalUncoloredColor }}>
              {char}
            </span>
          );
        }
      })}
    </span>
  );
}
