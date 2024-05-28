"use client";
import React from "react";

import { useSearchParams } from "next/navigation";

import { WordsList } from "../words-list";

import { alphabetsDict } from "@/langs/alphabets-dict";

import { SentencesList } from "./sentences-list";

import { AlphabetItem } from "./alphabet-item";
import { useListDictionaryWords } from "./use-dictionary-words";
import { useLearnedWords } from "./use-learned-words";

export const LangPageView = ({ view }: any) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "";

  const { data: dictionaryWords } = useListDictionaryWords(lang);

  const { data: words } = useLearnedWords(lang);

  const alphabets = alphabetsDict?.[lang || ""];

  switch (view) {
    case "alphabets":
      return (
        <>
          <div className="mx-4 my-4 md:mx-16 flex flex-wrap items-center justify-center">
            {alphabets.map((prop: any) => {
              return <AlphabetItem lang={lang} prop={prop} key={prop?.input} />;
            })}
          </div>
        </>
      );

    case "dictionary":
      return <WordsList showWords={true} words={dictionaryWords} lang={lang} />;
    case "words":
      return <WordsList showWords={true} words={words} lang={lang} />;
    case "sentences":
      return <SentencesList lang={lang} />;

    default:
      return null;
  }
};
