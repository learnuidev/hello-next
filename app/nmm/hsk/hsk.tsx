"use client";

import React from "react";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useSearchParams } from "next/navigation";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { HanziLink } from "@/components/hanzi-link";
import { useQuery } from "@tanstack/react-query";
import { filterNonHanYu } from "../utils";

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

    queryFn: () => {
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
  const searchParams = useSearchParams();

  const queryStr = useSearchQueryStore((state) => state.query);

  const { data: components } = useListComponents({ includeAll: true });

  const { data: resolvedHskWords } = useResolveHsk({ queryStr, variant });

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

  const { data: hskCharacters } = useGetHskCharacters({ queryStr, variant });

  return (
    <div className="my-4 mx-2 md:mx-8 text-black dark:text-white flex flex-wrap items-center justify-start">
      {hskCharacters?.map((prop: any, idx: number) => {
        return (
          <div key={`${prop.hanzi}-chars-${idx}`}>
            <HanziLink character={prop} />
          </div>
        );
      })}
    </div>
  );
};
