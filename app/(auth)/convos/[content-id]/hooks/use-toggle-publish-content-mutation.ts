import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useGetPublicContentsQueryKey,
  useGetPublishedContents,
} from "./use-list-published-contents-query";

interface TogglePublishContentRequestParams {
  type: "publish" | "unpublish";
  contentId: string;
}

export const useTogglePublishContentMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  const { setLastUpdated } = useGetPublishedContents();

  const publicContentsQueryKey = useGetPublicContentsQueryKey();

  return useMutation({
    mutationFn: async (params: TogglePublishContentRequestParams) => {
      const resp = await fetch(
        `${siteConfig.apiUrl}/v1/toggle-publish-content`,
        {
          method: "POST",

          body: JSON.stringify(params),

          headers: {
            Authorization: `${authUser?.jwt}`,
          },
        }
      );

      if (!resp.ok) {
        throw new Error(resp?.statusText);
      }

      const respJson = await resp.json();
      return respJson;
    },

    onSuccess: (data: any) => {
      setLastUpdated(null);
      queryClient.refetchQueries(publicContentsQueryKey);
    },
  });
};
