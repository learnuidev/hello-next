"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { WordItem } from "../word-item";

import { frenchWords } from "@/langs/french/french-words";
import { WordsList } from "../words-list";

export function French() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "";

  return (
    <div className="grow">
      <WordsList words={frenchWords} lang={lang} />
    </div>
  );
}
