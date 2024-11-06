"use client";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQuery } from "@tanstack/react-query";

export const useListNarakeetVoicesQuery = ({ lang }: { lang: string }) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: ["list-narakeet-voices", authUser?.jwt, lang],
    queryFn: async () => {
      const voices = await fetch("/api/list-narakeet-voices", {
        method: "POST",

        body: JSON.stringify({
          lang,
        }),

        headers: {
          Authorization: `${authUser?.jwt}`,
        },
      });

      return voices.json();
    },
  });
};
