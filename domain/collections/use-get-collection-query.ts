import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { collectionQueryIds } from "./queryIds";

export interface ICollectionItem {
  id: string;
  collectionId: string;
  createdAt: number;
  updatedAt: number;
  [key: string]: any;
}

export interface ICollectionWithItems {
  id: string;
  userId: string;
  title: string;
  totalItems: number;
  createdAt: number;
  updatedAt: number;
  items: ICollectionItem[];
}

const getCollection = async (
  collectionId: string,
  opts: { Authorization: string },
): Promise<ICollectionWithItems> => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/collections/${collectionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );
  const resp = await res.json();
  return resp;
};

export const useGetCollectionQuery = (
  params: { collectionId: string },
  options = {} as any,
) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [
      collectionQueryIds.getCollection,
      params.collectionId,
      authUser?.jwt,
    ],
    enabled: !!authUser?.jwt && !!params.collectionId,
    queryFn: async () => {
      const resp = await getCollection(params.collectionId, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    ...options,
  });
};
