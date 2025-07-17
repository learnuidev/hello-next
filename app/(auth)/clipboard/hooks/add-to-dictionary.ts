import { siteConfig } from "@/lib/config";

export const addToDictionary = async ({
  lang,
  word,
  token,
  context,
}: {
  lang: string;
  word: string;
  token: string;
  context?: any;
}) => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/dictionary/add-to-dictionary`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ lang, input: word, context }),
    }
  );

  const resJson = await res.json();

  return resJson;
};
