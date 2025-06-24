// const addBookmarkQueryKey = 'add-bookmark',

import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

const listBookmarks = async (opts: { Authorization: string }) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/list-bookmarks`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify({}),
  });
  const resp = await res.json();
  return resp;
};

export const listBookmarksQueryKey = "list-bookmarks";
export const useListBookmarksQuery = () => {
  const { data: authUser } = useCurrentAuthUser({});

  return useQuery<any>({
    queryKey: [listBookmarksQueryKey, authUser?.jwt],
    queryFn: async () => {
      const resp = await listBookmarks({
        Authorization: authUser?.jwt,
      });

      return resp;
    },
  });
};
