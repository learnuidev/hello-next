"use client";

import { useListAntonymsQuery } from "@/domain/antonyms/antonyms.queries";
import { Card } from "@/components/ui/card";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

interface Antonym {
  hanzi: string;
  en: string;
  pinyin: string;
}

export const AntonymsView = ({ characterId }: { characterId: string }) => {
  const router = useRouter();
  const lang = useGetCurrentLang();
  const { data: authUser } = useCurrentAuthUser({});
  const {
    data: antonyms,
    isLoading,
    error,
  } = useListAntonymsQuery(
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
        Error loading antonyms:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!antonyms) {
    return (
      <div className="text-gray-500 py-4">
        No antonyms found for this character.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(antonyms as Antonym[]).map((antonym, index) => (
          <Card
            key={`${antonym.hanzi}-${index}`}
            className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => router.push(`/nmm/${antonym.hanzi}?lang=${lang}`)}
          >
            <div className="space-y-2">
              <div className="text-2xl font-bold dark:text-white text-black">
                {antonym.hanzi}
              </div>
              <div className="text-sm dark:text-gray-400 text-gray-600">
                {antonym.pinyin}
              </div>
              <div className="text-base dark:text-gray-300 text-gray-700">
                {antonym.en}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
