"use client";

import { useRouter } from "next/navigation";
import { useSearchQueryStore } from "./search/state";
import React, { useEffect, useState } from "react";
import { Icons } from "./ui/icons.v2";

import { useDebouncedCallback } from "use-debounce";
import { SearchDialogDemo } from "./search-dialog";

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

export const SearchInput = () => {
  // const [querySync, setQuerySync] = useState("");
  const router = useRouter();

  const querySync = useSearchQueryStore((state) => state.querySync);
  const setQuerySync = useSearchQueryStore((state) => state.setQuerySync);

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

  const handleChangeDebounced = useDebouncedCallback(handleChange, 300);

  return (
    <input
      // autoFocus
      className="font-extralight border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300 dark:bg-black/10 dark:text-gray-300 placeholder:text-gray-400 opacity-100 border-2 w-[140px] md:w-[500px] focus:border-none px-2 rounded-full focus:outline-none active:outline-none"
      placeholder={"Search"}
      onChange={(event) => {
        setQuerySync(event?.target?.value);
        handleChangeDebounced(event?.target.value);
      }}
      value={querySync}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setQuery(() => "");
          setQuerySync(() => "");
        }
        if (event?.keyCode === 13) {
          router.push(`/nmm/${querySync}`);
        }
      }}
    />
  );
};
