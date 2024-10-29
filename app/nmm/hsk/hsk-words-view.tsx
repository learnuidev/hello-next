"use client";

import { HanziLink } from "@/components/hanzi-link";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useMemo } from "react";

import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { NmmListContainer } from "@/components/nmm-list-container";
import { useBeltStore } from "@/components/use-belt-store";
import { resolveHsk } from "./hsk-utils/resolve-hsk";
import { useHskViewStore } from "./state";

export const HskWordsView = ({ variant }: { variant?: "all" }) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const hskView = (useHskViewStore((state) => state.view) as any)?.[
    selectedBelt?.hskLevel
  ];
  const setHskView = useHskViewStore((state) => state.setView);

  const { data: hskWords } = useListHSKWordsQuery();
  const { level } = useGetReviewParams();

  const hskLevel = level;

  const resolvedHskWords = useMemo(
    () => resolveHsk(queryStr, { hskWords, variant, level, topic: hskView }),
    [queryStr, hskWords, variant, level, hskView]
  );

  const filteredWords = resolvedHskWords?.filter((item: any) => {
    if (!item?.topic || hskView === "All") {
      return true;
    }
    return item?.topic === hskView;
  });

  const topics = [
    "All",
    ...(new Set(resolvedHskWords?.map((word: any) => word?.type)) as any),
  ];

  return (
    <div>
      <NmmListContainer>
        {filteredWords?.map((prop: any, idx: number) => {
          return (
            <div key={`${prop.hanzi}-chars-${idx}`} className="relative">
              <HanziLink character={prop} />
            </div>
          );
        })}
      </NmmListContainer>
    </div>
  );
};
