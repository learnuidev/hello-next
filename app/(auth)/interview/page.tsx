"use client";

import Image from "next/image";
import { GRID_BANK_DATA } from "./mock-data";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Icons } from "@/components/ui/icons.v2";
import { GridBankMediaContent } from "./media.types";

export default function InterviewPage() {
  const {
    data: gridBankAssets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-grid-bank-assets"],
    queryFn: () => {
      return GRID_BANK_DATA;
    },
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
                <div
                  key={asset.video_id}
                  className="relative h-[32rem] w-full sm:h-72 sm:w-36 md:h-[40rem] md:w-[20rem] rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <button
                    onClick={() => {
                      toggleBookMark(asset.video_id);
                    }}
                    className="absolute top-4 right-4 z-50 text-2xl text-white"
                  >
                    {asset.bookmarked ? (
                      <Icons.bookmarkSolid />
                    ) : (
                      <Icons.bookmark />
                    )}
                  </button>
                  <Image
                    src={asset?.url_image_watermark}
                    alt={asset?.title}
                    fill
                    loading="lazy"
                    decoding="async"
                    className="object-cover transition-transform duration-300"
                    sizes="(max-width: 639px) 256px, (max-width: 1999px) 222px, (min-width: 1200px) 256px"
                  />
                </div>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
