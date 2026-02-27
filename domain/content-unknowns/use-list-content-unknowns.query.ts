import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import {
  ListContentUnknownsResponse,
  ListUnknownsRequest,
} from "./content-unknowns.types";

const listContentUnknowns = async (
  { contentId }: ListUnknownsRequest,
  opts: {
    Authorization: string;
  }
): Promise<ListContentUnknownsResponse> => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-unknowns`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify({ contentId }),
  });
  const resp = await res.json();
  return resp;
};

export const listContentUnknownsQueryKey = "list-content-unknowns";
export const useListContentUnknownsQuery = (contentId?: string) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listContentUnknownsQueryKey, authUser?.jwt, contentId],
    queryFn: async () => {
      const resp = await listContentUnknowns(
        { contentId: contentId || "" },
        {
          Authorization: authUser?.jwt,
        }
      );

      return resp;
    },
    enabled: !!contentId,
  });
};
