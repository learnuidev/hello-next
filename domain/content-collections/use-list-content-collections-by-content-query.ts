import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { contentCollectionQueryIds } from "./query-ids";
import { ContentCollectionsByContentResponse } from "./content-collections.types";

const listContentCollectionsByContent = async (
  contentId: string,
  opts: { Authorization: string },
): Promise<ContentCollectionsByContentResponse> => {
  const res = await fetch(
    `${siteConfig.apiUrlV2}/v1/content-collections/by-content/${encodeURIComponent(
      contentId,
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: `${opts?.Authorization}`,
      },
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any)?.message || "Failed to fetch collections");
  }

  return res.json();
};

export const useListContentCollectionsByContentQuery = (
  params: { contentId: string },
  options = {} as any,
) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [
      contentCollectionQueryIds.contentCollectionsByContent,
      params.contentId,
      authUser?.jwt,
    ],
    enabled: !!authUser?.jwt && !!params.contentId,
    queryFn: async () => {
      const resp = await listContentCollectionsByContent(params.contentId, {
        Authorization: authUser?.jwt,
      });
      return resp;
    },
    ...options,
  });
};
