"use client";

import { useSearchQueryStore } from "./search/state";
import React from "react";
import { useHandleSearch } from "@/hooks/use-handle-search";

export const SearchInput = () => {
  // 1. State
  const querySync = useSearchQueryStore((state) => state.querySync);

  // 2. Handlers
  const { handleOnChange, handleOnKeyDown } = useHandleSearch();

  return (
    <input
      // autoFocus
      className="font-extralight border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300 dark:bg-black/10 dark:text-gray-300 placeholder:text-gray-400 opacity-100 border-2 w-[140px] md:w-[500px] focus:border-none px-2 rounded-full focus:outline-none active:outline-none"
      placeholder={"Search"}
      onChange={handleOnChange}
      value={querySync}
      onKeyDown={handleOnKeyDown}
    />
  );
};
