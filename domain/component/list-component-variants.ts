"use client";

import { useQuery } from "@tanstack/react-query";

import { siteConfig } from "@/lib/config";
import { useCurrentAuthUser } from "../auth/auth.queries";

type ComponentVariant = {
  hanzi: string;
  en: string;
  pinyin: string;
  hanbookId: string;
  useCases: UseCase[];
  similarLookingCharacters: SimilarCharacterSection;
  samePronunciationCharacters: SamePronunciationCharacterSection;
  relatedWordsAndPhrases: RelatedWordsAndPhrasesSection;
};

type UseCase = {
  type?: string;
  en: string;
  sentences: Sentence[];
};

type Sentence = {
  pinyin: string;
  hanzi: string;
  en: string;
};

type SimilarCharacterSection = {
  title: string;
  characters: Character[];
};

type SamePronunciationCharacterSection = {
  title: string;
  characters: CharacterWithEnglish[];
};

type RelatedWordsAndPhrasesSection = {
  title: string;
  wordsAndPhrases: WordOrPhrase[];
};

type Character = {
  pinyin: string;
  hanzi: string;
};

type CharacterWithEnglish = Character & {
  en: string;
};

type WordOrPhrase = {
  hanzi: string;
  enAndType: string;
  type: string;
  en: string;
};

interface ListComponentVariantsParams {
  hanzi: string;
}

const listComponentVariants = async (
  { hanzi }: ListComponentVariantsParams,
  opts: {
    Authorization: string;
  }
): Promise<ComponentVariant[]> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/discover-variants`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      hanzi,
    }),
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }
  let resp = (await res.json()) as any;

  return resp;
};

// Example array of entries

export function useListComponentVariantsQuery(
  params: ListComponentVariantsParams,
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ComponentVariant[], Error>({
    queryKey: ["list-component-variants", params?.hanzi, authUser?.jwt],

    queryFn: async () => {
      const response = await listComponentVariants(params, {
        Authorization: authUser?.jwt,
      });

      return response as ComponentVariant[];
    },

    ...options,
    retry: false,
    // enabled: Boolean(authUser?.jwt),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
