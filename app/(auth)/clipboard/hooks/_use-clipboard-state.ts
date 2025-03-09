"use client";

import { useMemo } from "react";

import { useClipboardFocus } from "./use-clipboard-focus";
import { useClipboardHskView } from "./use-clipboard-hsk-view";
import { useClipboardPinyinView } from "./use-clipboard-pinyin-view";
import { useClipboardSentenceView } from "./use-clipboard-sentence-view";
import { useClipboardState } from "./use-clipboard-state";
import { useClipboardTranslations } from "./use-clipboard-translations";
import { useClipboardViewMode } from "./use-clipboard-view-mode";
import { useClipboardWords } from "./use-clipboard-words";

export function _useClipboardState() {
  const { words, setWords } = useClipboardWords();

  const { focused, setFocused } = useClipboardFocus();

  const { translations, setTranslations } = useClipboardTranslations();

  const { mode, setMode } = useClipboardViewMode();

  const { state, setState } = useClipboardState();

  const { pinyinView, setPinyinView } = useClipboardPinyinView();

  const { sentenceView, setSentenceView } = useClipboardSentenceView();

  const { hskView, setHskView } = useClipboardHskView();

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
