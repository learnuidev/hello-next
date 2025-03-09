"use client";

import { ClipboardFooter } from "./components/clipboard-footer";
import { ClipboardHeader } from "./components/clipboard-header";
import { EditMode } from "./components/edit-mode";
import { ReadMode } from "./components/read-mode/read-mode";
import { _useClipboardState } from "./hooks/_use-clipboard-state";
import { useClipboardViewMode } from "./hooks/use-clipboard-view-mode";

export default function Clipboard() {
  const {
    translations,
    setTranslations,

    totalWords,
  } = _useClipboardState();

  const { mode } = useClipboardViewMode();
  return (
    <main className="relative max-w-4xl mx-auto px-6">
      <ClipboardHeader totalWords={totalWords} />

      {mode === "read" ? (
        <ReadMode
          translations={translations}
          setTranslations={setTranslations}
        />
      ) : (
        <EditMode />
      )}

      <ClipboardFooter />
    </main>
  );
}
