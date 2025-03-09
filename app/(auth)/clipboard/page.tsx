"use client";

import { ClipboardFooter } from "./components/clipboard-footer";
import { ClipboardHeader } from "./components/clipboard-header";
import { EditMode } from "./components/edit-mode";
import { ReadMode } from "./components/read-mode";
import { useClipboardState } from "./hooks/use-clipboard-state";

export default function Clipboard() {
  const {
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
  } = useClipboardState();
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

      <ClipboardFooter mode={mode} setState={setState} setMode={setMode} />
    </main>
  );
}
