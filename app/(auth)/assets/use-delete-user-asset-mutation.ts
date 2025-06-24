"use client";

import { listUserAssetsQueryKey } from "@/domain/asset/use-list-user-assets";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUserAssetMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string }): Promise<any> => {
      const audioResp = await fetch(
        `${siteConfig.apiUrl}/v1/delete-user-asset`,
        {
          method: "POST",

          body: JSON.stringify(params),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        }
      );

      return audioResp.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        listUserAssetsQueryKey,
        authUser?.jwt,
      ] as any);
    },
  });
};
