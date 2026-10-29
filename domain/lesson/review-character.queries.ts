"use client";

import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ICharacter } from "../character/character.types";

/**
 * What the review endpoint is asked for: the content whose review it is, and
 * whether the whole content is being walked instead of only what is due.
 */
export type ReviewCharacterParams = {
  contentId: string;
  reviewMode?: string;
};

/**
 * What it answers: the character to review of that content, and how many are
 * left after it.
 */
export type ReviewCharacterResponse = {
  contentId: string;
  lang?: string;
  character: ICharacter | null;
  remainingItems: number;
};

export const getReviewCharacterQueryId = "get-review-character";

/**
 * The character to review of one content, as the API decides it: the content's
 * own characters, whichever of them are due, in review order.
 *
 * The whole selection is made server-side, so the browser does not need the
 * content's text nor every character the user has ever studied to know what to
 * ask next.
 */
const getReviewCharacter = async (
  params: ReviewCharacterParams,
  opts: {
    Authorization: string;
  },
): Promise<ReviewCharacterResponse> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-review-character`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      contentId: params.contentId,
      reviewMode: params.reviewMode,
    }),
  });

  if (!res.ok) {
    throw new Error(`Message ${res.statusText}`);
  }

  const resp = (await res.json()) as ReviewCharacterResponse;

  return resp;
};

export function useGetReviewCharacter(
  params: { contentId?: string; reviewMode?: string },
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ReviewCharacterResponse, Error>({
    queryKey: [getReviewCharacterQueryId, params?.contentId, params?.reviewMode],
    queryFn: async () =>
      getReviewCharacter(
        {
          contentId: params?.contentId as string,
          reviewMode: params?.reviewMode,
        },
        {
          Authorization: authUser?.jwt,
        },
      ),
    ...options,
    enabled: Boolean(authUser?.jwt) && Boolean(params?.contentId),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
