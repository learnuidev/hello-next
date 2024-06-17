"use client";

import { useMemo } from "react";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export function useGetCharacter({ characterId }: { characterId: string }) {
  const { data: characters } = useListCharactersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const selectedComp = useMemo(
    () =>
      characters?.find(
        (component: any) =>
          (component?.hanzi || component?.item || component?.input) ===
          characterId
      ),
    [characters, characterId]
  );

  return selectedComp;
}
