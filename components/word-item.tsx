"use client";
import React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { formatComponentName } from "@/app/nmm/format-component-name";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useSearchQueryStore } from "./search/state";

export const WordItem = ({
  component: prop,
  lang,
}: {
  component: any;
  lang: any;
}) => {
  const query = useSearchQueryStore((state) => state.query);

  const addHistoryMutation = useAddHistoryMutation();

  return (
    <Link
      href={`/nmm/${prop?.input || prop?.hanzi}?lang=${prop?.lang || lang}`}
      key={JSON.stringify(prop)}
      onClick={() => {
        if (!addHistoryMutation?.isLoading) {
          addHistoryMutation.mutate({
            // pathName: routeName,
            hanzi: prop?.input || prop?.hanzi,
            lang: prop?.lang || lang,
            query: query,
            contentId: prop?.id,
            eventType: "CONTENT_VIEWED",
          } as any);
        }
      }}
      className={`${prop ? "dark:text-gray-400 text-gray-200" : "dark:text-gray-600 text-gray-600"} dark:hover:text-white p-6 flex items-center flex-col`}
    >
      {["es", "fr", "ml", "no", "da"]?.includes(lang) ? null : (
        <span
          className={cn(
            "block p-0 m-0 text-sm",
            prop?.roman || prop?.pinyin ? "" : "text-black"
          )}
        >
          {prop?.roman || prop?.pinyin || "yo"}
        </span>
      )}
      <span className="text-2xl"> {prop.input || prop?.hanzi}</span>
      <span className="block text-sm">
        {formatComponentName({ en: prop?.en || prop.en }, 1)}
      </span>
    </Link>
  );
};
