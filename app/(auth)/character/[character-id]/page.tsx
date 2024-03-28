// import Image from 'next/image'
"use client";

import { useParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { faLightbulb } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";
import {
  ListGrammarsResponse,
  useListGrammarsQuery,
} from "@/domain/sentence/grammar.queries";
import { Skeleton } from "@/components/ui/skeleton";

const useGetDecodedCharacter = () => {
  const params = useParams() as {
    "character-id": string;
  };

  const currentDecodedCharacter = decodeURIComponent(params?.["character-id"]);

  return currentDecodedCharacter;
};

export default function Home() {
  const params = useParams() as {
    "character-id": string;
  };

  const currentDecodedCharacter = useGetDecodedCharacter();

  const { data: meaning } = useListMeaningsQuery({
    content: currentDecodedCharacter,
  });

  const { data: grammarAnalysis, isLoading: isGrammarAnalysisLoading } =
    useListGrammarsQuery(
      {
        sentenceId: currentDecodedCharacter,
        content: currentDecodedCharacter,
      },
      {
        enabled: Boolean(currentDecodedCharacter),
        refetchOnWindowFocus: false,
        refetchOnFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const meaningResponse = meaning as ListMeaningsResponse;
  return (
    <main className="">
      <NavBar />

      <div className="px-4 md:px-40">
        <div className="flex justify-between items-center w-full my-4 md:my-8">
          <h1 className="text-4xl">{currentDecodedCharacter}</h1>
        </div>

        <div className="my-16">
          <h3 className="sm:text-xl my-4 space-x-2">
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
            <span>Summary</span>
          </h3>
          <p className="font-light">{meaningResponse?.summary}</p>
        </div>

        <div className="mt-16">
          <h3 className="sm:text-xl my-8 space-x-2">
            <FontAwesomeIcon icon={faLightbulb} className="text-2xl" />
            <span>Meanings</span>
          </h3>

          <div className="space-y-8">
            {meaningResponse?.meanings?.map((meaning) => {
              return (
                <div key={meaning.meaning}>
                  <h4 className="font-bold">{meaning.meaning}</h4>

                  <p className="text-gray-300 font-light">
                    {meaning.explanation}
                  </p>

                  <div className="mx-8 w-full space-y-4 mt-2">
                    {meaning.use_cases?.map((useCase) => {
                      return (
                        <div key={useCase.hanzi} className="w-full">
                          <p>{useCase.hanzi}</p>
                          <p>{useCase.pinyin}</p>
                          <p>{useCase.en}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* <p className="font-light">{meaning?.summary}</p> */}
        </div>

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
                {(
                  grammarAnalysis as ListGrammarsResponse
                )?.grammarAnalysis?.map((analysis) => {
                  return (
                    <div
                      key={analysis?.hanzi}
                      className="flex space-x-4 items-center"
                    >
                      <p className="w-16">{analysis?.hanzi}</p>
                      <p>{analysis?.explanation}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* <div>
        <pre>
          <code>{JSON.stringify(meaning, null, 2)}</code>
        </pre>
      </div> */}
    </main>
  );
}
