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
import { useRouter, useSearchParams } from "next/navigation";
import { Editor } from "./Editor";
import Link from "next/link";

export function GrammarAnalysis({
  contentId,
  lang,
  onSearchGrammar,
  showHeader = true,
}: {
  lang?: string;
  contentId: string;
  onSearchGrammar?: (grammar: string) => void;
  showHeader?: boolean;
}) {
  const { data: grammarAnalysis, isLoading: isGrammarAnalysisLoading } =
    useListGrammarsQuery(
      {
        sentenceId: contentId,
        content: contentId,
      },
      {
        enabled: Boolean(contentId),
        refetchOnWindowFocus: false,
        refetchOnFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const router = useRouter();

  const ga = (grammarAnalysis as ListGrammarsResponse)?.grammarAnalysis;

  const grammarAnalysisFinal = Array.isArray(ga) ? ga : [ga];

  return grammarAnalysis ? (
    <div>
      {/* {showHeader && (
        <h3 className="sm:text-xl space-x-2">
          <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
          <span>Grammar</span>
        </h3>
      )} */}
      {isGrammarAnalysisLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <div className="font-light space-y-6 mt-4">
          {grammarAnalysisFinal?.map((analysis) => {
            if (analysis?.hanzi) {
              return (
                <div key={analysis?.hanzi}>
                  <div className="flex items-center flex-col"></div>

                  {onSearchGrammar ? (
                    <button
                      onClick={() => {
                        onSearchGrammar(analysis?.hanzi || "");
                      }}
                    >
                      {analysis?.hanzi}
                    </button>
                  ) : (
                    <Link
                      href={`/nmm/${analysis?.hanzi ? analysis?.hanzi[0] : ""}`}
                      // onClick={() => {
                      //   router.push(

                      //   );
                      //   // onSearchGrammar(analysis?.hanzi || "");
                      // }}
                      className="w-16"
                    >
                      {analysis?.hanzi}
                    </Link>
                  )}

                  <Link
                    className=" text-gray-400"
                    href={`/nmm/${analysis?.hanzi ? analysis?.hanzi : ""}`}
                    // className="w-16"
                  >
                    {analysis?.pinyin}
                  </Link>
                  <Link
                    className=" text-gray-400"
                    href={`/nmm/${analysis?.hanzi ? analysis?.hanzi : ""}`}
                    // className="w-16"
                  >
                    {analysis?.en}
                  </Link>

                  <p
                    className="text-gray-400 mb-4"
                    onClick={() => {
                      router.push(
                        `/nmm/${analysis?.hanzi ? analysis?.hanzi[0] : ""}`
                      );
                      // onSearchGrammar(analysis?.hanzi || "");
                    }}
                    // className="w-16"
                  >
                    {analysis?.explanation}
                  </p>
                </div>
              );
            } else {
              return (
                <div
                  key={analysis?.input}
                  className="flex items-start flex-col"
                >
                  {analysis?.roman !== analysis?.input && (
                    <Link
                      className=" text-gray-400"
                      href={`/nmm/${analysis?.input}`}
                      // className="w-16"
                    >
                      {analysis?.roman}
                    </Link>
                  )}
                  <Link
                    className="text-gray-300 font-light text-xl"
                    href={
                      lang
                        ? `/nmm/${analysis?.original || analysis?.input}?lang=${lang}`
                        : `/nmm/${analysis?.original || analysis?.input}`
                    }
                  >
                    {analysis?.original || analysis?.input}
                  </Link>

                  <Link
                    className=" text-gray-400"
                    href={
                      lang
                        ? `/nmm/${analysis?.original || analysis?.input}?lang=${lang}`
                        : `/nmm/${analysis?.original || analysis?.input}`
                    }
                    // className="w-16"
                  >
                    {analysis?.en}
                  </Link>

                  <p className="text-gray-500 font-extralight">
                    {analysis?.explanation}
                  </p>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  ) : null;
}

export function SearchResult({
  query,
  onSearchGrammar,
}: {
  query?: string;
  onSearchGrammar?: (grammar: string) => void;
}) {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "";

  //   const currentDecodedQuery = useGetDecodedCharacter(query);

  const currentDecodedQuery = decodeURIComponent(query || "");

  const { data: meaning } = useListMeaningsQuery({
    content: currentDecodedQuery,
    lang,
  });

  const router = useRouter();

  const meaningResponse = meaning as ListMeaningsResponse;
  return (
    <div className="px-4 md:px-40">
      <div className="flex justify-between items-center w-full mt-4 md:mt-12">
        <h1 className="text-3xl">{currentDecodedQuery}</h1>
      </div>
      {/* <p className="font-light mb-4 md:mb-8 mt-4">{meaningResponse?.summary}</p> */}
      <div className="font-light mb-4 md:mb-8 mt-4">
        {" "}
        {meaningResponse?.summary && (
          <Editor
            // readOnly={true}
            content={meaningResponse?.summary}
            // id={meaningResponse?.summary}
          />
        )}
      </div>

      <div className="my-16">
        <GrammarAnalysis contentId={currentDecodedQuery} />
      </div>
    </div>
  );
}
