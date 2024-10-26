"use client";

import React, { useMemo } from "react";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { HanziLink } from "@/components/hanzi-link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useHSKLevelStore } from "../hsk-level-store";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useHskViewStore } from "./state";
import { useBeltStore } from "@/components/use-belt-store";
import { resolveHsk } from "./hsk-utils/resolve-hsk";
import { NmmListContainer } from "@/components/nmm-list-container";

export const useGetHskWords = ({ variant }: { variant?: "all" }) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const hskView = (useHskViewStore((state) => state.view) as any)?.[
    selectedBelt?.hskLevel
  ];

  const { data: hskWords } = useListHSKWordsQuery();
  const level = useHSKLevelStore((state) => state.level);

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

  return resolvedHskWords;
};
