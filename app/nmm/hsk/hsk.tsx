"use client";

import React from "react";
import { useSearchQueryStore } from "@/components/search/state";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { HskWordsView } from "./hsk-words-view";
import { HskCharacterView } from "./hsk-character-view";

export const HskView = ({
  children,
  variant,
  type,
}: {
  children: React.ReactNode;
  variant?: "all";
  // type?: "character" | "word" | "sentence";
  type?: string;
}) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const mode = useLearningModeStore((state: any) => state.mode);

  if (mode === "hsk") {
    if (type === "word" || type === "sentence") {
      return <HskWordsView variant={variant} />;
    } else {
      return <HskCharacterView variant={variant} />;
    }
  }

  if (!queryStr?.toLowerCase()?.includes("hsk")) {
    return children;
  }

  if (type === "word" || type === "sentence") {
    return <HskWordsView variant={variant} />;
  } else {
    return <HskCharacterView variant={variant} />;
  }
};
