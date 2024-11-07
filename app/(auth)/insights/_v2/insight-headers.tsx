"use client";

import { IStatItem } from "@/app/profile/components/profile-stats-item";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import Link from "next/link";
import { useListErrors } from "./use-list-errors";

const InsightItem = ({ children, stat, title, subtitle }: IStatItem) => {
  return (
    <Link
      className="flex items-center flex-col"
      href={`/insights?view=${title?.toLowerCase()}`}
    >
      {children}
      <p className="text-2xl md:text-4xl">{stat}</p>
      <h3 className="text-[14px] text-gray-400 uppercase">{title}</h3>
    </Link>
  );
};

export const InsightHeaders = () => {
  const { data: learnedCharacters } = useListCharactersQuery();

  const totalComponents = learnedCharacters?.filter(
    (item: any) => (item?.hanzi || item?.input)?.length === 1
  );
  const totalWords = learnedCharacters?.filter(
    (item: any) => (item?.hanzi || item?.input)?.length > 1
  );
  const totalForgotten = learnedCharacters?.filter(
    (item: any) => item?.status === "forgotten"
  );

  const totalErrors = useListErrors();

  const totalStories = learnedCharacters?.filter((character: any) => {
    const characterIsObject =
      typeof character?.story === "object" &&
      !Array.isArray(character?.story) &&
      character?.story !== null;
    return character?.story?.length > 10 || characterIsObject;
  })?.length;

  const insightsList = [
    {
      id: "components",
      stat: totalComponents?.length || 0,
      title: "Components",
    },
    { id: "words", stat: totalWords?.length || 0, title: "Words" },
    { id: "stories", stat: totalStories || 0, title: "Stories" },
    { id: "forgotten", stat: totalForgotten?.length || 0, title: "Forgotten" },
    { id: "errors", stat: totalErrors?.length || 0, title: "Errors" },
  ];

  return (
    <section className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-8 md:mt-0 md:mb-16 justify-center items-center">
      {insightsList.map((item) => (
        <InsightItem
          key={item.id}
          id={item.id}
          stat={item.stat}
          title={item.title}
        />
      ))}
    </section>
  );
};
