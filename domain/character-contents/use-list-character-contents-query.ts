import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import {
  CharacterContents,
  ListCharacterContentsQuery,
} from "./character-contents.types";

export const listCharacterContentsQueryKey = "list-character-contents";

const listCharacterContentsApi = async (
  params: ListCharacterContentsQuery,
  authUser: { jwt: string }
): Promise<CharacterContents[]> => {
  const res = await fetch(`${siteConfig.apiUrlV2}/v1/list-character-contents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authUser?.jwt}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();

  return resp;
};

export const useListCharacterContentsQuery = (
  params: ListCharacterContentsQuery
) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listCharacterContentsQueryKey, params.content],
    queryFn: async () => {
      const resp = await listCharacterContentsApi(params, {
        jwt: authUser.jwt,
      });
      return resp?.sort((a, b) => b?.createdAt - a?.createdAt);
    },
  });
};

siteConfig;
