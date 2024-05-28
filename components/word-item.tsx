"use client";
import React from "react";

import Link from "next/link";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { cn } from "@/lib/utils";
import { formatComponentName } from "@/app/nmm/format-component-name";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useSearchQueryStore } from "./search/state";
import { useListComponents } from "@/domain/lesson/component.queries";

export const WordItem = ({
  component: prop,
  lang,
}: {
  component: any;
  lang: any;
}) => {
  const { data: characters } = useListCharactersQuery();
  const { data: components } = useListComponents();

  const query = useSearchQueryStore((state) => state.query);

  const addHistoryMutation = useAddHistoryMutation();

  const character = [...(characters || []), ...(components || [])]
    ?.filter(
      (char: any) =>
        (char?.input || char?.hanzi) === (prop?.input || prop?.hanzi)
    )
    ?.find((item) => item?.en);

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
      className={`${character ? "dark:text-gray-400 text-gray-200" : "dark:text-gray-600 text-gray-600"} dark:hover:text-white p-6 flex items-center flex-col`}
    >
      {["es", "fr", "ml", "no", "da"]?.includes(lang) ? null : (
        <span
          className={cn(
            "block p-0 m-0 text-sm",
            prop?.roman || character?.roman || character?.pinyin || prop?.pinyin
              ? ""
              : "text-black"
          )}
        >
          {prop?.roman ||
            character?.roman ||
            character?.pinyin ||
            prop?.pinyin ||
            "yo"}
        </span>
      )}
      <span className="text-2xl"> {prop.input || prop?.hanzi}</span>
      <span className="block text-sm">
        {" "}
        {formatComponentName({ en: character?.en || prop.en }, 1)}
      </span>
    </Link>
  );
};
