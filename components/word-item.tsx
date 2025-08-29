"use client";
import React, { useState } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { formatComponentName } from "@/app/nmm/format-component-name";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useSearchQueryStore } from "./search/state";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { Icons } from "./ui/icons.v2";
import { useReadModeStore } from "@/stores/use-readmode-store";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";

// const [query, setQuery] = useState('')
// const [index, setIndex] = useState(0)
// const [queryResult, setQueryResult] = useState<any>(null)

export const useShowsStore = create((set: any, get: any) => ({
  shows: {},
  setShows: (f: any) =>
    typeof f === "function"
      ? set({ shows: f(get().shows) })
      : set({ shows: f }),
}));

export const WordItem = ({
  component: prop,
  lang,
}: {
  component: any;
  lang: any;
}) => {
  const query = useSearchQueryStore((state) => state.query);
  // const [show, setShow] = useState(false);
  const shows = useShowsStore((state) => state.shows) as any;
  const setShows = useShowsStore((state) => state.setShows) as any;
  const readMode = useReadModeStore((state) => state.readMode);
  const show = shows?.[prop?.input || prop?.hanzi];

  const setShow = (show: boolean) => {
    setShows({ ...shows, [prop?.input || prop?.hanzi]: show });
  };

  const addHistoryMutation = useAddHistoryMutation();
  const brightMode = useBrightModeStore((state) => state.mode);

  return (
    <div>
      <Link
        href={`/nmm/${prop?.input || prop?.hanzi}?lang=${prop?.lang || lang}`}
        key={JSON.stringify(prop)}
        onClick={() => {
          if (!addHistoryMutation.isPending) {
            // addHistoryMutation.mutate({
            //   // pathName: routeName,
            //   hanzi: prop?.input || prop?.hanzi,
            //   lang: prop?.lang || lang,
            //   query: query,
            //   contentId: prop?.id,
            //   eventType: "CONTENT_VIEWED",
            // } as any);
          }
        }}
        // className={`${prop ? "dark:text-gray-400 text-gray-200" : "dark:text-gray-600 text-gray-600"} dark:hover:text-white p-6 flex items-center flex-col`}
        className={cn(
          ` dark:hover:text-white p-6 flex items-center justify-center flex-col text-gray-200`
        )}
      >
        {readMode || show || brightMode ? (
          ["es", "fr", "ml", "no", "da"]?.includes(lang) ? null : (
            <span
              className={cn(
                "block p-0 m-0 text-sm",
                prop?.roman || prop?.pinyin ? "" : "text-black",
                "text-gray-700 dark:text-gray-300"
              )}
            >
              {prop?.roman || prop?.pinyin || ""}
            </span>
          )
        ) : (
          <span className={cn("block p-0 m-0 text-sm", "text-black")}>
            {prop?.roman || prop?.pinyin || ""}
          </span>
        )}
        <span
          onClick={() => {
            setShow(!!show);
          }}
          onMouseEnter={() => {
            setShow(true);
          }}
          onMouseLeave={() => {
            setShow(false);
          }}
          className={cn(
            "dark:text-gray-400 text-gray-700",
            "w-full text-center text-2xl  dark:hover:text-white hover:text-black transition-all"
          )}
        >
          {" "}
          {prop.input || prop?.hanzi}
          {prop?.hskLevel && (
            <sub className="dark:text-gray-700 text-xs pl-[2px]">
              {prop?.hskLevel}
            </sub>
          )}
        </span>
        {readMode || show || brightMode ? (
          <span className="block text-sm text-gray-500">
            {formatComponentName({ en: prop?.en || prop.en }, 1)}
          </span>
        ) : (
          <span className={cn("block p-0 m-0 text-sm", "text-black")}>
            {formatComponentName({ en: prop?.en || prop.en }, 1)}
          </span>
        )}
      </Link>

      {/* <button
        onClick={() => {
          setShow(!show);
        }}
        className="text-center w-full"
      >
        <Icons.glassesRound />
      </button> */}
    </div>
  );
};
