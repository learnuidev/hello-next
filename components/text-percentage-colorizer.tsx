"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface TextPercentageColorizerProps {
  initialText?: string;
  initialPercentage?: number;
  initialColor?: string;
  onTextChange?: (text: string) => void;
  onPercentageChange?: (percentage: number) => void;
  onColorChange?: (color: string) => void;
  showStats?: boolean;
  textSize?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export function TextPercentageColorizer({
  initialText = "Hello World",
  initialPercentage = 50,
  initialColor = "#3B82F6",
  onTextChange,
  onPercentageChange,
  onColorChange,
  showStats = true,
  textSize = "4xl",
}: TextPercentageColorizerProps) {
  const [text, setText] = useState(initialText);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [colorizedColor, setColorizedColor] = useState(initialColor);

  // Calculate the exact character position where coloring should stop
  const exactCharPosition = (text.length * percentage) / 100;
  const colorizedCount = Math.floor(exactCharPosition);
  const partialPercentage = (exactCharPosition - colorizedCount) * 100;

  // Calculate gradient position (where the color transition happens)
  const gradientPosition =
    ((colorizedCount + partialPercentage / 100) / text.length) * 100;

  const handleTextChange = (newText: string) => {
    setText(newText);
    onTextChange?.(newText);
  };

  const handlePercentageChange = (newPercentage: number) => {
    setPercentage(newPercentage);
    onPercentageChange?.(newPercentage);
  };

  const handleColorChange = (newColor: string) => {
    setColorizedColor(newColor);
    onColorChange?.(newColor);
  };

  const textSizeMap = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  };

  return (
    <div className="w-full space-y-6">
      {/* Text Input */}
      <div>
        <label className="block text-sm font-semibold mb-3">Your Text</label>
        <Input
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Enter text here..."
          className="text-lg h-12 bg-input border-border"
        />
      </div>

      {/* Preview */}
      <div className="p-6 bg-input rounded-lg border border-border min-h-24 flex items-center">
        <p
          className={`${textSizeMap[textSize]} font-bold tracking-tight whitespace-pre-wrap break-words`}
        >
          {text.split("").map((char, index) => {
            if (index < colorizedCount) {
              // Fully colored character
              return (
                <span key={index} style={{ color: colorizedColor }}>
                  {char}
                </span>
              );
            } else if (index === colorizedCount && partialPercentage > 0) {
              // Partial character with gradient
              return (
                <span
                  key={index}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${colorizedColor} 0%, ${colorizedColor} ${partialPercentage}%, rgb(107, 114, 128) ${partialPercentage}%, rgb(107, 114, 128) 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {char}
                </span>
              );
            } else {
              // Gray character
              return (
                <span key={index} style={{ color: "rgb(107, 114, 128)" }}>
                  {char}
                </span>
              );
            }
          })}
        </p>
      </div>

      {/* Percentage Slider */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold">Colorize Percentage</label>
          <span className="text-2xl font-bold text-accent">{percentage}%</span>
        </div>
        <Slider
          value={[percentage]}
          onValueChange={(value) => handlePercentageChange(value[0])}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      {/* Color Picker */}
      <div>
        <label className="block text-sm font-semibold mb-3">Color</label>
        <div className="flex gap-3">
          <input
            type="color"
            value={colorizedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-16 h-10 rounded cursor-pointer border border-border"
          />
          <Input
            value={colorizedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            placeholder="#3B82F6"
            className="flex-1 bg-input border-border"
          />
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
          <div className="bg-input p-4 rounded-lg">
            <p className="text-muted-foreground text-sm mb-1">Colorized</p>
            <p className="text-xl font-bold text-accent">
              {colorizedCount}
              {partialPercentage > 0 ? `.${Math.round(partialPercentage)}` : ""}
            </p>
          </div>
          <div className="bg-input p-4 rounded-lg">
            <p className="text-muted-foreground text-sm mb-1">Total</p>
            <p className="text-xl font-bold">{text.length}</p>
          </div>
          <div className="bg-input p-4 rounded-lg">
            <p className="text-muted-foreground text-sm mb-1">Gradient %</p>
            <p className="text-xl font-bold">{gradientPosition.toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
