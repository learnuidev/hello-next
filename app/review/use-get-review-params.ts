"use client";

import { useSearchParams } from "next/navigation";

export const useGetReviewParams = () => {
  const searchParams = useSearchParams();

  const date = searchParams.get("date") || "";
  const langParams = searchParams.get("lang") || "";
  const mode = (searchParams.get("mode") || "") as string;
  const entryId = (searchParams.get("entry-id") || "") as string;
  const level = parseInt(searchParams.get("level") as string) || 1;
  const character = searchParams.get("character");
  const view = searchParams.get("view");
  const studyMode = searchParams.get("study-mode") || "srs";
  const reviewMode = searchParams.get("review-mode") || "";
  const input = searchParams.get("input") || "";
  const reviewSpeed = searchParams.get("review-speed") || "";

  const sentence = searchParams.get("sentence") || "";

  return {
    date,
    lang: langParams,
    entryId,
    reviewMode,
    mode,
    level,
    character,
    view,
    studyMode,
    input: input || sentence,
    reviewSpeed,
  };
};
