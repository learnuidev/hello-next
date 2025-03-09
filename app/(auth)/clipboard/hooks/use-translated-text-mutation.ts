import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslatedTextStore } from "./use-translated-text-store";

export const useTranslateTextMutation = () => {
  const token = useJwtToken();

  const queryClient = useQueryClient();

  const getDictionary = useTranslatedTextStore((state) => state.getDictionary);
  const setDictionary = useTranslatedTextStore((state) => state.setDictionary);

  return useMutation({
    mutationFn: async ({
      sourceLang,
      targetLang,
      input,
    }: {
      sourceLang: string;
      targetLang: string;
      input: string;
    }) => {
      const found = getDictionary(input);

      if (found) {
        console.log("FOUND translation", found);
        return found;
      }

      console.log("Not found in cache, fetching translation");

      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/translations/translate-text`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            sourceLang,
            targetLang,
            input,
          }),
        }
      );

      const respJson = await res.json();

      setDictionary(input, respJson);

      return respJson;
    },
  });
};
