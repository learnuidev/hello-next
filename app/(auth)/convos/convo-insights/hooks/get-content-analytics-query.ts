"use client";

import { listenApiUrl } from "@/app/(auth)/listen/constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useQuery } from "@tanstack/react-query";
import { GetContentAnalyticsRespose } from "./convo-insights.types";
import { useFocusMode } from "../../play-v3/hooks/use-focus-mode";
import { useFocusIndex } from "../../play-v3/hooks/use-focus-index";

export function useGetContentAnalyticsQuery({
  contentId,
}: {
  contentId: string;
}) {
  const { setFocusMode } = useFocusMode(contentId);
  const { setFocusIndex } = useFocusIndex(contentId);
  const token = useJwtToken();
  return useQuery({
    queryKey: ["get-content-analytics", contentId],
    refetchInterval: 1000 * 60 * 1,
    queryFn: async (): Promise<GetContentAnalyticsRespose> => {
      console.log("yoooooo logged");

      const resp = await fetch(`${listenApiUrl}/v1/get-content-analytics`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contentId,
        }),
      });

      if (!resp?.ok) {
        throw new Error("Error");
      }

      const respJson = (await resp.json()) as GetContentAnalyticsRespose;

      setFocusMode(respJson.focusMode);
      setFocusIndex(respJson.focusIndex);

      return respJson;
    },
  });
}
