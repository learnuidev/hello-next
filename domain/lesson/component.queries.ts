"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";

// TODO: Move this to .env
const url = `${siteConfig.apiUrl}/v1/list-components`;

const listComponents = async (
  options: { journeyId?: string },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(url, {
    // const res = await fetch("/api/list-components", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      journeyId: options?.journeyId,
    }),
  });
  const resp = (await res.json()) as any;

  // console.log("RESP", resp);
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

      // refetchOnWindowFocus: false,
      // refetchOnFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
    }
  );
}

const getComponent = async (
  params: { componentId: string },
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/get-component`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = (await res.json()) as any;
  return resp;

  // return resp.sort((a: any, b: any) => (a.level || 0) - (b.level || 0));
};

export function useGetComponentQuery(
  params = {} as {
    componentId: string;
  },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery(
    [queryIds.listComponents, params.componentId],
    async () => {
      // if (options.query) {
      const response = await getComponent(params, {
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
    singleItemsOnly?: boolean;
    includeAll?: boolean;
  }
) {
  const { data, ...rest } = useListComponentsQuery({
    journeyId: options?.journeyId,
  });

  const includeDiscoverOnly = Boolean(options?.discoverOnly);
  return {
    data: data
      ?.filter((item: any) => {
        if (options?.singleItemsOnly) {
          return (item?.hanzi || item?.input)?.length === 1;
        } else {
          return true;
        }
      })
      ?.filter((item: any) => {
        if (options?.singleItemsOnly) {
          return (item?.hanzi || item?.input)?.length === 1;
        }
        if (options?.includeAll) {
          return true;
        } else {
          return includeDiscoverOnly ? !item.level : item.level;
        }
      })
      .map((item: any, idx: any) => {
        if (item.level) {
          return item;
        }

        return {
          ...item,
          level: 10000 + idx,
        };
      })
      .sort((a: any, b: any) => (a.level || 0) - (b.level || 0)),
    ...rest,

    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  };
}
