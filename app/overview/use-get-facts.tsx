"use client";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { createContext, useContext, useMemo } from "react";
import { useGetTotalLifetimeCharacters } from "../profile/hooks/use-get-total-lifetime-characters";
import { formatPercentage } from "../profile/utils/format-percentage";

export function useGetFacts() {
  const { data: totalComponents, isLoading: isComponentsLoading } =
    useListComponents({ singleItemsOnly: true });

  const { data: totalCharacters, isLoading: isCharactersLoading } =
    useListCharactersQuery();
  const lifeTimeCharacters = useGetTotalLifetimeCharacters();

  const reviewedCharacters = useMemo(
    () =>
      totalCharacters?.filter((character: any) => {
        return character?.reviewHistory?.length > 0;
      }) || [],
    [totalCharacters]
  );
  const totalReviedCharacters = useMemo(
    () => reviewedCharacters?.length || 0,
    [reviewedCharacters?.length]
  );

  const characterReviewRatio = formatPercentage(
    totalReviedCharacters / lifeTimeCharacters
  );

  // const totalComponentsLength = useMemo(() => 3200, []);
  const totalComponentsLength = useMemo(
    () => totalComponents?.length || 1,
    [totalComponents?.length]
  );

  const characterLearningRatio = formatPercentage(
    lifeTimeCharacters / totalComponentsLength
  );

  const masteredCharacters = useMemo(() => {
    return (
      totalCharacters?.filter(
        (character: any) => character?.status === "forgotten"
      ) || []
    );
  }, [totalCharacters]);

  const totalMasteredCharacters = useMemo(() => {
    return masteredCharacters?.length || 0;
  }, [masteredCharacters?.length]);

  const characterMasteryRatio = formatPercentage(
    totalMasteredCharacters / lifeTimeCharacters
  );

  const averageCharacterReview = useMemo(() => {
    const totalReviewCounts = reviewedCharacters
      ?.map((item) => item?.reviewHistory?.length)
      ?.reduce((acc: any, curr: any) => acc + curr, 0);
    return (totalReviewCounts / reviewedCharacters?.length).toFixed(2);
  }, [reviewedCharacters]);

  return useMemo(
    () => ({
      averageCharacterReview,
      characterMasteryRatio,
      totalMasteredCharacters,
      totalComponentsLength,
      lifeTimeCharacters,
      isLoading: isCharactersLoading || isComponentsLoading,
      characterLearningRatio,
      characterReviewRatio,
      totalReviedCharacters,
      masteredCharacters,
    }),
    [
      averageCharacterReview,
      characterLearningRatio,
      characterMasteryRatio,
      characterReviewRatio,
      isCharactersLoading,
      isComponentsLoading,
      lifeTimeCharacters,
      masteredCharacters,

      totalComponentsLength,
      totalMasteredCharacters,
      totalReviedCharacters,
    ]
  );
}

const FactContext = createContext<any>(null);

export function useFact() {
  const facts = useContext(FactContext);

  return facts;
}

export function FactContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const facts = useGetFacts();
  return <FactContext.Provider value={facts}>{children}</FactContext.Provider>;
}
