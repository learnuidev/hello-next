"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { WordItem } from "../word-item";

import { frenchWords } from "@/langs/french/french-words";
import { WordsList } from "../words-list";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

export function French() {
  const searchParams = useSearchParams();
  const lang = useGetCurrentLang();
  return (
    <div className="grow">
      <WordsList words={frenchWords} lang={lang} />
    </div>
  );
}
