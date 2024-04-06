"use client";

import { NavBar } from "@/components/navbar";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { getDate, getDay, getMonth, getYear } from "date-fns";
import Link from "next/link";

function useListLearnedCharactersByDate() {
  const { data: learnedCharacters, ...rest } = useListCharactersQuery();

  const learnedCharactersFormatted = learnedCharacters
    ?.map((item: any) => {
      const createdAt = new Date(item?.createdAt);
      const date = getDate(createdAt);
      const month = getMonth(createdAt);
      const year = getYear(createdAt);

      return {
        ...item,
        // date: date,
        date: `${date}/${month}/${year}`,
      };
    })
    ?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);

  const grouped =
    learnedCharactersFormatted &&
    Object.entries(
      Object.groupBy(learnedCharactersFormatted, (item: any) => item?.date)
    ).map(([date, items]) => {
      return {
        title: date,
        items,
      };
    });

  return {
    data: grouped,
    ...rest,
  };
}

export default function Timeline() {
  const { data: grouped, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate();

  return (
    <main className="">
      <NavBar />

      {isLearnedCharactersLoading ? (
        <div className="text-center my-16"> Loading ...</div>
      ) : (
        <div className="px-4 md:px-32 md:my-4">
          <div className="mt-8 space-y-4 text-gray-200">
            {grouped?.map((group: any) => {
              return (
                <div key={group?.title}>
                  <h1 className="font-extralight text-gray-400">
                    {group.title}
                  </h1>

                  <div className="flex flex-wrap">
                    {group?.items?.map((item: any) => {
                      return (
                        <Link
                          className="py-4 pr-4 text-2xl font-light"
                          href={`/nmm/${item?.hanzi}`}
                          key={item?.id}
                        >
                          {item?.hanzi}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
