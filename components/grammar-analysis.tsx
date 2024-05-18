"use client";

import {
  ListGrammarsResponse,
  useListGrammarsQuery,
} from "@/domain/sentence/grammar.queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { cleanString } from "@/data/convos/bm1/level_7";

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
  const searchParams = useSearchParams();
  const learnedLang = searchParams.get("lang") || lang;
  const { data: grammarAnalysis, isLoading: isGrammarAnalysisLoading } =
    useListGrammarsQuery(
      {
        sentenceId: contentId,
        content: contentId,
        lang: learnedLang,
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

  const GrammarAnalysisList = () => {
    return (
      // <div className="font-light space-y-6 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {grammarAnalysisFinal?.map((analysis) => {
          if (analysis?.hanzi) {
            const cleanHanzi = cleanString(analysis?.hanzi);
            return (
              <div
                key={cleanHanzi}
                className="flex items-start flex-col font-light"
              >
                {analysis?.hanzi?.length < 4 ? (
                  <div className="flex space-x-2">
                    <Link
                      className="text-gray-300"
                      href={
                        lang
                          ? `/nmm/${cleanHanzi}?lang=${lang}`
                          : `/nmm/${cleanHanzi}`
                      }
                    >
                      {cleanHanzi}
                    </Link>
                    <Link
                      className=" text-gray-400"
                      href={`/nmm/${cleanHanzi}`}
                    >
                      {analysis?.pinyin}
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      className=" text-gray-400"
                      href={`/nmm/${cleanHanzi}`}
                    >
                      {analysis?.pinyin}
                    </Link>

                    <Link
                      className="text-gray-300 font-light text-xl"
                      href={
                        lang
                          ? `/nmm/${cleanHanzi}?lang=${lang}`
                          : `/nmm/${cleanHanzi}`
                      }
                    >
                      {cleanHanzi}
                    </Link>
                  </>
                )}

                <Link
                  className=" text-gray-500"
                  href={
                    lang
                      ? `/nmm/${cleanHanzi}?lang=${lang}`
                      : `/nmm/${cleanHanzi}`
                  }
                  // className="w-16"
                >
                  {analysis?.en}
                </Link>

                {/* <p className="text-gray-600 font-extralight text-xs">
                  {analysis?.explanation}
                </p> */}
              </div>
            );
          } else {
            const cleanInput = cleanString(
              analysis?.original || analysis?.input || ""
            );

            return (
              <div key={analysis?.input} className="flex items-start flex-col">
                {analysis?.roman !== analysis?.input && (
                  <Link className=" text-gray-400" href={`/nmm/${cleanInput}`}>
                    {analysis?.roman}
                  </Link>
                )}
                <Link
                  className="text-gray-300 font-light text-xl"
                  href={
                    lang
                      ? `/nmm/${cleanInput}?lang=${lang}`
                      : `/nmm/${cleanInput}`
                  }
                >
                  {cleanInput}
                </Link>

                <Link
                  className=" text-gray-400"
                  href={
                    lang
                      ? `/nmm/${cleanInput}?lang=${lang}`
                      : `/nmm/${cleanInput}`
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
    );
  };

  return grammarAnalysis ? (
    <div>
      {isGrammarAnalysisLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          <ScrollArea className="hidden md:block space-y-6 h-[600px] rounded-md">
            <GrammarAnalysisList />
          </ScrollArea>

          <div className="md:hidden block">
            <GrammarAnalysisList />
          </div>
        </>
      )}
    </div>
  ) : null;
}
