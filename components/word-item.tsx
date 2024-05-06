"use client";
import React from "react";

import Link from "next/link";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { cn } from "@/lib/utils";

export const WordItem = ({
  component: prop,
  lang,
}: {
  component: any;
  lang: any;
}) => {
  const { data: characters } = useListCharactersQuery();

  const character = characters?.find(
    (char: any) => (char?.input || char?.hanzi) === (prop?.input || prop?.hanzi)
  );

  return (
    <Link
      href={`/nmm/${prop?.input || prop?.hanzi}?lang=${lang || prop?.lang}`}
      key={JSON.stringify(prop)}
      className={`${character ? "dark:text-gray-400 text-gray-200" : "dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 flex items-center flex-col`}
    >
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
      <span className="text-2xl"> {prop.input || prop?.hanzi}</span>
      <span className="block text-sm"> {character?.en || prop.en}</span>
    </Link>
  );
};
