"use client";

import { useSearchParams } from "next/navigation";

export function useGetNmmParams() {
  const searchParams = useSearchParams();

  const defaultTabValue = searchParams.get("tab") || "core";
  const viewMode = searchParams.get("view-mode") || "character";

  const level = parseInt(searchParams.get("level") as string) || 1;

  return {
    tab: defaultTabValue,
    level,
    viewMode,
  };
}
