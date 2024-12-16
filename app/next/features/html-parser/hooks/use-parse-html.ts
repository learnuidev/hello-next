import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "./use-jwt-token";

import { z } from "zod";
import { useHtmlHistoryStore } from "./use-html-history-store";
import { randomUUID } from "crypto";

const websiteSchema = z.object({
  website: z.string().url("Invalid URL"),
});

interface RelatedArticle {
  href: string;
  title: string;
  image: string;
}

interface ParsedHtmlSection {
  hanzi: string;
  image?: string;
  img?: string;
  caption?: string;
}
export interface ParseHtmlResponse {
  sourceId: string;
  type?: string;
  url: string;
  data: {
    title: string;
    audioUrl?: string;
    publicationDate?: string;

    links?: {
      title: string;
      href: string;
    }[];

    relatedArticles: RelatedArticle[];

    sections: ParsedHtmlSection[];
  };
}

export const useParseHtmlQuery = (url: string) => {
  const token = useJwtToken();

  const setHistory = useHtmlHistoryStore((state) => state.setHistory);

  return useQuery<ParseHtmlResponse, Error>({
    queryKey: ["parse-html", token, url],
    enabled: Boolean(url),
    // retry: false,
    refetchOnWindowFocus: false,
    // refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    queryFn: async () => {
      try {
        websiteSchema.parse({
          website: url,
        });
        const res = await fetch(`${siteConfig.apiUrlV2}/v1/parse-html`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            url,
          }),
        });

        const resp = await res.json();

        if (resp?.sourceId !== "unknown") {
          // setHistory({
          //   ...resp,
          //   id: crypto.randomUUID(),
          //   historyAddedAt: Date.now(),
          // });

          setHistory((prev: any) => {
            const exists = prev?.find((item: any) => item?.url === resp?.url);

            if (exists) {
              return prev?.map((item: any) => {
                const exists = item?.url === resp?.url;

                if (exists) {
                  return {
                    ...item,
                    historyAddedAt: Date.now(),
                    totalViewed: (item?.totalViewed || 0) + 1,
                  };
                }

                return item;
              });
            }

            return prev.concat({
              ...resp,
              id: crypto.randomUUID(),
              historyAddedAt: Date.now(),
              totalViewed: 1,
            });
          });
        }

        return resp;
      } catch (err) {
        throw err;
      }
    },
  });
};
