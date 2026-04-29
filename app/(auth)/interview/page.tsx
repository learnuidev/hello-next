"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ContentItemPreview } from "./components/content-item-preview";
import { listGridBankMediaContent } from "./modules/media/media.api";
import { GridBankMediaContent } from "./modules/media/media.types";

export default function InterviewPage() {
  const {
    data: gridBankAssets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-grid-bank-assets"],
    queryFn: listGridBankMediaContent,
  });

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
    <div className="max-w-9xl mx-auto">
      <header className="p-4">
        <h1 className="font-light text-2xl">Grid Bank</h1>
      </header>

      <main>
        {isLoading ? (
          <div>
            <p>Is Loading...</p>{" "}
          </div>
        ) : isError ? (
          <div>
            <p>Failed Loading Images</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 p-4">
            {gridBankAssets?.map((asset) => {
              return (
                <ContentItemPreview
                  key={asset.video_id}
                  asset={asset}
                  onToggleBookmark={toggleBookMark}
                />
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
