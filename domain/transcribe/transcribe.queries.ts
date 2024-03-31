"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

const url = "http://127.0.0.1:5000/v2";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useTranscriptionStore = create(
  persist(
    (set: any, get: any) => ({
      transcriptions: [],
      setTranscription: (event: any) =>
        set({ transcriptions: get().transcriptions.concat(event) }),
      // clearHistory: (event: any) => set({ history: [] })
    }),
    {
      name: "mandarino/transcriptions-cache-12-06-2023", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export function useTranscribeQuery(params: any, options: any) {
  const setTranscription = useTranscriptionStore(
    (state) => state.setTranscription
  );
  return useQuery(
    [queryIds.transcribe, params?.mediaUrl],
    async () => {
      if (params?.mediaUrl) {
        const response = await fetch(url, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mediaUrl: params?.mediaUrl,
            translation: true,
          }),
        });
        const res = await response.json();
        const transcriptions = res?.result?.segments.map(
          ({ id, start, end, text, temperature, ...rest }: any) => {
            return {
              id,
              start,
              end,
              text,
              // temperature
            };
          }
        );
        const translations = res?.translation?.segments.map(
          ({ id, start, end, text, temperature, ...rest }: any) => {
            return {
              id,
              start,
              end,
              text,
              // temperature
            };
          }
        );

        setTranscription({
          mediaUrl: params?.mediaUrl,
          translations: translations,
          language: res?.result?.language,
          transcriptions,
          // meta: {
          //   ...res
          // }
        });

        return {
          ...res,
          transcriptions,
        };
      }
    },
    {
      ...options,
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
export function useTranscribeQueryV2(
  params: {
    videoUrl: string;
  },
  options: any
) {
  return useQuery({
    queryKey: [queryIds.transcribeV2, params?.videoUrl],
    queryFn: async () => {
      if (params.videoUrl) {
        const response = await fetch("/api/transcribe", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoUrl: params.videoUrl,
          }),
        });
        const res = await response.json();

        return {
          ...res,
        };
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
