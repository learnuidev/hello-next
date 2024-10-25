// import Image from 'next/image'
"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";
import { Editor } from "../Editor";
import { useRouter } from "next/navigation";
import { useGetCharacterId } from "@/app/(auth)/character/[character-id]/use-get-character-id";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

export function Summary({
  characterId,
  showMeanings,
}: {
  characterId: string;
  showMeanings: boolean;
}) {
  const characaterId = useGetCharacterId();

  const lang = useGetCurrentLang();

  const router = useRouter();

  const { data: meaning, isLoading } = useListMeaningsQuery(
    {
      content: characaterId,
      lang,
    },
    {
      onSuccess: (data: any) => {
        console.log("");
        router.push(`/nmm/${characterId}?lang=${lang ? lang : data?.lang}`);
      },
    }
  );

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
