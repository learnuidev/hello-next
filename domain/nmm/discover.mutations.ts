"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { getComponentQueryKey } from "../lesson/use-get-component-query";
import {
  listComponentsQueryKey,
  listComponentsQueryMapKey,
  useComponents,
} from "../lesson/component.queries";
import { siteConfig } from "@/lib/config";

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
  const res = await fetch(`${siteConfig.apiUrl}/v1/discover"`, {
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
  const { components, setComponents, lastUpdated, setLastUpdated } =
    useComponents();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: DiscoverParams) => {
      const response = await discover(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    ...options,
    onSuccess: (data: any) => {
      if (options?.onSucess) {
        options?.onSuccess(data);
      }

      queryClient.refetchQueries([listComponentsQueryKey, true] as any);
      queryClient.refetchQueries([listComponentsQueryMapKey, true] as any);

      queryClient.setQueriesData(
        [listComponentsQueryMapKey, undefined, lastUpdated] as any,
        (props: any) => {
          return {
            ...props,
            [data?.hanzi || data?.input]: data,
          };
        }
      );
      console.log("TODO");

      setComponents(
        components.map((comp: any) => {
          if (comp?.hanzi === data?.hanzi) {
            return data;
          }

          return comp;
        })
      );

      queryClient.setQueryData(
        [getComponentQueryKey, data?.hanzi, authUser?.jwt],
        (old: any) => {
          return data;
        }
      );

      // queryClient.invalidateQueries([
      //   getComponentQueryKey,
      //   data?.hanzi,
      //   authUser?.jwt,
      // ]);
    },
  });
}

export const discoverHanziQueryId = "discover-hanzi";

export function useDiscoverHanziQuery(params: DiscoverParams) {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any, any, any>({
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
