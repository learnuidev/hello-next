"use client";

import { InsightItem } from "@/app/(auth)/insights/insights-v2/components/insight-item";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useGetInsightParams } from "@/app/(auth)/insights/insights-v2/use-get-insight-params";
import { useListErrors } from "@/app/(auth)/insights/insights-v2/use-list-errors";
import { useGetFailureRate } from "@/app/(auth)/insights/insights-v2/use-get-failure-rate";
import { useGetTotalLifetimeCharacters } from "@/app/profile/hooks/use-get-total-lifetime-characters";
import { useGetProgress } from "./use-get-progress";

export const InsightHeaders = () => {
  const { data: learnedCharacters } = useListCharactersQuery();
  const { filter, view } = useGetInsightParams();

  // const totalComponents = learnedCharacters?.filter(
  //   (item: any) => (item?.hanzi || item?.input)?.length === 1
  // );
  const lifeTimeCharacters = useGetTotalLifetimeCharacters();

  const totalWords = learnedCharacters?.filter(
    (item: any) => (item?.hanzi || item?.input)?.length > 1
  );
  const totalForgotten = learnedCharacters?.filter(
    (item: any) => item?.status === "forgotten"
  );

  const totalErrors = useListErrors();
  const failureRate = useGetFailureRate();

  const progress = useGetProgress();

  const totalStories = learnedCharacters?.filter((character: any) => {
    const characterIsObject =
      typeof character?.story === "object" &&
      !Array.isArray(character?.story) &&
      character?.story !== null;
    return character?.story?.length > 10 || characterIsObject;
  })?.length;

  console.log("progress", progress);

  const insightsList = [
    {
      id: "components",
      stat: lifeTimeCharacters || 0,
      title: "Components",
    },
    {
      id: "progress",
      stat: progress?.overallHskProgress || 0,
      title: "HSK Progress",
    },
    // { id: "words", stat: totalWords?.length || 0, title: "Words" },
    // { id: "stories", stat: totalStories || 0, title: "Stories" },
    { id: "forgotten", stat: totalForgotten?.length || 0, title: "Mastered" },
    { id: "errors", stat: totalErrors?.length || 0, title: "Errors" },
    { id: "failure-rate", stat: failureRate || 0, title: "Failure Rate" },
  ];

  return (
    <section className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-8 md:mt-0 md:mb-16 justify-center items-center">
      {insightsList.map((item) => (
        <InsightItem
          href={`/insights?view=${item.id}`}
          key={item.id}
          id={item.id}
          stat={item.stat}
          title={item.title}
        />
      ))}
    </section>
  );
};
