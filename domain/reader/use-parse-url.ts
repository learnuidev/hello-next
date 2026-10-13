"use client";

import { siteConfig } from "@/lib/config";
import { useMutation } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

export interface ParseUrlResponse {
  title: string;
  text: string;
}

const parseUrl = async (
  url: string,
  opts: { Authorization: string },
): Promise<ParseUrlResponse> => {
  const res = await fetch(`${siteConfig.contentApi}/v1/parse-url`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const resp = await res.json();

  if (!res.ok) {
    throw new Error(resp.message || "Could not read that url");
  }

  return resp;
};

export function useParseUrlMutation() {
  const { data: authUser } = useCurrentAuthUser({});

  return useMutation({
    mutationFn: async (url: string) => {
      return parseUrl(url, { Authorization: authUser?.jwt });
    },
  });
}
