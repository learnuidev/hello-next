"use client";
import React, { useEffect } from "react";

import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import Link from "next/link";
import { calculateColor } from "@/app/nmm/utils";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

export function HanziLink({
  character,
}: {
  character: { hanzi: string; hskLevel?: number };
}) {
  const { data: components } = useListComponents({ includeAll: true });

  const selectedComp = components?.find(
    (component: any) => component?.hanzi === character?.hanzi
  );

  const color = calculateColor({
    tone: selectedComp?.tone_level,
  });

  const { data: learnedCharacters2 } = useListCharactersQuery();

  const learnedChar = learnedCharacters2?.find(
    (char: any) => char?.hanzi === character?.hanzi
  );

  const { data: answers } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const lastAnswer = answers?.[answers?.length - 1];

  return (
    <div className="p-2 md:p-3">
      <Link
        href={
          `/nmm/${character.hanzi}?lang=zh` +
          (character?.hskLevel ? `&hsk=${character?.hskLevel}` : ``) +
          ""
        }
        onClick={() => {
          // addHistoryMutation.mutate({
          //   pathName: routeName,
          //   input: prop.input,
          //   lang: "zh",
          //   contentId: prop.id,
          //   eventType: "CONTENT_VIEWED",
          // } as any);
        }}
        className={`${
          // learnedCharacters.includes(prop?.hanzi)
          learnedChar
            ? learnedChar?.status === "forgotten"
              ? "text-yellow-500"
              : lastAnswer?.totalCharacters?.includes(character?.hanzi)
                ? "text-rose-500"
                : `hover:${color} text-gray-300`
            : selectedComp?.length > 1 || selectedComp?.group
              ? "dark:text-gray-500 text-gray-200"
              : "dark:text-gray-700 text-gray-200"
        } dark:hover:text-white p-3 text-2xl md:text-2xl transition lowercase`}
      >
        {character?.hanzi}
      </Link>
    </div>
  );
}
