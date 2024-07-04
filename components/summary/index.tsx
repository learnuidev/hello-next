// import Image from 'next/image'
"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";
import { Editor } from "../Editor";
import { useSearchParams } from "next/navigation";

export function Summary({
  characterId,
  showMeanings,
}: {
  characterId: string;
  showMeanings: boolean;
}) {
  const currentDecodedCharacter = decodeURIComponent(characterId);

  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "";

  const { data: meaning, isLoading } = useListMeaningsQuery({
    content: currentDecodedCharacter,
    lang,
  });

  let meaningResponse = meaning as ListMeaningsResponse;

  if (isLoading) {
    return null;
  }
  return (
    <main className="">
      <div className="">
        <div className="">
          {meaningResponse?.summary && (
            <Editor readOnly={true} content={meaningResponse?.summary || ""} />
          )}
        </div>
      </div>
    </main>
  );
}
