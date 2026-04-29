"use client";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ContentsList } from "./components/contents-list";
import { listGridBankMediaContent } from "./modules/media/media.api";
import { GridBankMediaContent } from "./modules/media/media.types";

export default function InterviewPage() {
  const {
    data: gridBankContents,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-grid-bank-contents"],
    queryFn: () => {
      return listGridBankMediaContent();
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const queryClient = useQueryClient();

  const toggleBookMark = (videoId: string) => {
    queryClient.setQueryData(
      ["list-grid-bank-contents"],
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
    <div className="max-w-7xl mx-auto">
      <header className="p-4">
        <h1 className="font-light text-2xl">Grid Bank</h1>
      </header>

      <main>
        {isLoading ? (
          <div className="text-center my-32">
            <LottieLoadingAnimation />
          </div>
        ) : isError ? (
          <div>
            <p>Failed Loading Images</p>
          </div>
        ) : (
          <ContentsList gridBankContents={gridBankContents || []} />
        )}
      </main>
    </div>
  );
}
