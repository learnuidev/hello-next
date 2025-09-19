import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
// import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";

type DictionaryItem = {
  context: {
    contentId: string;
  };
  discovered_at: number;
  createdAt: number;
  pinyin: string;
  en: string;
  id: string;
  lang: string;
  hanzi: string;
  author: string;
  explanation: string;
};

const listDictionary = async (
  { key, lang }: { key?: string; lang: string },
  { token }: { token: string }
) => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/dictionary/list-dictionary`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ lang, key }),
    }
  );

  const resJson = await res.json();

  return resJson;
};

const listDictionaryRecursive = async (
  lang: string,
  jwt: string,
  key?: string,
  res = []
): Promise<DictionaryItem[]> => {
  const resp = await listDictionary({ key, lang }, { token: jwt });

  if (resp?.key) {
    return listDictionaryRecursive(
      lang,
      jwt,
      resp?.key,
      res.concat(resp?.items)
    );
  }

  return res.concat(resp?.items);
};

export const listDictionaryQueryKey = "list-dictionary";
export const useListDictionaryQuery = (lang: string) => {
  const token = useJwtToken();
  return useQuery<any>({
    queryKey: [listDictionaryQueryKey, lang],
    queryFn: async () => {
      const resJson = await listDictionaryRecursive(lang, token);

      return resJson?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
    },
    refetchOnWindowFocus: false,
    // refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
