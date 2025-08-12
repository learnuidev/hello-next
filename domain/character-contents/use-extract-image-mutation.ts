import { siteConfig } from "@/lib/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listCharacterContentsQueryKey } from "./use-list-character-contents-query";
import { CharacterContents } from "./character-contents.types";

const exreactImageApi = async (
  id: string,
  authUser: { jwt: string }
): Promise<CharacterContents> => {
  const res = await fetch(`${siteConfig.apiUrlV2}/v1/extract-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authUser?.jwt}`,
    },
    body: JSON.stringify({
      id,
    }),
  });
  const resp = (await res.json()) as any;
  return resp;
};

export const useExtractImageMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string } & any) => {
      const resp = await exreactImageApi(id, authUser);
      return resp;
    },
    onSuccess: (resp: any) => {
      queryClient.invalidateQueries({
        queryKey: [listCharacterContentsQueryKey, authUser?.jwt, resp?.content],
      });
    },
  });
};

export const useExtractImageQuery = (id: string) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: ["extract-image", id],
    queryFn: async () => {
      const resp = await exreactImageApi(id, authUser);
      return resp;
    },
  });
};
