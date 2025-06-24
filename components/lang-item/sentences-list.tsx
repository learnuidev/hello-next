"use client";
import React from "react";

import Link from "next/link";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { useQuery } from "@tanstack/react-query";
import { useSearchQueryStore } from "../search/state";

import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { filterWordsByQuery } from "./utils";

const useLearnedSentences = (lang: string) => {
  const { data } = useListCharactersQuery();
  const query = useSearchQueryStore((state) => state.query);

  return useQuery({
    queryKey: ["list-learned-sentences", lang, JSON.stringify(data), query],
    queryFn: async () => {
      const words = [...(data || [])]
        ?.filter((item: any) => item?.lang === lang)
        ?.filter(
          (item: any) =>
            (item?.input || item?.hanzi)?.length > 20 ||
            (item?.input || item?.hanzi)?.split(" ")?.length >= 3
        );

      const dataToShow = filterWordsByQuery(words, query);
      return dataToShow?.map((item: any) => {
        return {
          input: (item?.input || item?.hanzi)?.toLowerCase(),
          en: item?.en?.toLowerCase(),
          roman: (item?.roman || item?.pinyin)?.toLowerCase(),
        };
      });
    },
  });

  const words = [...(data || [])]
    ?.filter((item: any) => item?.lang === lang)
    ?.filter((item: any) => (item?.input || item?.hanzi)?.length < 20);
};

export function SentencesList({ lang }: { lang: string }) {
  const { data: sents } = useLearnedSentences(lang);
  const query = useSearchQueryStore((state) => state.query);
  const addHistoryMutation = useAddHistoryMutation();

  return (
    <div className="px-2 md:px-32 md:mx-12 flex flex-col space-y-8 pb-32 pt-8">
      {sents?.map((prop: any) => {
        return (
          // <div key={JSON.stringify(prop)}>
          <Link
            href={`/nmm/${prop?.input || prop?.hanzi}?lang=${prop?.lang || lang}`}
            key={JSON.stringify(prop)}
            onClick={() => {
              if (!addHistoryMutation.isPending) {
                // addHistoryMutation.mutate({
                //   // pathName: routeName,
                //   input: prop?.input || prop?.hanzi,
                //   roman: prop?.roman,
                //   lang: prop?.lang || lang,
                //   contentType: "sentence",
                //   query: query,
                //   contentId: prop?.id,
                //   eventType: "CONTENT_VIEWED",
                // } as any);
              }
            }}
            // className={`${prop ? "dark:text-gray-400 text-gray-200" : "dark:text-gray-600 text-gray-600"} dark:hover:text-white p-6 flex items-center flex-col`}
          >
            <p className="text-md md:text-xl font-light">{prop?.input}</p>
            <p className="text-gray-500 font-extralight text-sm md:text-lg">
              {prop?.en}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
