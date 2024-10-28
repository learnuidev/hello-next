"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useGetNmmParams() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const defaultTabValue = searchParams.get("tab") || "core";
  const viewMode = searchParams.get("view-mode") || "character";

  return {
    tab: defaultTabValue,
    viewMode,
  };
}
