"use client";

import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";

export const useListCorrect = () => {
  const totalAttempts = useListAttempts();

  return totalAttempts.filter((value: any) => value.outcome === "correct");
};
