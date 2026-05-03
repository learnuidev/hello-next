"use client";

import { currentAuthUser } from "@/libs/cognito/auth";
import { useQuery } from "@tanstack/react-query";

interface ContentPurchase {
  userId: string;
  // id = email_contentId
  id: string;
  createdAt: number;
  contentId: string;
  polarOrderId: string;
}

const getContentPurchaseApi = async (
  contentId: string,
): Promise<ContentPurchase> => {
  const authUser = await currentAuthUser();
  const jwtToken = authUser.jwt;

  const res = await fetch(`/api/get-content-purchase`, {
    method: "POST",
    body: JSON.stringify({ contentId }),
    headers: {
      Authorization: jwtToken,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || res.statusText);
  }

  const contentPurchase = await res.json();

  return contentPurchase;
};

export function useGetContentPurchase(contentId: string) {
  return useQuery({
    queryKey: ["polar/get-content-purchase", contentId],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: () => getContentPurchaseApi(contentId),
  });
}
