"use client";

import { useListAttempts } from "./use-list-attempts";
import { useListCorrect } from "./use-list-correct";

export const useGetAccuracyRate = () => {
  const totalAttempts = useListAttempts();
  const totalCorrect = useListCorrect();

  return totalCorrect?.length / (totalAttempts?.length || 1);
};
