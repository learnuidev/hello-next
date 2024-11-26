"use client";

import { Icons } from "./ui/icons.v2";

import { SearchInput } from "./search-input";
import { useSearchState } from "./use-search-state";

export const SearchBar = ({ autoFocus }: { autoFocus?: boolean }) => {
  const setSearchBarOpen = useSearchState((state) => state.setSearchBarOpen);
  return (
    <div
      className="cursor-pointer text-lg py-2 flex flex-row justify-center items-center"
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

      <SearchInput autoFocus={autoFocus} />
    </div>
  );
};
