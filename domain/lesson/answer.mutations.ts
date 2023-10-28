"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQueryClient } from "@tanstack/react-query";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/add-answer";

const addAnswer = async (options: {
  hanzi: string;
  answer: string;
  lessonId: string;
  phraseId: string;
  status: string;
  guessHistory: any
}) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp;
};

export function useAddAnswerMutation(options = {} as any) {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: {
      hanzi: string;
      answer: string;
      lessonId: string;
      phraseId: string;
      status: string;
      guessHistory: any
    }) => {
      const response = await addAnswer(params);
      return response;
    },
    {
      ...options,
      onSuccess: (data) => {
        if (options?.onSucess) {
          options?.onSuccess(data);
        }

        queryClient.invalidateQueries([queryIds?.listAnswers, data?.journeyId]);
      },
      cacheTime: 1000 * 60 * 300, // 30 minutes,
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
