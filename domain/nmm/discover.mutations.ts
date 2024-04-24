"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { queryIds } from "../lesson/queryIds";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/discover";

type DiscoverParams = {
  hanzi: string;
  lang?: string;
};

const discover = async (
  params: DiscoverParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useDiscoverMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: DiscoverParams) => {
      const response = await discover(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    {
      ...options,
      onSuccess: (data) => {
        if (options?.onSucess) {
          options?.onSuccess(data);
        }

        queryClient.invalidateQueries([
          queryIds.listComponents,
          data?.journeyId,
        ]);
      },
    }
  );
}

export const discoverHanziQueryId = "discover-hanzi";

export function useDiscoverHanziQuery(params: DiscoverParams) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [discoverHanziQueryId, params.hanzi],
    queryFn: async () => {
      if (authUser?.jwt && params?.hanzi) {
        const response = await discover(params, {
          Authorization: authUser?.jwt,
        });
        return response;
      }
    },

    enabled: Boolean(authUser?.jwt) && Boolean(params?.hanzi),
  });
}
