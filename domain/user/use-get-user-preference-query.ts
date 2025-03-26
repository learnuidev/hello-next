"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

import { siteConfig } from "@/lib/config";
import { useSettingsDialogState } from "@/components/settings-dialog/settings-dialog.state";

interface ListMeaningsParams {
  sentenceId?: string;
  content: string;
  lang: string;
}

export interface GetUserPreferenceResponse {
  userId: string;
  isContentTrackingEnabled?: boolean;
  isNavigationEnabled?: boolean;
  isSearchEnabled?: boolean;
  learningMode?: string;
  automaticallyShowAndHideDock?: boolean;
}

const getUserPrefrence = async (opts: {
  Authorization: string;
}): Promise<GetUserPreferenceResponse> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-user-preference`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({}),
  });
  const resp = (await res.json()) as GetUserPreferenceResponse;

  return resp;
};

export const getUserPreferenceKey = "get-user-preference";

export function useGetUserPreferenceQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const setUserPreferenceState = useSettingsDialogState(
    (state) => state.setUserPreferenceState
  );

  return useQuery<GetUserPreferenceResponse, Error>({
    queryKey: [getUserPreferenceKey],

    queryFn: async () => {
      const response = await getUserPrefrence({
        Authorization: authUser?.jwt,
      });
      return response as GetUserPreferenceResponse;
    },

    ...options,
    onSuccess: (val: any) => {
      setUserPreferenceState(val);
    },
    retry: false,
    enabled: Boolean(authUser?.jwt),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
