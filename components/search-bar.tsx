"use client";

import { useRouter } from "next/navigation";
import { useSearchQueryStore } from "./search/state";
import React from "react";

const indexOfAll = (str: any, w: any, res = [] as any): any => {
  const idx = str.indexOf(w);

  const wordLen = w.length;

  if (idx === -1) {
    return res;
  }
  const prevIndex = res[res.length - 1] ? wordLen : 0;
  const updatedRes = res.concat({
    index: idx + 1 + (prevIndex || 0) - wordLen,
  }) as any;
  return indexOfAll(str.slice(idx + 1), w, updatedRes);
};

export const SearchBar = () => {
  const router = useRouter();

  const query = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);

  return (
    <div className="h-12 hidden sm:block py-2 flex flex-row justify-center space-x-4 items-center">
      <div className="flex items-center justify-center"></div>

      <input
        className="dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300 dark:bg-black/10 dark:text-gray-300 placeholder:text-gray-400 opacity-100 transition-all  duration-400 ease-in border-2 w-[140px] md:w-[500px] focus:w-[600px] px-4 py-2 rounded-full focus:outline-none active:outline-none dark:border-gray-800"
        placeholder={"Search"}
        onChange={(event) => {
          setQuery(() => event?.target?.value);
        }}
        value={query}
        onKeyDown={(event) => {
          if (event?.keyCode === 13) {
            router.push(`/nmm/${query}`);
          }
        }}
      />
    </div>
  );
};
