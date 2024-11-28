import { siteConfig } from "@/lib/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listCharacterContentsQueryKey } from "./use-list-character-contents-query";

export const useAddCharacterContentMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, ...rest }: { content: string } & any) => {
      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/add-character-content`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authUser?.jwt}`,
          },
          body: JSON.stringify({
            content,
            ...rest,
          }),
        }
      );
      const resp = (await res.json()) as any;
      return resp;
    },
    onSuccess: (resp: any) => {
      queryClient.invalidateQueries([
        listCharacterContentsQueryKey,
        authUser?.jwt,
        resp?.content,
      ]);
    },
  });
};

siteConfig;
