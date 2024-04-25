"use client";

import {
  ListGrammarsResponse,
  useListGrammarsQuery,
} from "@/domain/sentence/grammar.queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

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

  const GrammarAnalysisList = () => {
    return (
      <div className="font-light space-y-6 mt-4">
        {grammarAnalysisFinal?.map((analysis) => {
          if (analysis?.hanzi) {
            return (
              <div key={analysis?.hanzi} className="flex items-start flex-col">
                <Link
                  className=" text-gray-400"
                  href={`/nmm/${analysis?.hanzi}`}
                >
                  {analysis?.pinyin}
                </Link>

                <Link
                  className="text-gray-300 font-light text-xl"
                  href={
                    lang
                      ? `/nmm/${analysis?.hanzi}?lang=${lang}`
                      : `/nmm/${analysis?.hanzi}`
                  }
                >
                  {analysis?.hanzi}
                </Link>

                <Link
                  className=" text-gray-400"
                  href={
                    lang
                      ? `/nmm/${analysis?.hanzi}?lang=${lang}`
                      : `/nmm/${analysis?.hanzi}`
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
          } else {
            return (
              <div key={analysis?.input} className="flex items-start flex-col">
                {analysis?.roman !== analysis?.input && (
                  <Link
                    className=" text-gray-400"
                    href={`/nmm/${analysis?.input}`}
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
