"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

import { createIndexDBStore } from "@/libs/index-db/index-db";

const useComponentsStore = createIndexDBStore({
  name: "mando/components",
  handler: (set: any, get: any) => ({
    components: null,
    setComponents: (f: any) =>
      typeof f === "function"
        ? set({ components: f(get().components) })
        : set({ components: f }),
  }),
});

export const useComponents = () => {
  const components: any = useComponentsStore((state) => state.components);
  const setComponents = useComponentsStore((state) => state.setComponents);

  return { components, setComponents };
};

export interface IComponent {
  input: string;
  hanzi: string;
  pinyin: string;
  roman: string;
  en: string;
  lang: string;
  id: string;
  group?: string;
}

const listComponents = async (
  options: { journeyId?: string; lang?: string },
  opts: {
    Authorization: string;
  }
): Promise<IComponent[]> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-components`, {
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
export function useListComponentsQuery(
  params = {} as {
    journeyId?: string;
    lang?: string;
    forceReload?: boolean;
  },
  options = {} as any
) {
  const { data: authUser } = useCurrentAuthUser({});
  const currentLang = useGetCurrentLang();

  const { components, setComponents } = useComponents();

  return useQuery(
    [listComponentsQueryKey, params?.forceReload],
    async () => {
      // if (options.query) {

      if (components && !params?.forceReload) {
        return components as IComponent[];
      }
      const response = await listComponents(
        { ...params, lang: currentLang },
        {
          Authorization: authUser?.jwt,
        }
      );

      setComponents(response);

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
      // ?.filter((item: any) => {
      //   return (item?.hanzi || item?.input)?.length === 1;
      //   // if (options?.singleItemsOnly) {
      //   //   return (item?.hanzi || item?.input)?.length === 1;
      //   // } else {
      //   //   return true;
      //   // }
      // })
      ?.filter((item: any) => {
        if (options?.includeAll) {
          return true;
        }

        if (options?.singleItemsOnly) {
          return (item?.hanzi || item?.input)?.length === 1;
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
