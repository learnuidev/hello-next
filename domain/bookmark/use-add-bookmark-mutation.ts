import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { listBookmarksQueryKey } from "./use-list-bookmarks-query";

const addBookmark = async (
  params: any,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-bookmark`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export const useAddBookmarkMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: any) => {
      const resp = await addBookmark(params, {
        Authorization: authUser?.jwt,
      });

      return resp;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        [listBookmarksQueryKey, authUser?.jwt],
        (old: any) => {
          return [data, ...old];
        }
      );
    },
  });
};
