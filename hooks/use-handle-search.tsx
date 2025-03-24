"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent } from "react";

import { useDebouncedCallback } from "use-debounce";

import { getNavigationUrl } from "@/components/_search/get-navigation-url";
import { useListLanguages } from "@/components/languages-list";
import { useSearchQueryStore } from "@/components/search/state";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { traditionalToSimplified } from "@/langs/chinese /traditiona-to-simplified";
import { signOut } from "@/libs/cognito/auth";
import { useGetLangParams } from "./use-get-lang-params";
import { useIsDu } from "./use-is-du";
import { useIsSearchTrackingEnabled } from "./use-is-search-tracking-enabled";
import { useListHistoryQuery } from "@/domain/history/history.queries";
import { isToday } from "./is-today";

export const useHandleSearch = () => {
  const router = useRouter();
  const path = usePathname();

  const lang = useGetLangParams();

  // 1. State
  const querySync = useSearchQueryStore((state) => state.querySync);
  const setQuerySync = useSearchQueryStore((state) => state.setQuerySync);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  const setQuery2 = useSearchQueryStore((state) => state.setQuery2);

  // 2. Handlers
  const handleChange = (value: any) => {
    setQuery2(() => value);
  };

  const isDu = useIsDu();

  const handleChangeDebounced = useDebouncedCallback(handleChange, 300);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuerySync(event?.target?.value);

    // if (isDu) {
    //   return;
    // }
    handleChangeDebounced(event?.target.value);
  };

  const handleCourseOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuerySync(event?.target?.value);
  };

  const langs = useListLanguages();

  const addHistoryMutation = useAddHistoryMutation();

  const { data: history } = useListHistoryQuery();

  console.log("HISTORY", history);

  const alreadySearchedToday = history?.Items?.filter(
    (item: any) => item?.input === querySync && isToday(history?.createdAt)
  );

  console.log("ALREADY SEARCHED", alreadySearchedToday);

  // TODO: Fix this
  const isSearchTrackingEnabled = useIsSearchTrackingEnabled();

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setQuery(() => "");
      setQuery2(() => "");
      setQuerySync(() => "");
    }

    if (event?.keyCode === 13) {
      // 2. If the user selects a lang
      const langSelected = langs?.find(
        (lang) => lang?.id === querySync?.toLowerCase()
      );

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
        if (
          isSearchTrackingEnabled &&
          querySync?.toLowerCase() !== "ll" &&
          alreadySearchedToday?.length === 0
        ) {
          addHistoryMutation.mutate({
            input: querySync,
            lang,
            eventType: "SEARCH",
          } as any);
        }

        const selectedChar = traditionalToSimplified(querySync);

        if (selectedChar === querySync) {
          router.push(`/nmm/${encodeURIComponent(querySync)}`);
        } else {
          router.push(
            `/nmm/${encodeURIComponent(selectedChar)}?lang=zh&trad=${querySync}`
          );
        }
      }
    }
  };

  return {
    handleOnChange: path?.includes("/courses")
      ? handleCourseOnChange
      : handleOnChange,
    handleOnKeyDown,
  };
};
