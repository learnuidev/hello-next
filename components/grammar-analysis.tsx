"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetHskWordHandler } from "@/app/(auth)/convos/ai";
import { cleanString } from "@/data/convos/bm1/level_7";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";

export function GrammarAnalysis({
  contentId,
  lang,
  className,
}: {
  lang?: string;
  contentId: string;
  className?: string;
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

  const { data: learnedCharacters } = useListCharactersQuery();

  const grammarAnalysisFinal = (grammarAnalysis?.grammarAnalysis || [])?.filter(
    (item) => {
      // if (contentId?.length < 40) {
      //   return true;
      // }

      const char = item?.hanzi || item?.input;

      const isLearned =
        learnedCharacters?.filter((item: any) => {
          const hanziOrInput = item?.hanzi || item?.input;
          return hanziOrInput === char;
        }) || [];

      const isEveryCharacterLearnedArr =
        learnedCharacters?.filter((item: any) => {
          const hanziOrInput = item?.hanzi || item?.input;
          // return hanziOrInput === char;
          return char
            ?.split("")
            ?.some(
              (val) => val === hanziOrInput && item.status === "forgotten"
            );
        }) || [];
      const isEveryCharacterLearned =
        isEveryCharacterLearnedArr?.length === char?.length;

      console.log("is learned", isLearned);
      return isLearned?.length === 0 && !isEveryCharacterLearned;
    }
  );

  const GrammarAnalysisList = () => {
    const divStyles =
      grammarAnalysisFinal?.length > 4
        ? "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
        : "grid grid-cols-1 gap-4 mt-4";

    const getHskWordHandler = useGetHskWordHandler();

    if (!grammarAnalysisFinal?.length) {
      return null;
    }

    return (
      <div
        className={cn(
          "rounded-2xl",
          "shadows-sm shadow-2 shadow-black p-2 sm:px-8 py-4 bg-gray-50 dark:bg-[rgb(11,12,13)] rounded-2xl overflow-hidden mt-4 sm:mt-0"
        )}
      >
        <h4 className="font-bold text-xl">Grammar Analysis</h4>
        <div className={cn(divStyles, className)}>
          {grammarAnalysisFinal?.map((analysis) => {
            const resolvedLang = lang || analysis?.lang;
            if (analysis?.hanzi) {
              const hskWord = getHskWordHandler(analysis);
              const cleanHanzi = cleanString(analysis?.hanzi);
              return (
                <div
                  key={cleanHanzi}
                  className="flex items-start flex-col font-light"
                >
                  <div className="flex items-start flex-row space-x-2">
                    {analysis?.hanzi?.length < 4 ? (
                      <div className="flex space-x-2">
                        <Link
                          className="text-gray-900 dark:text-gray-300"
                          href={
                            resolvedLang
                              ? `/nmm/${cleanHanzi}?lang=${resolvedLang}`
                              : `/nmm/${cleanHanzi}`
                          }
                        >
                          {cleanHanzi}
                        </Link>
                        <Link
                          className=" text-gray-900 font-semibold dark:text-gray-400"
                          href={`/nmm/${cleanHanzi}`}
                        >
                          {analysis?.pinyin}
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          className=" text-gray-600 dark:text-gray-400"
                          href={`/nmm/${cleanHanzi}`}
                        >
                          {analysis?.pinyin}
                        </Link>

                        <Link
                          className="text-gray-900 dark:text-gray-300 font-light text-xl"
                          href={
                            resolvedLang
                              ? `/nmm/${cleanHanzi}?lang=${resolvedLang}`
                              : `/nmm/${cleanHanzi}`
                          }
                        >
                          {cleanHanzi}
                        </Link>
                      </>
                    )}

                    {hskWord?.level ? (
                      <p className="text-gray-400 dark:text-gray-600">
                        {" "}
                        | hsk {hskWord?.level}{" "}
                      </p>
                    ) : null}
                  </div>

                  <Link
                    className="text-gray-800 dark:text-gray-500"
                    href={
                      resolvedLang
                        ? `/nmm/${cleanHanzi}?lang=${resolvedLang}`
                        : `/nmm/${cleanHanzi}`
                    }
                  >
                    {analysis?.en || hskWord?.en}
                  </Link>
                </div>
              );
            } else {
              const cleanInput = cleanString(
                analysis?.original || analysis?.input || ""
              );

              return (
                <div
                  key={analysis?.input}
                  className="flex items-start flex-col"
                >
                  <Link
                    className="text-gray-800 dark:text-gray-400"
                    href={
                      resolvedLang
                        ? `/nmm/${cleanInput}?lang=${resolvedLang}`
                        : `/nmm/${cleanInput}`
                    }
                    // className="w-16"
                  >
                    {analysis?.roman}
                  </Link>

                  <Link
                    className="text-gray-300 font-light"
                    href={
                      resolvedLang
                        ? `/nmm/${cleanInput}?lang=${resolvedLang}`
                        : `/nmm/${cleanInput}`
                    }
                  >
                    {analysis?.input}
                  </Link>

                  <Link
                    className="text-gray-800 dark:text-gray-500"
                    href={
                      resolvedLang
                        ? `/nmm/${cleanInput}?lang=${resolvedLang}`
                        : `/nmm/${cleanInput}`
                    }
                    // className="w-16"
                  >
                    {analysis?.en}
                  </Link>

                  <p className="text-gray-500 font-extralight text-sm">
                    {analysis?.explanation}
                  </p>
                </div>
              );
            }
          })}
        </div>
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
          <ScrollArea className="hidden md:block rounded-md">
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
