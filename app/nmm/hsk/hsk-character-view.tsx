"use client";

import React, { useMemo } from "react";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { HanziLink } from "@/components/hanzi-link";
import { filterComponents, filterNonHanYu } from "../utils";

import { useBeltStore } from "@/components/use-belt-store";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useHSKLevelStore } from "../hsk-level-store";

import { resolveHsk } from "./utils";

export const HskCharacterView = ({ variant }: { variant?: "all" }) => {
  const queryStr = useSearchQueryStore((state) => state.query);
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const { data: learnedCharacters2 } = useListCharactersQuery();
  const { data: components } = useListComponents({ includeAll: true });
  const level = useHSKLevelStore((state) => state.level);

  // const { data: hskCharacters } = useGetHskCharacters({ queryStr, variant });

  const { data: hskWords } = useListHSKWordsQuery();

  const resolvedHskWords = useMemo(
    () => resolveHsk(queryStr, { hskWords, variant, level }),
    [queryStr, hskWords, variant, level]
  );

  const hskCharacters = [
    ...new Set(
      resolvedHskWords
        ?.map((x: any) => x.hanzi)
        ?.join()
        ?.split("")
    ),
  ]
    ?.filter((val: any) => filterNonHanYu(val))
    ?.map((id) => {
      const learnedChar = learnedCharacters2?.find(
        (char: any) => id === char?.hanzi
      );
      const learnedComp = components?.find((char: any) => id === char?.hanzi);

      return {
        ...learnedComp,
        ...learnedChar,
        hanzi: id,
        lang: "zh",
      };
    });

  console.log("HSK CHARS", hskCharacters);

  const slicedComponents = queryStr ? components : hskCharacters;
  // : hskCharacters?.slice(
  //     selectedBelt?.minCharacterLevel,
  //     selectedBelt?.maxCharacterLevel
  //   );

  const filteredComponents = filterComponents(
    slicedComponents,
    queryStr,
    learnedCharacters2
  );

  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {filteredComponents?.map((prop: any, idx: number) => {
        return (
          <div key={`${prop.hanzi}-chars-${idx}`}>
            <HanziLink character={prop} />
          </div>
        );
      })}
    </div>
  );
};
