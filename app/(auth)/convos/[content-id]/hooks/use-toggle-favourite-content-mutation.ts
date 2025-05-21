import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetFavouritesContentsKey } from "./use-list-favourited-contents-query";

interface ToggleFavouriteContentRequestParams {
  type: "favourite" | "unfavourite";
  contentId: string;
}

export const useToggleFavouriteContentMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();

  const favouriteContentsKey = useGetFavouritesContentsKey();

  return useMutation({
    mutationFn: async (params: ToggleFavouriteContentRequestParams) => {
      const resp = await fetch(
        `${siteConfig.apiUrl}/v1/toggle-favourite-content`,
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

    onSuccess: () => {
      queryClient.refetchQueries(favouriteContentsKey);
    },
  });
};
