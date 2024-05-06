"use client";
import React from "react";

import Link from "next/link";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { cn } from "@/lib/utils";

export const WordItem = ({ component: prop }: { component: any }) => {
  const { data: characters } = useListCharactersQuery();

  const character = characters?.find(
    (char: any) => char?.input === prop?.input
  );

  return (
    <Link
      href={`/nmm/${prop?.input}?lang=${prop?.lang}`}
      key={JSON.stringify(prop)}
      className={`${character ? "dark:text-gray-400 text-gray-200" : "dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 flex items-center flex-col`}
    >
      <span
        className={cn(
          "block p-0 m-0 text-sm",
          prop?.roman || character?.roman ? "" : "text-black"
        )}
      >
        {prop?.roman || character?.roman || "yo"}
      </span>
      <span className="text-2xl"> {prop.input}</span>
      <span className="block text-sm"> {character?.en || prop.en}</span>
    </Link>
  );
};
