"use client";

import { ClipboardFooter } from "./components/clipboard-footer";
import { ClipboardHeader } from "./components/clipboard-header";
import { EditMode } from "./components/edit-mode";
import { ReadMode } from "./components/read-mode/read-mode";
import { _useClipboardState } from "./hooks/_use-clipboard-state";

export default function Clipboard() {
  const {
    lang,
    setWords,
    translations,
    setTranslations,
    mode,
    setMode,

    sentenceView,
    setSentenceView,
    totalWords,
  } = _useClipboardState();
  return (
    <main className="relative max-w-4xl mx-auto px-6">
      <ClipboardHeader
        lang={lang}
        totalWords={totalWords}
        sentenceView={sentenceView}
        setSentenceView={setSentenceView}
      />

      {mode === "read" ? (
        <ReadMode
          sentenceView={sentenceView}
          setSentenceView={setSentenceView}
          setWords={setWords}
          translations={translations}
          setTranslations={setTranslations}
        />
      ) : (
        <EditMode />
      )}

      <ClipboardFooter mode={mode} setMode={setMode} />
    </main>
  );
}
