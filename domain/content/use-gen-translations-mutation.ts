"use client";

import { siteConfig } from "@/lib/config";
import { currentAuthUser } from "@/libs/cognito/auth";
import { useMutation } from "@tanstack/react-query";

type GenTranslationsParams = {
  contentId: string;
};

const genTranslations = async (params: GenTranslationsParams) => {
  const opts = await currentAuthUser();

  const res = await fetch(`${siteConfig.apiUrl}/v1/gen-translations`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.jwt}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useGenTranslationsMutation(options = {} as any) {
  return useMutation<any, Error, GenTranslationsParams>({
    mutationFn: async (params) => {
      const response = await genTranslations(params);
      return response;
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSuccess) {
        options?.onSuccess(data);
      }
    },
    cacheTime: 1000 * 60 * 300,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
