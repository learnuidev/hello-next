"use client";
import { queryIds } from "./queryIds";
// import { v4 as uuidv4 } from 'uuid'

import { useQuery } from "@tanstack/react-query";

const giphySearchUrl =
  "https://api.giphy.com/v1/gifs/search?api_key=ZjgduhBL2Am4ISt8WMJUEeKOiF7A4Rid&limit=5&offset=0&q=";

const search = async (query: string) => {
  const res = await fetch(`${giphySearchUrl}${query}`);
  const resp = await res.json();
  return resp;
};

export function useSearchQuery(options: any) {
  return useQuery<any>({
    queryKey: [queryIds.search, options?.query],
    queryFn: async () => {
      if (options.query) {
        const response = await search(options.query);
        return response;
      }
    },

    ...options,
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
