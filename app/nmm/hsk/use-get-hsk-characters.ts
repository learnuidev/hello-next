"use client";

import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useMemo } from "react";

import { filterComponents } from "../nmm-utils/filter-components";

import { useBeltStore } from "@/components/use-belt-store";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { filterNonHanYu } from "../nmm-utils/filter-non-hanyu";
import { resolveHsk } from "./hsk-utils/resolve-hsk";
import { useHskViewStore } from "./state";

export const useGetHskCharacters = ({
  variant,
  getAll = false,
}: {
  variant?: "all";
  getAll?: boolean;
}) => {
  const queryStr = useSearchQueryStore((state) => state.query);
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();
  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const { level } = useGetReviewParams();

  const mode = useLearningModeStore((state: any) => state.mode);

  const hskView = (useHskViewStore((state) => state.view) as any)?.[
    selectedBelt?.hskLevel
  ];

  const { data: hskWords, isLoading } = useListHSKWordsQuery({
    version: mode === "hsk" ? 2 : 3,
    content: "",
  });

  const resolvedHskWords = useMemo(
    () => resolveHsk(queryStr, { hskWords, variant, level }),
    [queryStr, hskWords, variant, level]
  );

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
        hskLevel: level,
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

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const filteredComponents = filterComponents({
    components: slicedComponents,
    query: queryStr,
    characters: learnedCharacters2,
    getAll,
  })?.filter((prop: any) => {
    const learnedChar = learnedCharacters2?.find(
      (char: any) => char?.hanzi === prop?.hanzi
    );

    if (!brightMode && learnedChar?.status === "forgotten") {
      return false;
    }

    if (hskView === "All") {
      return true;
    }

    return true;

    return (
      filteredWords?.filter((word) => word?.hanzi?.includes(prop?.hanzi))
        ?.length > 0
    );
  });

  return {
    data: filteredComponents,
    isLoading: isLoading || isCharactersLoading || isComponentsLoading,
  };
};
