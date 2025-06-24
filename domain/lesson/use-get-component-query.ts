"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useComponents } from "./component.queries";

interface IGetComponentParams {
  componentId?: string;
  hanzi?: string;
}
const getComponent = async (
  params: IGetComponentParams,
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

export const getComponentQueryKey = "get-component";
export function useGetComponentQuery(
  params = {} as IGetComponentParams,
  options = {} as any
) {
  const { components, setComponents, lastUpdated, setLastUpdated } =
    useComponents();
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any, any, any>({
    queryKey: [getComponentQueryKey, params?.hanzi, authUser?.jwt],
    queryFn: async () => {
      // if (options.query) {
      const response = await getComponent(params, {
        Authorization: authUser?.jwt,
      });

      return response;
    },

    ...options,
    onSuccess: (data: any) => {
      setComponents(
        components.map((comp: any) => {
          return comp?.hanzi === data?.hanzi ? data : comp;
        })
      );
    },
    enabled: Boolean(authUser?.jwt),

    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
