import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { collectionQueryIds } from "./queryIds";

export interface ICollection {
  id: string;
  userId: string;
  title: string;
  totalItems: number;
  createdAt: number;
  updatedAt: number;
}

const listCollections = async (opts: {
  Authorization: string;
  key?: string;
}): Promise<{ items: ICollection[]; lastEvaluatedKey: any }> => {
  const url = opts.key
    ? `${siteConfig.apiUrlV2}/v1/collections?key=${encodeURIComponent(JSON.stringify(opts.key))}`
    : `${siteConfig.apiUrlV2}/v1/collections`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
  });
  const resp = await res.json();
  return resp;
};

export const listCollectionsQueryKey = "list-collections";

export const useListCollectionsQuery = (options = {} as any) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listCollectionsQueryKey, authUser?.jwt],
    enabled: !!authUser?.jwt,
    queryFn: async () => {
      const resp = await listCollections({
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    ...options,
  });
};
