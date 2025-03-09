"use client";

import { languages } from "@/app/next/features/phrase/languages";
import { useMemo, useState } from "react";
import { defaultState } from "../constants/default-state";

import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useFocusedStore = createIndexDBStore({
  name: "clipboard/focused-store",
  handler: (set: any, get: any) => ({
    focused: null,
    setFocused: (f: any) =>
      typeof f === "function"
        ? set({ focused: f(get().focused) })
        : set({ focused: f }),
  }),
});

export const useClipboardFocus = () => {
  const focused: any = useFocusedStore((state) => state.focused);
  const setFocused = useFocusedStore((state) => state.setFocused);

  return { focused, setFocused };
};

export const useClipboardStateStore = createIndexDBStore({
  name: "clipboard/state-store-2",
  handler: (set: any, get: any) => ({
    state: defaultState,
    setState: (f: any) =>
      typeof f === "function"
        ? set({ state: f(get().state) })
        : set({ state: f }),
  }),
});

export const useClipboardState = () => {
  const state: any = useClipboardStateStore((state) => state.state);
  const setState = useClipboardStateStore((state) => state.setState);

  return { state, setState };
};

export function _useClipboardState() {
  const lang = languages[0];
  const [words, setWords] = useState({});

  const { focused, setFocused } = useClipboardFocus();
  const [translations, setTranslations] = useState({});
  const [mode, setMode] = useState("edit");

  const { state, setState } = useClipboardState();

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
