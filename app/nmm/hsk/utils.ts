"use client";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useQuery } from "@tanstack/react-query";
import { filterNonHanYu } from "../utils";

export const getLevel = (queryStr: string) => {
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

export const resolveHsk = (
  queryStr: string,
  {
    hskWords,
    variant,
    level,
    topic,
  }: {
    hskWords: { hanzi: string; level: number; hskLevel: number }[];
    variant?: "all";
    level?: number;
    topic?: string;
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
