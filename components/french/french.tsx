"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { WordItem } from "../word-item";

import { frenchWords } from "@/langs/french/french-words";

export function French() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "";

  return (
    <div className="grow">
      <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
        {frenchWords.map((prop: any) => {
          return (
            <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
          );
        })}
      </div>
    </div>
  );
}
