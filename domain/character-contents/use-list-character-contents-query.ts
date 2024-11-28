import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

export const listCharacterContentsQueryKey = "list-character-contents";

export const useListCharacterContentsQuery = (content: string) => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery({
    queryKey: [listCharacterContentsQueryKey, authUser?.jwt, content],
    queryFn: async () => {
      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/list-character-contents`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authUser?.jwt}`,
          },
          body: JSON.stringify({
            content,
          }),
        }
      );
      const resp = (await res.json()) as any;
      return resp;
    },
  });
};

siteConfig;
