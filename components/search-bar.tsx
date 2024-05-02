"use client";

import { useRouter } from "next/navigation";
import { useSearchQueryStore } from "./search/state";
import React, { useEffect, useState } from "react";
import { Icons } from "./ui/icons.v2";

import { useDebouncedCallback } from "use-debounce";
import { SearchDialogDemo } from "./search-dialog";
import { SearchInput } from "./search-input";

export const SearchBar = () => {
  return (
    <div className="h-12 text-lg hidden sm:block py-2 flex flex-row justify-center items-end">
      {/* <SearchDialogDemo /> */}

      <Icons.magnifyingGlass />

      <SearchInput />
    </div>
  );
};
