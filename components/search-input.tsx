"use client";

import { useHandleSearch } from "@/hooks/use-handle-search";
import { cn } from "@/lib/utils";
import { useSearchQueryStore } from "./search/state";

export const SearchInput = ({ autoFocus }: { autoFocus?: boolean }) => {
  // 1. State
  const querySync = useSearchQueryStore((state) => state.querySync);

  // 2. Handlers
  const { handleOnChange, handleOnKeyDown } = useHandleSearch();

  return (
    <input
      autoFocus={autoFocus === false ? false : true}
      className={cn(
        "font-extralight border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300 dark:bg-black/10 dark:text-gray-300 placeholder:text-gray-600 opacity-100 border-2 focus:border-none px-2 rounded-full focus:outline-none active:outline-none py-2",
        "w-full md:w-[800px]"
      )}
      placeholder={"Search"}
      onChange={handleOnChange}
      value={querySync}
      onKeyDown={handleOnKeyDown}
    />
  );
};
