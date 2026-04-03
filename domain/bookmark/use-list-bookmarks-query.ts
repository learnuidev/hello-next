// const addBookmarkQueryKey = 'add-bookmark',

import { siteConfig } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useCurrentAuthUser } from "../auth/auth.queries";

interface IBookMark {
  createdAt: number;
  en: string;
  hanzi: string;
  input: string;
  id: string;
  lang: string;
  userId: string;
}

const listBookmarks = async (opts: {
  Authorization: string;
}): Promise<IBookMark[]> => {
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

  return useQuery({
    queryKey: [listBookmarksQueryKey, authUser?.jwt],
    enabled: !!authUser?.jwt,
    queryFn: async () => {
      const resp = await listBookmarks({
        Authorization: authUser?.jwt,
      });

      return resp;
    },
  });
};
