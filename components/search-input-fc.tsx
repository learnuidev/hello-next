"use client";

import { useRouter } from "next/navigation";

import { useSearchState } from "@/components/use-search-state";

import { useEffect, useState } from "react";
import { useSearchQueryStore } from "@/components/search/state";
import { useDebouncedCallback } from "use-debounce";
import { NmmCoreComponents } from "@/app/nmm/nmm-core-components";

export const SearchInputFC = () => {
  const isSearchBarOpen = useSearchState((state) => state.isSearchBarOpen);
  const setSearchBarOpen = useSearchState((state) => state.setSearchBarOpen);
  const querySync = useSearchQueryStore((state) => state.querySync);
  const setQuerySync = useSearchQueryStore((state) => state.setQuerySync);

  // const [querySync, setQuerySync] = useState("");
  const router = useRouter();

  const query = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);

  const handleChange = (value: any) => {
    setQuery(() => value);
  };

  useEffect(() => {
    if (query !== querySync) {
      setQuerySync(query);
    }
  }, []);

  const handleChangeDebounced = useDebouncedCallback(handleChange, 400);

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          if (isSearchBarOpen) {
            setSearchBarOpen(false);
          }
        }

        // if (event.key === "s") {
        //   if (isSearchBarOpen) {
        //     setSearchBarOpen(false);
        //   } else {
        //     setSearchBarOpen(true);
        //   }
        // }
      }}
      className="flex justify-center"
    >
      <div className="blur-[0px] fixed top-[120px] mx-auto z-50 w-full">
        <div className="px-32">
          <input
            className="px-2 text-4xl font-extralight border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300 dark:bg-black/10 dark:text-gray-300 placeholder:text-gray-400 opacity-100 border-2 w-[140px] md:w-[500px] focus:border-none rounded-full focus:outline-none active:outline-none"
            // className="bg-transparent text-white text-3xl w-full h-16"
            autoFocus
            placeholder="Search anything"
            onChange={(event) => {
              setQuerySync(event?.target?.value);
              handleChangeDebounced(event?.target.value);
            }}
            value={querySync}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setQuery(() => "");
                setQuerySync(() => "");
                setSearchBarOpen(false);
              }
              if (event?.keyCode === 13) {
                router.push(`/nmm/${querySync}`);
                setQuery(() => "");
                setQuerySync(() => "");
                setSearchBarOpen(false);
              }
            }}
          />

          <div className="my-16 px-2">{query && <NmmCoreComponents />}</div>
        </div>
      </div>
    </div>
  );
};
