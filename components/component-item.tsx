"use client";
import React from "react";

import Link from "next/link";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const ComponentItem = ({
  component: prop,
  lang,
}: {
  component: string;
  lang: string;
}) => {
  const { data: characters } = useListCharactersQuery();

  const character = characters?.find((char: any) => char?.input === prop);

  return (
    <Link
      key={JSON.stringify(prop)}
      href={lang ? `/nmm/${prop}?lang=${lang}` : `/nmm/${prop}`}
      className={`${character ? "dark:text-gray-400 text-gray-200" : "dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 flex items-center flex-col`}
    >
      <span className={`block text-sm dark:text-slate-600`}>
        {character?.roman}
      </span>

      <span className="text-4xl"> {prop}</span>

      {/* <span className={`block text-sm dark:text-slate-600`}>
        {character?.en}
      </span> */}
    </Link>
  );
};
