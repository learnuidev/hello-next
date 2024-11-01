"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { UploadFileResponse } from "@/domain/file-upload/use-upload-file";

export const listUserAssetsQueryKey = "list-user-assets";
export const useListUserAssets = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listUserAssetsQueryKey, authUser?.jwt],
    queryFn: async () => {
      const resp = await fetch(`${siteConfig.apiUrl}/v1/list-user-assets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser?.jwt}`,
        },
      });

      if (!resp.ok) {
        throw new Error("Something wrong happened");
      }

      const uploadedFiles = (await resp.json()) as UploadFileResponse[];
      return uploadedFiles.sort((a, b) => b?.createdAt - a?.createdAt);
    },
    retry: false,
  });
};
