"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";

import { ProductsListResponse } from "@polar-sh/sdk/models/operations/productslist.js";
import { useQuery } from "@tanstack/react-query";

export function useListProductsQuery() {
  const jwtToken = useJwtToken();
  return useQuery({
    queryKey: ["polar/list-products"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    queryFn: async (): Promise<ProductsListResponse> => {
      const res = await fetch(`/api/list-products`, {
        method: "GET",
        headers: {
          Authorization: jwtToken,
        },
      });

      return res.json();
    },
  });
}
