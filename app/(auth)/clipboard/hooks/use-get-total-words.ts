"use client";

import { useMemo } from "react";

import { useClipboardState } from "./use-clipboard-state";
import { useClipboardWords } from "./use-clipboard-words";

export function useGetTotalWords() {
  const { state } = useClipboardState();

  const { words } = useClipboardWords();

  const wordsList = Object.entries(words)
    .filter((item) => state?.includes(item?.[0]))
    ?.map((item) => item?.[1])
    ?.flat();

  const uniqueWordsList = useMemo(() => {
    return [
      ...new Set(wordsList?.map((item: any) => item?.pinyin).filter(Boolean)),
    ];
  }, [wordsList]);

  const totalWords = uniqueWordsList?.length || 0;

  return totalWords;
}
