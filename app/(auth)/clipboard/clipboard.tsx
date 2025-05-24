"use client";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { ClipboardFooter } from "./components/clipboard-footer";
import { ClipboardHeader } from "./components/clipboard-header";
import { EditMode } from "./components/edit-mode";
import { ReadMode } from "./components/read-mode/read-mode";
import { useClipboardViewMode } from "./hooks/use-clipboard-view-mode";
import { useListDictionaryQuery } from "./hooks/use-list-dictionary-query";
import { useEffect } from "react";
import { useClipboardState } from "./hooks/use-clipboard-state";

export function Clipboard({
  content,
  lang,
}: {
  content?: string;
  lang: string;
}) {
  const { mode, setMode } = useClipboardViewMode();
  const { state, setState } = useClipboardState();

  const { data } = useListDictionaryQuery(lang);

  useEffect(() => {
    if (content) {
      setState(content);
    }
  }, [content, setState]);

  return (
    <main className="relative max-w-4xl mx-auto px-6">
      <ClipboardHeader lang={lang} />

      {mode === "read" ? <ReadMode lang={lang} /> : <EditMode />}

      <ClipboardFooter />
    </main>
  );
}
