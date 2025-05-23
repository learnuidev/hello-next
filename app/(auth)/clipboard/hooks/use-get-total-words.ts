"use client";

import { useMemo } from "react";

import { useClipboardState } from "./use-clipboard-state";
import { useClipboardWords } from "./use-clipboard-words";
import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

export function useGetTotalWords() {
  const { state } = useClipboardState();

  const { words } = useClipboardWords();

  const lang = useGetCurrentLang();

  const { data: context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(state);

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

  return lang !== "zh" ? context?.length || 0 : totalWords;
}
