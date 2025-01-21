import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface DetectLanguageResponse {
  lang: string;
}

export const useDetectLanguageQuery = (content: string, lang?: string) => {
  const token = useJwtToken();

  const router = useRouter();

  return useQuery<DetectLanguageResponse, Error>({
    queryKey: ["detect-content", content, lang],
    enabled: Boolean(content),
    retry: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      router.push(`/nmm/${content}?lang=${data?.lang}`);
      // if (lang) {
      //   return;
      // } else {
      //   router.push(`/nmm/${content}?lang=${data?.lang}`);
      // }
    },
    queryFn: async () => {
      try {
        if (lang) {
          return {
            lang,
          } as DetectLanguageResponse;
        } else {
          if (lang) {
            return {
              lang,
            };
          }
          const res = await fetch(`${siteConfig.apiUrlV2}/v1/detect-lanuage`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              content,
            }),
          });

          const respJson = (await res.json()) as DetectLanguageResponse;

          return respJson;
        }
      } catch (err) {
        throw err;
      }
    },
  });
};
