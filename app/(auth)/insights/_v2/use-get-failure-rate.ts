"use client";

import { useListAttempts } from "./use-list-attempts";
import { useListCorrect } from "./use-list-correct";
import { useListErrors } from "./use-list-errors";

export const useGetFailureRate = () => {
  const totalAttempts = useListAttempts();
  const totalInCorrect = useListErrors();

  return `${(
    (totalInCorrect?.length / (totalAttempts?.length || 1)) *
    100
  ).toFixed(1)}%`;
};
