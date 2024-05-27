"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent } from "react";

import { useDebouncedCallback } from "use-debounce";

import { signOut } from "@/libs/cognito/auth";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useSearchQueryStore } from "@/components/search/state";
import { getNavigationUrl } from "@/components/_search/get-navigation-url";
import { useListLanguages } from "@/components/languages-list";

export const useHandleSearch = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

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

  const langs = useListLanguages();

  const addHistoryMutation = useAddHistoryMutation();

  // TODO: Fix this
  const isSearchTrackingEnabled = true;

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setQuery(() => "");
      setQuerySync(() => "");
    }

    if (event?.keyCode === 13) {
      // 2. If the user selects a lang
      const langSelected = langs?.find(
        (lang) => lang?.id === querySync?.toLowerCase()
      );

      console.log("LANG SELECTED", langSelected);
      console.log("LANGS", langs);

      if (langSelected) {
        setQuery("");
        setQuerySync("");
        router.push(`/nmm?lang=${langSelected?.id}`);
        return null;
      }
      // 1. If the user wants to logout
      if (
        ["logout", "log", "so", "signout"]?.includes(querySync?.toLowerCase())
      ) {
        return signOut().then(() => {
          setQuerySync(() => "");
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
        if (isSearchTrackingEnabled) {
          addHistoryMutation.mutate({
            input: querySync,
            lang,
            eventType: "SEARCH",
          } as any);
        }

        router.push(`/nmm/${querySync}`);
      }
    }
  };

  return {
    handleOnChange,
    handleOnKeyDown,
  };
};
