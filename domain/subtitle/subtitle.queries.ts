"use client";

import { useQuery } from "@tanstack/react-query";

export function useListSubtitlesQuery(
  params: {
    videoUrl: string;
    lang?: string;
  },
  options: any
) {
  return useQuery({
    queryKey: ["list-subtitles", params?.videoUrl],
    queryFn: async () => {
      if (params.videoUrl) {
        const response = await fetch("/api/list-subtitles", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoUrl: params.videoUrl,
            lang: params?.lang || "zh-CN",
          }),
        });
        const res = await response.json();

        return res;
      }
    },
    retry: false,
    ...options,
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
