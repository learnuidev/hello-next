"use client";

import { Card } from "@/components/ui/card";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useListSynonymsQuery } from "@/domain/synonyms/synonyms.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useRouter } from "next/navigation";

interface Synonym {
  hanzi: string;
  en: string;
  pinyin: string;
}

export const SynonymsView = ({ characterId }: { characterId: string }) => {
  const router = useRouter();
  const { data: authUser } = useCurrentAuthUser({});
  const lang = useGetCurrentLang();
  const {
    data: synonyms,
    isLoading,
    error,
  } = useListSynonymsQuery(
    { characterId },
    {
      enabled: !!authUser?.jwt && !!characterId,
    },
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 py-4">
        Error loading synonyms:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!synonyms) {
    return (
      <div className="text-gray-500 py-4">
        No synonyms found for this character.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Synonyms for {characterId}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(synonyms as Synonym[]).map((synonym, index) => (
          <Card
            key={`${synonym.hanzi}-${index}`}
            className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => router.push(`/nmm/${synonym.hanzi}?lang=${lang}`)}
          >
            <div className="space-y-2">
              <div className="text-2xl font-bold dark:text-white text-black">
                {synonym.hanzi}
              </div>
              <div className="text-sm dark:text-gray-400 text-gray-600">
                {synonym.pinyin}
              </div>
              <div className="text-base dark:text-gray-300 text-gray-700">
                {synonym.en}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
