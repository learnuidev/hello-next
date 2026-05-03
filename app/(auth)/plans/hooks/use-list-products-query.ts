"use client";

import { currentAuthUser } from "@/libs/cognito/auth";

import { ProductsListResponse } from "@polar-sh/sdk/models/operations/productslist.js";
import { useQuery } from "@tanstack/react-query";

export function useListProductsQuery() {
  return useQuery({
    queryKey: ["polar/list-products"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    queryFn: async (): Promise<ProductsListResponse> => {
      const authUser = await currentAuthUser();
      const res = await fetch(`/api/list-products`, {
        method: "GET",
        headers: {
          Authorization: authUser.jwt,
        },
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json();
    },
  });
}
