"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserPreferenceKey,
  GetUserPreferenceResponse,
} from "./use-get-user-preference-query";

interface UpdatePreferenceResponse {
  isTrackingEnabled?: boolean;
  isNavigationEnabled?: boolean;
  isSearchEnabled?: boolean;
  learningMode?: string;
}

type UpdateUserPreferenceResponse = GetUserPreferenceResponse & {
  updatedAt: number;
};

export const useUpdateUserPrefenceMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      params: UpdatePreferenceResponse
    ): Promise<UpdateUserPreferenceResponse> => {
      const res = await fetch(
        `${siteConfig.apiUrl}/v1/update-user-preference`,
        {
          method: "POST",
          headers: {
            Authorization: `${authUser?.jwt}`,
          },
          body: JSON.stringify(params),
        }
      );
      const resp = await res.json();
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([getUserPreferenceKey]);
    },

    // ...opts,
  });
};
