"use client";

import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";
import { useListCorrect } from "@/app/(auth)/insights/insights-v2/use-list-correct";

export const useGetAccuracyRate = () => {
  const totalAttempts = useListAttempts();
  const totalCorrect = useListCorrect();

  return totalCorrect?.length / (totalAttempts?.length || 1);
};
