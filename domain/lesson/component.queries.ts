"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

// TODO: Move this to .env
const url = `${siteConfig.apiUrl}/v1/list-components`;

export interface IComponent {
  input: string;
  hanzi: string;
  pinyin: string;
  roman: string;
  en: string;
  lang: string;
  id: string;
}

const listComponents = async (
  options: { journeyId?: string; lang?: string },
  opts: {
    Authorization: string;
  }
): Promise<IComponent[]> => {
  const res = await fetch(url, {
    // const res = await fetch("/api/list-components", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      lang: options?.lang,
      journeyId: options?.journeyId,
    }),
  });
  const resp = (await res.json()) as any;

  return resp;

  // return resp.sort((a: any, b: any) => (a.level || 0) - (b.level || 0));
};

export const listComponentsQueryKey = "list-components";
function useListComponentsQuery(
  params = {} as {
    journeyId?: string;
    lang?: string;
  },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});
  const currentLang = useGetCurrentLang();

  return useQuery(
    [listComponentsQueryKey],
    async () => {
      // if (options.query) {
      const response = await listComponents(
        { ...params, lang: currentLang },
        {
          Authorization: authUser?.jwt,
        }
      );

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
    ["get-component", params?.componentId],
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
  };
}
