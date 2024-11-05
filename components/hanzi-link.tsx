"use client";
import React, { useEffect, useMemo } from "react";

import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import Link from "next/link";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";
import { cn } from "@/lib/utils";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";

interface HSKCharacter {
  hanzi: string;
  hskLevel?: number;
  pinyin: string;
  en: string;
}

export function HanziLink({
  className,
  character,
  frequency = 0,
  lang,
}: {
  character: HSKCharacter;
  className?: string;
  frequency?: number;
  lang?: string;
}) {
  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const selectedComp = useMemo(
    () =>
      components?.find(
        (component: any) => component?.hanzi === character?.hanzi
      ),
    [components, character]
  );

  const color = calculateColor({
    tone: selectedComp?.tone_level,
  });

  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();

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
    <div
      className={cn(
        "p-2 md:p-3 flex flex-col items-center justify-center",
        className
      )}
    >
      <p
        className={cn(
          "top-0 text-xs text-gray-400",
          brightMode ? "text-gray-600" : "dark:text-gray-800 text-gray-200",
          className
        )}
      >
        {character?.pinyin || selectedComp?.pinyin}
      </p>
      <Link
        href={
          `/nmm/${character?.hanzi}?lang=zh` +
          (character?.hskLevel ? `&hsk=${character?.hskLevel}` : ``) +
          (lang ? `&content=${lang}` : ``) +
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
          brightMode || isCharactersLoading || isComponentsLoading
            ? "dark:text-gray-300 text-gray-700"
            : // learnedCharacters.includes(prop?.hanzi)
              learnedChar
              ? learnedChar?.status === "forgotten"
                ? "dark:text-gray-900 text-gray-100"
                : `hover:${color} text-gray-300`
              : selectedComp?.length > 1 || selectedComp?.group
                ? "dark:text-gray-500 text-gray-200"
                : // : lastAnswer?.totalCharacters?.includes(character?.hanzi)
                  //   ? "dark:text-yellow-500"
                  "dark:text-gray-700 text-gray-200"
        } dark:hover:text-white text-2xl md:text-2xl transition lowercase`}
      >
        {frequency > 0 && (
          <sub className="dark:text-gray-700 text-xs pl-[2px]">{frequency}</sub>
        )}

        {character?.hanzi?.split("")?.map((val, idx) => {
          const learnedChar = learnedCharacters2?.find(
            (char: any) => char?.hanzi === val
          );

          const color = calculateColor({
            tone: learnedChar?.tone_level,
          });

          if (val === "什") {
            // alert(val);
            console.log("LEARNED CHAR", learnedChar);
          }

          return (
            <span
              key={`${val}-${idx}`}
              className={`${
                brightMode || isCharactersLoading || isComponentsLoading
                  ? "dark:text-gray-300 text-gray-700"
                  : learnedChar
                    ? learnedChar?.status === "forgotten"
                      ? "dark:text-gray-900 text-gray-100"
                      : `hover:${color} text-gray-300`
                    : lastAnswer?.totalCharacters?.includes(character?.hanzi)
                      ? "text-yellow-500"
                      : selectedComp?.length > 1 || selectedComp?.group
                        ? "dark:text-gray-500 text-gray-200"
                        : "dark:text-gray-700 text-gray-200"
              } dark:hover:text-white text-2xl md:text-2xl transition lowercase`}
            >
              {val}
            </span>
          );
        })}

        {character?.hskLevel && (
          <sub className="dark:text-gray-700 text-xs pl-[2px]">
            {character?.hskLevel}
          </sub>
        )}
      </Link>

      <p
        className={cn(
          "text-xs text-gray-400 w-16 truncate text-center",
          brightMode ? "text-gray-500" : "dark:text-gray-800 text-gray-200"
        )}
      >
        {character?.en || selectedComp?.en}
      </p>
    </div>
  );
}
