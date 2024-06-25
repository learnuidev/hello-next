"use client";
import React, { useEffect } from "react";

import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import {
//   belts,
//   calculateColor,
//   filterComponents,
//   filterNonHanYu,
// } from "./utils";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "@/components/use-belt-store";

import Link from "next/link";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { usePathname, useSearchParams } from "next/navigation";

import { useSearchQueryStore } from "@/components/search/state";
// import { NmmCoreComponents } from "./nmm-core-components";
import { Icons } from "@/components/ui/icons.v2";
// import { AllComponents } from "./all-components";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { course1 } from "@/data/convos/bm1";
// import { XiaomaView } from "./xiaoma/xiaoma";
import { cn } from "@/lib/utils";
import { HanziLink } from "@/components/hanzi-link";
import { useQuery } from "@tanstack/react-query";
import { calculateColor, filterNonHanYu } from "../utils";

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
  hskWords: { hanzi: string; level: number; hskLevel: number }[],
  variant?: "all"
) => {
  const level = getLevel(queryStr);

  if (variant === "all") {
    return hskWords?.filter((item) => {
      return item?.level <= level;
    });
  }

  return hskWords?.filter((item) => {
    return item?.level === level;
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

    queryFn: async () => {
      const resolvedHskWords = resolveHsk(queryStr, hskWords, variant);

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

    queryFn: async () => {
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

      // const resolvedHskWords = resolveHsk(queryStr, hskWords, variant);

      // return resolvedHskWords;
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
  const searchParams = useSearchParams();

  const queryStr = useSearchQueryStore((state) => state.query);

  if (!queryStr?.toLowerCase()?.includes("hsk")) {
    return children;
  }

  if (type === "word") {
    return <HskWordsView />;
  } else {
    return <HskCharacterView />;
  }
};

const HskWordsView = ({ variant }: { variant?: "all" }) => {
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query") || "";

  const queryStr = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);

  const { data: learnedCharacters2 } = useListCharactersQuery();

  useEffect(() => {
    if (searchQueryParams) {
      setQuery(searchQueryParams);
    }
  }, [searchQueryParams, setQuery]);

  const { data: components } = useListComponents({ includeAll: true });

  // console.log("HSK", hskWords);

  const { data: resolvedHskWords } = useResolveHsk({ queryStr, variant });

  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {resolvedHskWords?.map((prop: any, idx: number) => {
        const selectedComp = components?.find(
          (component: any) => component?.hanzi === prop?.hanzi
        );

        const color = calculateColor({
          tone: selectedComp?.tone_level,
        });

        const learnedChar = learnedCharacters2?.find(
          (char: any) => char?.hanzi === prop?.hanzi
        );

        // if (learnedChar?.status === "forgotten" && variant !== "all") {
        //   return null;
        // }

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
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query") || "";

  const queryStr = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);

  const { data: learnedCharacters2 } = useListCharactersQuery();

  useEffect(() => {
    if (searchQueryParams) {
      setQuery(searchQueryParams);
    }
  }, [searchQueryParams, setQuery]);

  const { data: components } = useListComponents({ includeAll: true });

  const { data: hskCharacters } = useGetHskCharacters({ queryStr, variant });

  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {hskCharacters?.map((prop: any, idx: number) => {
        const selectedComp = components?.find(
          (component: any) => component?.hanzi === prop?.hanzi
        );

        const color = calculateColor({
          tone: selectedComp?.tone_level,
        });

        const learnedChar = learnedCharacters2?.find(
          (char: any) => char?.hanzi === prop?.hanzi
        );

        // if (learnedChar?.status === "forgotten" && variant !== "all") {
        //   return null;
        // }

        return (
          <div key={`${prop.hanzi}-chars-${idx}`}>
            <HanziLink character={prop} />
          </div>
        );
      })}
    </div>
  );
};
