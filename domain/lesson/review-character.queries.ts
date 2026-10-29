"use client";

import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { ICharacter } from "../character/character.types";

export type ReviewCharacterParams = {
  mode?: string;
  date?: string;
  input?: string;
  entryId?: string;
  level?: number;
  reviewMode?: string;
  lang?: string;
  character?: string;
  // Minutes from UTC, so a character learnt at 1am in Manila is filed under the
  // day the review list of the day names.
  tzOffset?: number;
  contentId?: string;
};

export type ReviewCharacterResponse = {
  character: ICharacter | null;
  component: any | null;
  lang?: string;
  isContent?: boolean;
  isEntry?: boolean;
  remainingCharacters: number;
};

export const getReviewCharacterQueryId = "get-review-character";

/**
 * The character to review of whichever review the page is on, as the API
 * decides it.
 *
 * The whole selection is made server-side — which characters the review is of,
 * which of them is due, the order they are asked in — so the browser does not
 * need the content's text nor every character the user has ever studied to know
 * what to ask next.
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
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(`Message ${res.statusText}`);
  }

  const resp = (await res.json()) as ReviewCharacterResponse;

  return resp;
};

export function useGetReviewCharacter(
  params: ReviewCharacterParams,
  options = {} as any,
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<ReviewCharacterResponse, Error>({
    queryKey: [getReviewCharacterQueryId, JSON.stringify(params)],
    queryFn: async () =>
      getReviewCharacter(params, {
        Authorization: authUser?.jwt,
      }),
    ...options,
    enabled: Boolean(authUser?.jwt),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
