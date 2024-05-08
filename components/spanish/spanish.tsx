"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { WordItem } from "../word-item";
import { spanishWords } from "@/langs/spanish/spanish-words";
import { WordsList } from "../words-list";

export function Spanish() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "";

  return (
    <div className="grow">
      <WordsList words={spanishWords} lang={lang} />
    </div>
  );
}
