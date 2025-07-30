"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";

import { ProductsListResponse } from "@polar-sh/sdk/models/operations/productslist.js";
import { useQuery } from "@tanstack/react-query";

export function useListUserPlansQuery() {
  const jwtToken = useJwtToken();
  return useQuery({
    queryKey: ["polar/list-user-plans"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    queryFn: async (): Promise<ProductsListResponse> => {
      const res = await fetch(`/api/list-user-plans`, {
        method: "GET",
        headers: {
          Authorization: jwtToken,
        },
      });

      return res.json();
    },
  });
}
