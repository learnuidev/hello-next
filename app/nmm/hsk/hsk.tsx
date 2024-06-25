"use client";

import React, { useMemo } from "react";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useSearchParams } from "next/navigation";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { HanziLink } from "@/components/hanzi-link";
import { useQuery } from "@tanstack/react-query";
import { filterComponents, filterNonHanYu } from "../utils";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { useBeltStore } from "@/components/use-belt-store";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useHSKLevelStore } from "../hsk-level-store";

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

const resolveHsk = (
  queryStr: string,
  {
    hskWords,
    variant,
    level,
  }: {
    hskWords: { hanzi: string; level: number; hskLevel: number }[];
    variant?: "all";
    level?: number;
  }
) => {
  const resolvedLevel = level || getLevel(queryStr);

  if (variant === "all") {
    return hskWords?.filter((item) => {
      return item?.level <= resolvedLevel;
    });
  }

  return hskWords?.filter((item) => {
    return item?.level === resolvedLevel;
  });
};

function useResolveHsk({
  queryStr,
  variant,
}: {
  queryStr: string;
  variant?: "all";
}) {
  const { data: hskWords } = useListHSKWordsQuery();

  return useQuery({
    queryKey: ["resolve-hsk", queryStr, variant, JSON.stringify(hskWords)],

    queryFn: () => {
      const resolvedHskWords = resolveHsk(queryStr, { hskWords, variant });

      return resolvedHskWords;
    },
  });
}
function useGetHskCharacters({
  queryStr,
  variant,
}: {
  queryStr: string;
  variant?: "all";
}) {
  const { data: resolvedHskWords } = useResolveHsk({ queryStr, variant });
  return useQuery({
    queryKey: [
      "hist-hsk-characters",
      queryStr,
      variant,
      JSON.stringify(resolvedHskWords),
    ],

    queryFn: () => {
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
          return {
            hanzi: id,
            lang: "zh",
          };
        });

      return hskCharacters;
    },
  });
}

export const HskView = ({
  children,
  variant,
  type,
}: {
  children: React.ReactNode;
  variant?: "all";
  // type?: "character" | "word" | "sentence";
  type?: string;
}) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const mode = useLearningModeStore((state: any) => state.mode);

  if (mode === "hsk") {
    if (type === "word") {
      return <HskWordsView variant={variant} />;
    } else {
      return <HskCharacterView variant={variant} />;
    }
  }

  if (!queryStr?.toLowerCase()?.includes("hsk")) {
    return children;
  }

  if (type === "word") {
    return <HskWordsView variant={variant} />;
  } else {
    return <HskCharacterView variant={variant} />;
  }
};

const HskWordsView = ({ variant }: { variant?: "all" }) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  // const { data: resolvedHskWords } = useResolveHsk({ queryStr, variant });
  const { data: hskWords } = useListHSKWordsQuery();
  const level = useHSKLevelStore((state) => state.level);

  const resolvedHskWords = useMemo(
    () => resolveHsk(queryStr, { hskWords, variant, level }),
    [queryStr, hskWords, variant, level]
  );

  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {resolvedHskWords?.map((prop: any, idx: number) => {
        return (
          <div key={`${prop.hanzi}-chars-${idx}`}>
            <HanziLink character={prop} />
          </div>
        );
      })}
    </div>
  );
};
const HskCharacterView = ({ variant }: { variant?: "all" }) => {
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
