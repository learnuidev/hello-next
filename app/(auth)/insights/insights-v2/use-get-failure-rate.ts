"use client";

import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useListErrors } from "@/app/(auth)/insights/insights-v2/use-list-errors";
import { useListCorrect } from "./use-list-correct";

export const useGetFailureRate = () => {
  const totalCorrect = useListCorrect();
  const totalInCorrect = useListErrors();

  return `${(
    (totalInCorrect?.length /
      (totalCorrect?.length + totalInCorrect?.length || 1)) *
    100
  ).toFixed(1)}%`;
};
