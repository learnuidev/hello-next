import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface TogglePublishContentRequestParams {
  type: "publish" | "unpublish";
  contentId: string;
}

export const publicContentsQueryKey = `list-published-contents`;
export const useListPublishedContentsQuery = ({ key }: { key?: string }) => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [publicContentsQueryKey, authUser?.jwt],
    queryFn: async () => {
      if (authUser?.jwt) {
        const resp = await fetch(`${siteConfig.apiUrl}/v1/list-contents`, {
          method: "POST",

          body: JSON.stringify({
            type: "public",
          }),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        });

        if (!resp.ok) {
          throw new Error(resp?.statusText);
        }

        const respJson = await resp.json();
        return respJson;
      }
    },
  });
};
