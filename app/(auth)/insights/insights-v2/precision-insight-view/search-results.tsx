"use client";

import { Icons } from "@/components/ui/icons.v2";
import { useState } from "react";
import { CharacterSearchResult } from "./character-search-result";
import { WordSearchResult } from "./word-search-result";
import { SearchHistoryResult } from "./search-history-result";

export const SearchResults = ({ searchResults }: any) => {
  const [view, setView] = useState("search");

  // const finalView =
  //   view === "character" && !searchResults?.length ? "word" : view;
  return (
    <div>
      <div className="space-x-8 mt-8 sm:mt-0">
        <button
          className={
            view === "search"
              ? "dark:text-white"
              : "text-gray-300 dark:text-gray-600"
          }
          onClick={() => {
            setView("search");
          }}
        >
          <Icons.magnifyingGlass className="text-2xl" />
        </button>

        <button
          onClick={() => {
            setView("character");
          }}
          className={
            view === "character"
              ? "dark:text-white"
              : "text-gray-300 dark:text-gray-600"
          }
        >
          <Icons.compass className="text-2xl" />
        </button>
        <button
          className={
            view === "word"
              ? "dark:text-white"
              : "text-gray-300 dark:text-gray-600"
          }
          onClick={() => {
            setView("word");
          }}
        >
          <Icons.seedling className="text-2xl" />
        </button>
      </div>
      {view === "character" ? (
        <CharacterSearchResult searchResults={searchResults} />
      ) : view === "search" ? (
        <SearchHistoryResult />
      ) : (
        <WordSearchResult />
      )}
    </div>
  );
};
