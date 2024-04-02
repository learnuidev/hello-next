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
import { SearchResult } from "@/components/search-result";

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

  const router = useRouter();

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

      <SearchResult
        // onSearchGrammar={(grammar) => {
        //   router.push(`/search?query=${grammar}`);

        //   // router.push()
        // }}
        query={params["character-id"]}
      />

      {/* <div>
        <pre>
          <code>{JSON.stringify(meaning, null, 2)}</code>
        </pre>
      </div> */}
    </main>
  );
}
