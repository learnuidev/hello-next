"use client";

import { useListAttempts } from "./use-list-attempts";

export const useListCorrect = () => {
  const totalAttempts = useListAttempts();

  return totalAttempts.filter((value: any) => value.outcome === "correct");
};
