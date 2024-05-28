"use client";
import React from "react";

import { useState } from "react";

import Link from "next/link";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

const useIsLearned = ({ characterId }: { characterId: string }) => {
  const { data } = useListCharactersQuery();

  return {
    data: data?.find((item: any) => item?.input === characterId),
  };
};

export const AlphabetItem = ({ prop, lang }: any) => {
  const { data } = useIsLearned({ characterId: prop?.input });
  return (
    <Link
      key={JSON.stringify(prop)}
      href={lang ? `/nmm/${prop.input}?lang=${lang}` : `/nmm/${prop.input}`}
      className={`${data ? "dark:text-white" : "dark:text-gray-500 text-gray-200"} dark:hover:text-white p-6 flex items-center flex-col lowercase`}
    >
      <span
        className={`block text-sm ${data ? "dark:text-slate-300" : "dark:text-slate-600"}`}
      >
        {prop?.roman}
      </span>

      <span className="text-4xl"> {prop.input}</span>
      <span className="text-sm trim text-gray-600">
        {" "}
        {prop?.sound?.split(" ")?.[0]}
      </span>
    </Link>
  );
};
