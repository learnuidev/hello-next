"use client";

import { useMemo } from "react";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export function useListTrackableCharactersQuery() {
  const { data: characters } = useListCharactersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const trackableCharacters = useMemo(
    () => characters?.filter((component: any) => component?.track),
    [characters]
  );

  return trackableCharacters;
}
