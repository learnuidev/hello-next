"use client";

import { useRouter } from "next/navigation";
import { useSearchQueryStore } from "./search/state";
import React, { ChangeEvent, KeyboardEvent } from "react";

import { useDebouncedCallback } from "use-debounce";

import { getNavigationUrl } from "./_search/get-navigation-url";
import { signOut } from "@/libs/cognito/auth";

export const SearchInput = () => {
  const router = useRouter();

  // 1. State
  const querySync = useSearchQueryStore((state) => state.querySync);
  const setQuerySync = useSearchQueryStore((state) => state.setQuerySync);
  const setQuery = useSearchQueryStore((state) => state.setQuery);

  // 2. Handlers
  const handleChange = (value: any) => {
    setQuery(() => value);
  };

  const handleChangeDebounced = useDebouncedCallback(handleChange, 300);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuerySync(event?.target?.value);
    handleChangeDebounced(event?.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setQuery(() => "");
      setQuerySync(() => "");
    }

    if (event?.keyCode === 13) {
      // 1. If the user wants to logout
      if (
        ["logout", "log", "so", "signout"]?.includes(querySync?.toLowerCase())
      ) {
        return signOut().then(() => {
          router.push("/login");
        });
      }

      // 2. Navigation
      const navigationUrl = getNavigationUrl(querySync);

      // If navigation url exists, get us to the page
      if (navigationUrl) {
        setQuery("");
        setQuerySync("");
        router.push(navigationUrl);
      } else {
        // Else perform search
        router.push(`/nmm/${querySync}`);
      }
    }
  };

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
