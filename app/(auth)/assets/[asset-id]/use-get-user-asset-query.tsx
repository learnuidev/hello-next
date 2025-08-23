"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";

export interface UserAsset {
  size: number;
  updatedAt: number;
  userId: string;
  status: "UPLOADED"; // could be extended to a union if there are more statuses
  extension: string;
  createdAt: number;
  uploadBucketKey: string;
  uploadedAt: number;
  id: string;
  contentType: string;
  name: string;
  sourceUrl: string;
}

const getUserAsset = async ({
  id,
  jwt,
}: {
  id: string;
  jwt: string;
}): Promise<UserAsset> => {
  const resp = await fetch(`${siteConfig.apiUrl}/v1/get-user-asset`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!resp.ok) {
    throw new Error("Something wrong happened");
  }

  const userAsset = await resp.json();

  return userAsset as UserAsset;
};

export const useGetUserAssetQuery = (id: string) => {
  const { data: authUser } = useCurrentAuthUser({});
  const jwt = useJwtToken();

  return useQuery({
    queryKey: ["get-user-asset", id],
    queryFn: async () => {
      const userAsset = await getUserAsset({ id, jwt });
      return userAsset;
    },
    retry: false,
  });
};
