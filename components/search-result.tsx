// import Image from 'next/image'
"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { faLightbulb } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";
import {
  ListGrammarsResponse,
  useListGrammarsQuery,
} from "@/domain/sentence/grammar.queries";
import { Skeleton } from "@/components/ui/skeleton";

export function SearchResult({
  query,
  onSearchGrammar,
}: {
  query?: string;
  onSearchGrammar?: (grammar: string) => void;
}) {
  //   const currentDecodedQuery = useGetDecodedCharacter(query);

  const currentDecodedQuery = decodeURIComponent(query || "");

  const { data: meaning } = useListMeaningsQuery({
    content: currentDecodedQuery,
  });

  const { data: grammarAnalysis, isLoading: isGrammarAnalysisLoading } =
    useListGrammarsQuery(
      {
        sentenceId: currentDecodedQuery,
        content: currentDecodedQuery,
      },
      {
        enabled: Boolean(currentDecodedQuery),
        refetchOnWindowFocus: false,
        refetchOnFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  console.log("foo");

  const meaningResponse = meaning as ListMeaningsResponse;
  return (
    <div className="px-4 md:px-40">
      <div className="flex justify-between items-center w-full mt-4 md:mt-8">
        <h1 className="text-4xl">{currentDecodedQuery}</h1>
      </div>
      <p className="font-light mb-4 md:mb-8 mt-4">{meaningResponse?.summary}</p>

      {grammarAnalysis ? (
        <div className="my-16">
          <h3 className="sm:text-xl my-4 space-x-2">
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
            <span>Grammar</span>
          </h3>
          {isGrammarAnalysisLoading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <div className="font-light space-y-4 mt-8">
              {(grammarAnalysis as ListGrammarsResponse)?.grammarAnalysis?.map(
                (analysis) => {
                  if (analysis?.hanzi) {
                    return (
                      <div
                        key={analysis?.hanzi}
                        className="flex space-x-4 items-center"
                      >
                        {onSearchGrammar ? (
                          <button
                            onClick={() => {
                              onSearchGrammar(analysis?.hanzi || "");
                            }}
                          >
                            {analysis?.hanzi}
                          </button>
                        ) : (
                          <p className="w-16">{analysis?.hanzi}</p>
                        )}

                        <p>{analysis?.explanation}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={analysis?.original}
                        className="flex space-x-4 items-center"
                      >
                        {onSearchGrammar ? (
                          <button
                            onClick={() => {
                              onSearchGrammar(analysis?.original || "");
                            }}
                          >
                            {analysis?.original}
                          </button>
                        ) : (
                          <p className="w-16">{analysis?.original}</p>
                        )}

                        <p>{analysis?.explanation}</p>
                      </div>
                    );
                  }
                }
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
