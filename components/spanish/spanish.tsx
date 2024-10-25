"use client";

import React from "react";
import { spanishWords } from "@/langs/spanish/spanish-words";
import { WordsList } from "../words-list";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

export function Spanish() {
  const lang = useGetCurrentLang();
  return (
    <div className="grow">
      <WordsList words={spanishWords} lang={lang} />
    </div>
  );
}
