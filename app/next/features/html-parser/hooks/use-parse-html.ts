import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "./use-jwt-token";

import { z } from "zod";

const websiteSchema = z.object({
  website: z.string().url("Invalid URL"),
});

export const useParseHtmlQuery = (url: string) => {
  const token = useJwtToken();

  return useQuery({
    queryKey: ["parse-html", token, url],
    enabled: Boolean(url),
    retry: false,
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

        return res.json();
      } catch (err) {
        throw err;
      }
    },
  });
};
