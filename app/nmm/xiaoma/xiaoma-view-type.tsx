"use client";
import React, { useEffect } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { belts, calculateColor, filterNonHanYu } from "../utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";

import { Icons } from "@/components/ui/icons.v2";

import { course1 } from "@/data/convos/bm1";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { HanziLink } from "@/components/hanzi-link";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { cn } from "@/lib/utils";

const getLevel = (queryStr: string) => {
  if (queryStr?.includes("1")) {
    return 1;
  }
  if (queryStr?.includes("2")) {
    return 2;
  }
  if (queryStr?.includes("3")) {
    return 3;
  }
  if (queryStr?.includes("4")) {
    return 4;
  }
  if (queryStr?.includes("5")) {
    return 5;
  }
  if (queryStr?.includes("6")) {
    return 6;
  }
  if (
    queryStr?.includes("7") ||
    queryStr?.includes("8") ||
    queryStr?.includes("9")
  ) {
    return 9;
  }

  return 1;
};

export function XiaomaViewType({
  variant,
}: {
  variant?: "core" | "needs_review" | "all";
}) {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const resolvedLevel = selectedBelt?.hskLevel;

  const { data: components } = useListComponents({ includeAll: true });

  const { data: hskWords } = useListHSKWordsQuery();
  const { data: learnedCharacters2 } = useListCharactersQuery();

  const getHskCharacters = (variant?: "core" | "needs_review" | "all") =>
    hskWords
      ?.filter((item: any) => {
        if (variant === "all") {
          return item?.level <= selectedBelt?.hskLevel;
        }

        return item?.level === selectedBelt?.hskLevel;
      })
      ?.map((x: any) => x?.hanzi)
      ?.filter((val: any) => filterNonHanYu(val))
      ?.map((id: any) => {
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

  const hskCharacters = getHskCharacters(variant);

  const xiaomaSentences = [
    ...new Set(
      course1?.lessons
        .map((x: any) => x.lessons)
        .flat()
        .map((x: any) => x.id)
    ),
  ]
    .filter((val: any) => filterNonHanYu(val))
    .filter((item: any) => {
      return item.split("").some((val: any) => {
        const selectedComp = components?.find(
          (component: any) => component?.hanzi === val
        );

        if (variant === "all") {
          return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
        }

        return (
          selectedComp?.level <= selectedBelt?.maxCharacterLevel &&
          selectedComp?.level >= selectedBelt?.minCharacterLevel
        );

        // return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
      });
    })
    .map((id) => {
      return {
        hanzi: id,
        lang: "zh",
      };
    });

  const xiaomaWords = hskWords
    ?.filter((word: any) => {
      return JSON.stringify(xiaomaSentences)?.includes(word?.hanzi);
    })
    .filter((item: any) => {
      return item.hanzi?.split("").every((val: any) => {
        const selectedComp = components?.find(
          (component: any) => component?.hanzi === val
        );

        return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
      });
    })
    ?.filter((prop: any, idx: any, coll: any) => {
      const qIdx = coll.findIndex((v: any) => v?.hanzi === prop?.hanzi);

      if (idx !== qIdx) {
        return false;
      }

      const selectedComp = components?.find(
        (component: any) => component?.hanzi === prop?.hanzi
      );

      const hskCharacter = hskWords?.find((word: any) =>
        JSON.stringify(word)?.includes(prop?.hanzi)
      );

      if (variant === "all") {
        return hskCharacter?.hskLevel <= selectedBelt?.hskLevel;
        return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
      }

      return hskCharacter?.hskLevel === selectedBelt?.hskLevel;

      // const hskCharacter = hskWords?.find(
      //   (word: any) => word?.hanzi === prop?.hanzi
      // );

      // console.log("HSK ", hskCharacter);

      // if (variant === "all") {
      //   return (
      //     !!selectedComp && hskCharacter?.hskLevel <= selectedBelt?.hskLevel
      //   );
      // }

      // return (
      //   !!selectedComp && hskCharacter?.hskLevel === selectedBelt?.hskLevel
      // );
    });

  const xiaomaCharacters = [
    ...new Set(
      course1?.lessons
        .map((x: any) => x.lessons)
        .flat()
        .map((x: any) => x.id)
        .join()
        .split("")
    ),
  ]
    .filter((val: any) => filterNonHanYu(val))
    .map((id) => {
      return {
        hanzi: id,
        lang: "zh",
      };
    });

  const viewType = useSearchQueryStore((state) => state.type);

  const containerStyle =
    "my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start";

  if (viewType === "sentence") {
    return (
      <div className={containerStyle}>
        {xiaomaSentences?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </div>
    );
  }

  if (viewType === "character") {
    return (
      <div className={containerStyle}>
        {xiaomaCharacters
          ?.filter((prop: any, idx: number) => {
            const selectedComp = components?.find(
              (component: any) => component?.hanzi === prop?.hanzi
            );

            const hskCharacter = hskWords?.find((word: any) =>
              JSON.stringify(word)?.includes(prop?.hanzi)
            );

            if (variant === "all") {
              return hskCharacter?.hskLevel <= selectedBelt?.hskLevel;
              return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
            }

            return hskCharacter?.hskLevel === selectedBelt?.hskLevel;

            return (
              selectedComp?.level <= selectedBelt?.maxCharacterLevel &&
              selectedComp?.level >= selectedBelt?.minCharacterLevel
            );

            // if (variant === "all") {
            //   return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
            // }

            // return (
            //   selectedComp?.level <= selectedBelt?.maxCharacterLevel &&
            //   selectedComp?.level >= selectedBelt?.minCharacterLevel
            // );

            return !!hskCharacter;
          })
          .map((prop: any, idx: number) => {
            return (
              <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
            );
          })}
      </div>
    );
  }

  if (viewType === "word") {
    return (
      <div className={containerStyle}>
        {xiaomaWords?.map((prop: any, idx: number) => {
          return (
            <HanziLink character={prop} key={`${prop.hanzi}-chars-${idx}`} />
          );
        })}
      </div>
    );
  }
}
