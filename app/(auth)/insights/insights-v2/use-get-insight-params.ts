"use client";

import { useSearchParams } from "next/navigation";

export function useGetInsightParams() {
  const searchParams = useSearchParams();

  const view = searchParams.get("view") || "";

  const filter = searchParams.get("filter") || "filter";

  return {
    view,
    filter,
  };
}
