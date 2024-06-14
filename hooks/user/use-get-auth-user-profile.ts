"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery } from "@tanstack/react-query";
import { siteConfig } from "@/lib/config";

interface User {
  email: string;
  createdAt: string;
}
const getAuthUser = async (opts: { Authorization: string }): Promise<User> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
  });
  const resp = await res.json();

  return resp as User;
};

export function useGetAuthUserProfileQuery(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: ["get-auth-user", authUser?.jwt],

    queryFn: async (): Promise<User> => {
      const response = await getAuthUser({
        Authorization: authUser?.jwt,
      });
      return response as User;
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
