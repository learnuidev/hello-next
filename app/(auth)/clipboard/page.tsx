"use client";

import { languages } from "@/app/next/features/phrase/languages";
import { Icons } from "@/components/ui/icons.v2";
import { useMemo, useState } from "react";
import { ClipboardHeader } from "./components/clipboard-header";
import { EditMode } from "./components/edit-mode";
import { ReadMode } from "./components/read-mode";
import { defaultState } from "./constants/default-state";

export default function Clipboard() {
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
  return (
    <main className="relative max-w-4xl mx-auto px-6">
      <ClipboardHeader
        setState={setState}
        lang={lang}
        totalWords={totalWords}
        pinyinView={pinyinView}
        setPinyinView={setPinyinView}
        sentenceView={sentenceView}
        setSentenceView={setSentenceView}
        hskView={hskView}
        setHskView={setHskView}
      />

      {mode === "read" ? (
        <ReadMode
          pinyinView={pinyinView}
          setPinyinView={setPinyinView}
          sentenceView={sentenceView}
          setSentenceView={setSentenceView}
          hskView={hskView}
          setHskView={setHskView}
          focused={focused}
          setFocused={setFocused}
          state={state}
          setWords={setWords}
          translations={translations}
          setTranslations={setTranslations}
        />
      ) : (
        <EditMode state={state} setState={setState} />
      )}

      <footer className="w-full max-w-4xl sm:pr-0 pr-12 fixed bottom-0 py-8 z-30 dark:bg-[rgb(9,10,11)]/75 bg-white/75 dark:bg-react/75 backdrop-blur-sm">
        <div className="grid grid-cols-3 justify-between w-full">
          <button
            className="w-12 justify-self-start"
            onClick={() => {
              setState("");
            }}
          >
            <Icons.trash className="text-2xl" />
          </button>
          {mode === "read" ? (
            <button
              className="dark:bg-[rgb(31,32,33)]  bg-gray-100 px-4 sm:px-8 py-2 rounded-full justify-self-center"
              onClick={() => {
                setMode("edit");
              }}
            >
              <Icons.bookOpen />
              <span className="pl-2"> Edit</span>
            </button>
          ) : (
            <button
              className="bg-rose-500 text-white  px-4 sm:px-8 py-2 rounded-full justify-self-center"
              onClick={() => {
                setMode("read");
              }}
            >
              <Icons.bookOpen />
              <span className="pl-2"> Read</span>
            </button>
          )}
          <button
            className="w-12  justify-self-end"
            onClick={() => {
              setState(defaultState);
            }}
          >
            <Icons.clipboard className="text-2xl" />
          </button>
        </div>
      </footer>
    </main>
  );
}
