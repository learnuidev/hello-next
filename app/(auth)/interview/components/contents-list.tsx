import { useQueryClient } from "@tanstack/react-query";
import { GridBankMediaContent } from "../modules/media/media.types";
import { ContentItemPreview } from "./content-item-preview";
import Link from "next/link";

export const ContentsList = ({
  gridBankContents,
}: {
  gridBankContents: GridBankMediaContent[];
}) => {
  const queryClient = useQueryClient();
  const toggleBookMark = (videoId: string) => {
    queryClient.setQueryData(
      ["list-grid-bank-assets"],
      (prevData: GridBankMediaContent[]) => {
        return prevData.map((item) => {
          if (item.video_id === videoId) {
            return {
              ...item,
              bookmarked: !item.bookmarked,
            };
          }

          return item;
        });
      },
    );
  };

  return (
    <section className="grid grid-cols-1 gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 p-4">
      {gridBankContents.map((content) => {
        return (
          <Link href={`/interview/${content.video_id}`}>
            <ContentItemPreview
              key={content.video_id}
              asset={content}
              onToggleBookmark={toggleBookMark}
            />
          </Link>
        );
      })}
    </section>
  );
};
