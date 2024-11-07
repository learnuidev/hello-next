"use client";

import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useListErrors } from "@/app/(auth)/insights/insights-v2/use-list-errors";

export const useGetFailureRate = () => {
  const totalAttempts = useListAttempts();
  const totalInCorrect = useListErrors();

  return `${(
    (totalInCorrect?.length / (totalAttempts?.length || 1)) *
    100
  ).toFixed(1)}%`;
};
