"use client";

import { useParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";

import { SearchResult } from "@/components/search-result";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

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

  const lang = useGetCurrentLang();

  const currentDecodedCharacter = useGetDecodedCharacter();

  const { data: meaning } = useListMeaningsQuery({
    content: currentDecodedCharacter,
    lang,
  });

  const router = useRouter();

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
