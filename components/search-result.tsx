"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";
import { useRouter, useSearchParams } from "next/navigation";
import { Editor } from "./Editor";

import { GrammarAnalysis } from "./grammar-analysis";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

export function SearchResult({
  query,
  onSearchGrammar,
}: {
  query?: string;
  onSearchGrammar?: (grammar: string) => void;
}) {
  const searchParams = useSearchParams();
  const lang = useGetCurrentLang();

  const currentDecodedQuery = decodeURIComponent(query || "");

  const { data: meaningResponse } = useListMeaningsQuery({
    content: currentDecodedQuery,
    lang,
  });

  return (
    <div className="px-4 md:px-40">
      <div className="flex justify-between items-center w-full mt-4 md:mt-12">
        <h1 className="text-3xl">{currentDecodedQuery}</h1>
      </div>
      {/* <p className="font-light mb-4 md:mb-8 mt-4">{meaningResponse?.summary}</p> */}
      <div className="font-light mb-4 md:mb-8 mt-4">
        {" "}
        {meaningResponse?.summary && (
          <Editor content={meaningResponse?.summary} />
        )}
      </div>

      <div className="my-16">
        <GrammarAnalysis contentId={currentDecodedQuery} />
      </div>
    </div>
  );
}
