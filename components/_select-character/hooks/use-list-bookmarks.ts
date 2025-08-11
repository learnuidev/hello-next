import { useListBookmarksQuery } from "@/domain/bookmark/use-list-bookmarks-query";

export const useListBookmarks = (character: string) => {
  const { data } = useListBookmarksQuery();

  return (
    data?.filter((item) =>
      (item?.input || item?.hanzi)
        ?.toLowerCase()
        ?.includes(character?.toLowerCase())
    ) || []
  );
};
