"use client";

import { useRouter } from "next/navigation";
import { useSearchQueryStore } from "./search/state";
import React, { useEffect, useState } from "react";
import { Icons } from "./ui/icons.v2";

import { useDebouncedCallback } from "use-debounce";
import { SearchDialogDemo } from "./search-dialog";
import { SearchInput } from "./search-input";
import { useSearchState } from "./use-search-state";

export const SearchBar = () => {
  const setSearchBarOpen = useSearchState((state) => state.setSearchBarOpen);
  return (
    <div
      className="cursor-pointer text-lg sm:block py-2 flex flex-row justify-center items-center"
      // onClick={() => {
      //   // alert("yo");
      //   setSearchBarOpen(true);
      // }}
    >
      {/* <SearchDialogDemo /> */}

      <Icons.magnifyingGlass
      // onClick={() => {
      //   setSearchBarOpen(true);
      // }}
      />

      <SearchInput />
    </div>
  );
};
