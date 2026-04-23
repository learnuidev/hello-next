"use client";

import { currentAuthUser } from "@/libs/cognito/auth";

export const fetchWithToken = async (url: string, options?: any) => {
  const opts = await currentAuthUser();

  return await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: opts.jwt,
    },
  });
};
