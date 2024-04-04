"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/list-components";

const listComponents = async (
  options: { journeyId?: string },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      journeyId: options?.journeyId,
    }),
  });
  const resp = (await res.json()) as any;
  return resp;

  // return resp.sort((a: any, b: any) => (a.level || 0) - (b.level || 0));
};

function useListComponentsQuery(
  params = {} as {
    journeyId?: string;
  },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.listComponents, params?.journeyId],
    async () => {
      // if (options.query) {
      const response = await listComponents(params, {
        Authorization: authUser?.jwt,
      });

      return response;
    },
    {
      ...options,
      enabled: Boolean(authUser?.jwt),

      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
export function useListComponents(
  options = {} as {
    journeyId?: string;
    discoverOnly?: boolean;
    includeAll?: boolean;
  }
) {
  const { data, ...rest } = useListComponentsQuery({
    journeyId: options?.journeyId,
  });

  const includeDiscoverOnly = Boolean(options?.discoverOnly);
  return {
    data: data
      ?.filter((x: any) => {
        if (options?.includeAll) {
          return true;
        } else {
          return includeDiscoverOnly ? !x.level : x.level;
        }
      })
      .sort((a: any, b: any) => (a.level || 0) - (b.level || 0)),
    ...rest,
  };
}
