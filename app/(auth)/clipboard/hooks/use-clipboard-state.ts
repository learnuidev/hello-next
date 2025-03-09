"use client";

import { languages } from "@/app/next/features/phrase/languages";
import { useMemo, useState } from "react";
import { defaultState } from "../constants/default-state";

export function useClipboardState() {
  const lang = languages[0];
  const [words, setWords] = useState({});
  const [focused, setFocused] = useState(null);
  const [translations, setTranslations] = useState({});
  const [mode, setMode] = useState("edit");
  const [state, setState] = useState(defaultState);
  const [pinyinView, setPinyinView] = useState(false);
  const [sentenceView, setSentenceView] = useState(true);
  const [hskView, setHskView] = useState(false);

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

  return {
    lang,
    setWords,
    focused,
    setFocused,
    translations,
    setTranslations,
    mode,
    setMode,
    state,
    setState,
    pinyinView,
    setPinyinView,
    sentenceView,
    setSentenceView,
    hskView,
    setHskView,
    totalWords,
  };
}
