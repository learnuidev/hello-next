"use client";

import { useSearchQueryStore } from "@/components/search/state";
import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import React from "react";
import { HskCharacterView } from "./hsk-character-view";
import { HskWordsView } from "./hsk-words-view";

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

  const { mode } = useLearningMode();

  if (mode === "hsk" || mode === "hsk3") {
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
