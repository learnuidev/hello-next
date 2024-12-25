import { siteConfig } from "@/lib/config";
import { useMutation } from "@tanstack/react-query";
import { useJwtToken } from "../../html-parser/hooks/use-jwt-token";

export const useAddTranslationMutation = () => {
  const token = useJwtToken();

  return useMutation({
    mutationFn: async (props: {
      input: string;
      sourceLang: string;
      targetLang: string;
      contextId: string;
    }) => {
      const res = await fetch(`${siteConfig.apiUrlV2}/v1/add-translation`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(props),
      });

      return res.json();
    },
  });
};
