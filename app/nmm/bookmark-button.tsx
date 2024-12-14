import { Icons } from "@/components/ui/icons.v2";
import { useAddBookmarkMutation } from "@/domain/bookmark/use-add-bookmark-mutation";
import { useDeleteBookmarkMutation } from "@/domain/bookmark/use-delete-bookmark-mutation";
import { useListBookmarksQuery } from "@/domain/bookmark/use-list-bookmarks-query";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const BookmarkButton = (props: {
  hanzi: string;
  level?: number;
  lang?: string;
  pinyin?: string;
  en?: string;
  className?: string;
}) => {
  const { hanzi, pinyin, lang, en, className } = props;
  const { data } = useListBookmarksQuery();
  const searchParams = useSearchParams();

  const context = searchParams?.get("context");

  const bookmarked = data?.filter((item: any) => item?.hanzi === hanzi)?.[0];

  const addBookMarkMutation = useAddBookmarkMutation();
  const deleteBookMarkMutation = useDeleteBookmarkMutation();

  return (
    <button
      disabled={
        deleteBookMarkMutation?.isLoading || addBookMarkMutation?.isLoading
      }
      onClick={() => {
        if (bookmarked) {
          deleteBookMarkMutation.mutateAsync({
            hanzi,
          });
        } else {
          addBookMarkMutation.mutateAsync({
            hanzi,
            en,
            pinyin,
            lang,
            context,
          });
        }
      }}
      className={cn("text-xl", className)}
    >
      {deleteBookMarkMutation?.isLoading || addBookMarkMutation?.isLoading ? (
        <Icons.spinner spinPulse />
      ) : bookmarked ? (
        <Icons.bookmarkSolid />
      ) : (
        <Icons.bookmark />
      )}
    </button>
  );
};
