"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { siteConfig } from "@/lib/config";

interface UserProfile {
  followingCount: number;
  likesCount: number;
  roles: string[];
  followersCount: number;
  createdAt: string;
  email: string;
  compositionsCount: number;
}
const getAuthUser = async (opts: { Authorization: string }) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
  });
  const resp = await res.json();

  return resp as UserProfile;
};

export function useGetAuthUserProfileQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<UserProfile, Error>({
    queryKey: ["get-auth-user", authUser?.jwt],

    queryFn: async () => {
      const response = await getAuthUser({
        Authorization: authUser?.jwt,
      });
      return response as UserProfile;
    },

    ...options,
    retry: false,
    enabled: Boolean(authUser?.jwt),
    // cacheTime: 1000 * 60 * 300, // 30 minutes,
    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
