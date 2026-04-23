"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useSearchQueryStore } from "@/components/search/state";
import { siteConfig } from "@/lib/config";
import { fetchWithToken } from "@/libs/cognito/fetch-with-token";

const fetchSearchSuggestions = async (query: string) => {
  if (!query) {
    return [];
  }

  const response = await fetchWithToken(`${siteConfig.apiUrl}/v1/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch search suggestions");
  }

  const data = await response.json();
  return data.items || [];
};

export const useSearchSuggestions = () => {
  const querySync = useSearchQueryStore((state) => state.querySync);
  const setSearchSuggestions = useSearchQueryStore(
    (state) => state.setSearchSuggestions,
  );
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
  }, 1000);

  useEffect(() => {
    if (querySync) {
      debouncedSetQuery(querySync);
    } else {
      setDebouncedQuery("");
    }
  }, [querySync, debouncedSetQuery]);

  const { data, isLoading } = useQuery({
    queryKey: ["search-suggestions", debouncedQuery],
    queryFn: () => fetchSearchSuggestions(debouncedQuery),
    enabled: !!debouncedQuery,
    staleTime: 300000,
  });

  useEffect(() => {
    setSearchSuggestions(data || []);
  }, [data, setSearchSuggestions]);

  return { isLoading, data, debouncedQuery, querySync };
};
