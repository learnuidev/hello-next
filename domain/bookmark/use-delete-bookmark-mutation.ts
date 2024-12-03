// const addBookmarkQueryKey = 'add-bookmark',

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";
import { siteConfig } from "@/lib/config";
import { listBookmarksQueryKey } from "./use-list-bookmarks-query";

const deleteBookmark = async (
  params: any,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/delete-bookmark`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export const useDeleteBookmarkMutation = () => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: any) => {
      const resp = await deleteBookmark(params, {
        Authorization: authUser?.jwt,
      });

      return resp;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        [listBookmarksQueryKey, authUser?.jwt],
        (old: any) => {
          return old?.filter((item: any) => item?.id !== data?.id);
        }
      );
    },
  });
};
