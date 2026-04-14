"use client";

import { chineseConverter } from "mandarino/src/utils/chinese-converter";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent } from "react";

import { useDebouncedCallback } from "use-debounce";

import { getNavigationUrl } from "@/components/_search/get-navigation-url";
import { useListLanguages } from "@/components/languages-list";
import { useSearchQueryStore } from "@/components/search/state";
import { useAddContentMutation } from "@/domain/content/content.mutations";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useListHistoryQuery } from "@/domain/history/history.queries";
import { isTwitterUrl, isWebsite } from "@/lib/utils";
import { signOut } from "@/libs/cognito/auth";
import { isToday } from "./is-today";
import { useGetCurrentLang } from "./use-get-current-lang";
import { useGetLangParams } from "./use-get-lang-params";

import { useIsSearchTrackingEnabled } from "./use-is-search-tracking-enabled";

export const useHandleSearch = () => {
  const router = useRouter();
  const path = usePathname();

  const _lang = useGetLangParams();
  const _langState = useGetCurrentLang();
  const lang = _lang || _langState;

  // 1. State
  const querySync = useSearchQueryStore((state) => state.querySync);
  const setQuerySync = useSearchQueryStore((state) => state.setQuerySync);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  const setQuery2 = useSearchQueryStore((state) => state.setQuery2);

  // 2. Handlers
  const handleChange = (value: any) => {
    setQuery2(() => value);
  };

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
  const langItem = useGetCurrentLang();

  const addHistoryMutation = useAddHistoryMutation();

  const { data: history } = useListHistoryQuery();

  const addContentMutation = useAddContentMutation();

  const alreadySearchedToday = history?.Items?.filter(
    (item: any) => item?.input === querySync && isToday(history?.createdAt),
  );

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
        (lang) => lang?.id === querySync?.toLowerCase(),
      );

      const _isWebsite = isWebsite(querySync);

      const _isTweet = isTwitterUrl(querySync);

      if (_isWebsite || _isTweet) {
        alert("Not supported");
        return;
      }

      // if (_isTweet) {
      //   const newContent: any = {
      //     type: "tweet",
      //     contentType: "news",
      //     websiteUrl: querySync,
      //     lang: langItem,
      //   };
      //   console.log("add new content", newContent);

      //   addContentMutation.mutateAsync(newContent).then((resp) => {
      //     return router.push(`/convos/${resp?.id}`);
      //   });
      //   return null;
      // }

      // console.log("is website", _isWebsite);
      // console.log("LANG SELECTED", langItem);

      // return;

      // if (_isWebsite && langItem) {
      //   const newContent: any = {
      //     type: "website",
      //     contentType: "news",
      //     websiteUrl: querySync,
      //     lang: langItem,
      //   };
      //   console.log("add new content", newContent);

      //   addContentMutation.mutateAsync(newContent).then((resp) => {
      //     return router.push(`/convos/${resp?.id}`);
      //   });
      //   return null;
      // }

      // const _isLongText = isLongText(querySync);

      // if (_isLongText && langItem) {
      //   console.log("IS WEBSITE", _isWebsite);
      //   console.log("IS LONG TEXT", _isLongText);
      //   const newContent: any = {
      //     type: "text",
      //     contentType: "news",
      //     input: querySync,
      //     title: querySync?.split(`\n`)?.[0]?.slice(0, 42) || "todo",
      //     lang: langItem,
      //   };
      //   console.log("add new content", newContent);

      //   addContentMutation.mutateAsync(newContent).then((resp) => {
      //     return router.push(`/convos/${resp?.id}`);
      //   });
      //   return null;
      // }

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

        const selectedChar = chineseConverter(querySync);

        if (selectedChar === querySync) {
          router.push(`/nmm/${encodeURIComponent(querySync)}?lang=${lang}`);
        } else {
          router.push(
            `/nmm/${encodeURIComponent(selectedChar)}?lang=${lang}&trad=${querySync}`,
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
