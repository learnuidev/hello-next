"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

const addAnswer = async (
  options: {
    hanzi: string;
    answer: string;
    lessonId: string;
    phraseId: string;
    status: string;
    guessHistory: any;
  },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-answer`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp;
};

export function useAddAnswerMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      hanzi: string;
      answer: string;
      lessonId: string;
      phraseId: string;
      status: string;
      guessHistory: any;
    }) => {
      const response = await addAnswer(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.invalidateQueries({
        queryKey: [queryIds?.listAnswers, data?.journeyId],
      });
    },
    cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
