"use client";

import { useSearchParams } from "next/navigation";

export function useGetInsightParams() {
  const searchParams = useSearchParams();

  const view = searchParams.get("view") || "";

  return {
    view,
  };
}
