"use client";

import { useMemo } from "react";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { filterComponents } from "../nmm-utils/filter-components";

import { useBeltStore } from "@/components/use-belt-store";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useHSKLevelStore } from "../hsk-level-store";

import { useHskViewStore } from "./state";
import { chineseCharacters } from "@/langs/chinese /characters";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { filterNonHanYu } from "../nmm-utils/filter-non-hanyu";
import { resolveHsk } from "./hsk-utils/resolve-hsk";

export const useGetHskCharacters = ({ variant }: { variant?: "all" }) => {
  const queryStr = useSearchQueryStore((state) => state.query);
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const { data: learnedCharacters2 } = useListCharactersQuery();
  const { data: components } = useListComponents({ includeAll: true });
  const level = useHSKLevelStore((state) => state.level);

  const mode = useLearningModeStore((state: any) => state.mode);

  const hskView = (useHskViewStore((state) => state.view) as any)?.[
    selectedBelt?.hskLevel
  ];
  const setHskView = useHskViewStore((state) => state.setView);

  const comps = components ? components : chineseCharacters;

  // const { data: hskCharacters } = useGetHskCharacters({ queryStr, variant });

  const { data: hskWords } = useListHSKWordsQuery({
    version: mode === "hsk" ? 2 : 3,
    content: "",
  });

  const resolvedHskWords = useMemo(
    () => resolveHsk(queryStr, { hskWords, variant, level }),
    [queryStr, hskWords, variant, level]
  );

  console.log("HSK WOrDS", resolvedHskWords);

  const filteredWords = resolvedHskWords?.filter((item: any) => {
    if (!item?.topic || hskView === "All") {
      return true;
    }
    return item?.topic === hskView;
  });

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

  const topics = [
    "All",
    ...(new Set(resolvedHskWords?.map((word: any) => word?.type)) as any),
  ];

  const slicedComponents = queryStr ? components : hskCharacters;
  // : hskCharacters?.slice(
  //     selectedBelt?.minCharacterLevel,
  //     selectedBelt?.maxCharacterLevel
  //   );

  const filteredComponents = filterComponents(
    slicedComponents,
    queryStr,
    learnedCharacters2
  )?.filter((prop: any) => {
    if (hskView === "All") {
      return true;
    }

    return (
      filteredWords?.filter((word) => word?.hanzi?.includes(prop?.hanzi))
        ?.length > 0
    );
  });

  return filteredComponents;
};
