"use client";
import React, { useEffect, useMemo } from "react";

import {
  useListComponents,
  useListComponentsMapQuery,
} from "@/domain/lesson/component.queries";
import {
  useListCharactersMapQuery,
  useListCharactersQuery,
} from "@/domain/lesson/character.queries";

import Link from "next/link";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useBrightModeStore } from "./settings-dialog/use-bright-mode-store";
import { cn } from "@/lib/utils";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useCanTrackFunction } from "./use-can-track-function";
import { CharacterItem } from "./_select-character/character-item";
import { smartSplit } from "./youtube-page/utils/smart-split";

interface HSKCharacter {
  input?: string;
  hanzi: string;
  hskLevel?: number;
  pinyin: string;
  en?: string;
  roman?: string;
}

export function HanziLink({
  className,
  character,
  frequency = 0,
  lang,
  enableTracking = false,
}: {
  character: HSKCharacter;
  className?: string;
  frequency?: number;
  lang?: string;
  enableTracking?: boolean;
}) {
  const { data: components, isLoading: isComponentsLoading } =
    useListComponentsMapQuery();

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const selectedComp = useMemo(
    () => components?.[character?.input || character?.hanzi],
    [components, character]
  ) as any;

  const color = calculateColor({
    ...selectedComp,
    tone: selectedComp?.tone_level,
  });

  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersMapQuery();

  const learnedChar =
    learnedCharacters2?.[character?.input || character?.hanzi];

  const { data: answers } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { trackFunction } = useCanTrackFunction(character, {
    type: "word",
  });

  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

  return (
    <div
      className={cn(
        "p-2 md:p-3 flex flex-col items-center justify-center",
        className
      )}
    >
      {showPinyin && (
        <p
          className={cn(
            "top-0 text-xs text-black dark:text-gray-400 w-24 text-center truncate",

            className
          )}
        >
          {character?.pinyin || selectedComp?.pinyin || character?.roman}
        </p>
      )}
      <Link
        href={
          `/nmm/${character?.input || character?.hanzi}?lang=${lang || "zh"}` +
          (character?.hskLevel ? `&hsk=${character?.hskLevel}` : ``) +
          (lang ? `&content=${lang}` : ``) +
          ""
        }
        onClick={() => {
          if (enableTracking) {
            trackFunction();
          }
          // addHistoryMutation.mutate({
          //   pathName: routeName,
          //   input: prop.input,
          //   lang: "zh",
          //   contentId: prop.id,
          //   eventType: "CONTENT_VIEWED",
          // } as any);
        }}
        className={cn(
          `${
            brightMode || isCharactersLoading || isComponentsLoading
              ? "dark:text-gray-300 text-gray-700"
              : // learnedCharacters.includes(prop?.hanzi)
                learnedChar
                ? learnedChar?.status === "forgotten"
                  ? "dark:text-gray-900 text-gray-100"
                  : `hover:${color} text-gray-300`
                : selectedComp?.length > 1 || selectedComp?.group
                  ? "dark:text-gray-500 text-gray-200"
                  : // : lastAnswer?.totalCharacters?.includes(character?.input || character?.hanzi)
                    //   ? "dark:text-yellow-500"
                    "dark:text-gray-700 text-gray-200"
          } dark:hover:text-white text-2xl md:text-2xl transition lowercase w-28 text-center`
          // "flex flex-col items-center"
        )}
      >
        {frequency > 0 && (
          <sub
            className={cn(
              `${
                brightMode || isCharactersLoading || isComponentsLoading
                  ? "dark:text-gray-300 text-gray-700"
                  : // learnedCharacters.includes(prop?.hanzi)
                    learnedChar
                    ? learnedChar?.status === "forgotten"
                      ? "dark:text-gray-900 text-gray-100"
                      : `hover:${color} text-gray-300`
                    : selectedComp?.length > 1 || selectedComp?.group
                      ? "dark:text-gray-500 text-gray-200"
                      : // : lastAnswer?.totalCharacters?.includes(character?.input || character?.hanzi)
                        //   ? "dark:text-yellow-500"
                        "dark:text-gray-700 text-gray-200"
              } dark:hover:text-white text-xs transition lowercase text-center`
            )}
          >
            {frequency}
          </sub>
        )}

        {smartSplit({
          input: character?.input || character?.hanzi,
          lang: lang || "",
        })?.map((val: any, idx: any) => {
          return <CharacterItem character={val} key={`${val}-${idx}`} />;
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
          // brightMode ? "text-gray-500" : "dark:text-gray-800 text-gray-200"
          "dark:text-gray-500 text-gray-800"
        )}
      >
        {character?.en || selectedComp?.en}
      </p>
    </div>
  );
}
