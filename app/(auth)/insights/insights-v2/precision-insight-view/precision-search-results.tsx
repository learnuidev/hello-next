"use client";

import { groupBy } from "ramda";

import { Icons } from "@/components/ui/icons.v2";
import { useState } from "react";
import { CharacterSearchResult } from "./character-search-result";
import { WordSearchResult } from "./word-search-result";

export const PrecisionSearchResults = ({ searchResults }: any) => {
  const [view, setView] = useState("character");
  const groupByHanzi = groupBy((val: any) => val.hanzi);
  const groupedByHanzi = groupByHanzi(searchResults) as any;

  if (!groupedByHanzi) {
    return null;
  }

  const finalView =
    view === "character" && !searchResults?.length ? "word" : view;
  return (
    <div>
      <div className="space-x-8 mt-8 sm:mt-0">
        <button
          onClick={() => {
            setView("character");
          }}
          className={finalView === "character" ? "text-white" : "text-gray-600"}
        >
          <Icons.compass className="text-2xl" />
        </button>
        <button
          className={finalView === "word" ? "text-white" : "text-gray-600"}
          onClick={() => {
            setView("word");
          }}
        >
          <Icons.seedling className="text-2xl" />
        </button>
      </div>
      {finalView === "character" ? (
        <CharacterSearchResult searchResults={searchResults} />
      ) : (
        <WordSearchResult />
      )}
    </div>
  );
};
