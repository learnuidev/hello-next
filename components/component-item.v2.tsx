"use client";
import React from "react";

import Link from "next/link";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export const ComponentItemV2 = ({
  component,
  lang,
}: {
  component: {
    input: string;
    en: string;
    lang: string;
    roman: string;
  };
  lang: string;
}) => {
  const { data: characters } = useListCharactersQuery();

  const character = characters?.find(
    (char: any) => char?.input === component?.input
  );

  return (
    <Link
      key={JSON.stringify(component?.input)}
      href={
        lang
          ? `/nmm/${component?.input}?lang=${lang}`
          : `/nmm/${component?.input}`
      }
      className={`${character ? "dark:text-gray-400 text-gray-200" : "dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 flex items-center flex-col`}
    >
      <span className={`block text-sm dark:text-slate-600`}>
        {character?.roman}
      </span>

      <span className="text-4xl"> {component?.input}</span>

      {/* <span className={`block text-sm dark:text-slate-600`}>
        {character?.en}
      </span> */}
    </Link>
  );
};
