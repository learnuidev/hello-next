"use client";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";

import { useQuery } from "@tanstack/react-query";
import { UserPlan } from "../plans.types";

export function useListUserPlansQuery() {
  const jwtToken = useJwtToken();
  return useQuery({
    queryKey: ["polar/list-user-plans"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    queryFn: async (): Promise<UserPlan[]> => {
      const res = await fetch(`/api/list-user-plans`, {
        method: "GET",
        headers: {
          Authorization: jwtToken,
        },
      });

      const plans = (await res.json()) as UserPlan[];

      return plans;
    },
  });
}
