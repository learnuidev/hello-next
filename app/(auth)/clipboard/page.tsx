"use client";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { ClipboardFooter } from "./components/clipboard-footer";
import { ClipboardHeader } from "./components/clipboard-header";
import { EditMode } from "./components/edit-mode";
import { ReadMode } from "./components/read-mode/read-mode";
import { useClipboardViewMode } from "./hooks/use-clipboard-view-mode";
import { useListDictionaryQuery } from "./hooks/use-list-dictionary-query";

export default function Clipboard() {
  const { mode } = useClipboardViewMode();

  const lang = useGetCurrentLang();

  const { data } = useListDictionaryQuery(lang);

  return (
    <main className="relative max-w-4xl mx-auto px-6">
      <ClipboardHeader />

      {mode === "read" ? <ReadMode /> : <EditMode />}

      <ClipboardFooter />
    </main>
  );
}
