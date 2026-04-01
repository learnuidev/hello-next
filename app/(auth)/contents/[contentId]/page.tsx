"use client";

import { Icons } from "@/components/ui/icons.v2";
import { useGetSeriesContentDetailsQuery } from "@/domain/content-v2/use-get-series-content-details-query";
import { SeriesContentDetails } from "@/domain/content-v2/series-content-details.types";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ContentPlayerCore } from "./components/content-player-core";

export default function ContentDetailsPage() {
  const params = useParams<{ contentId: string }>();
  const contentId = params.contentId;

  const { data, isLoading, error } = useGetSeriesContentDetailsQuery({
    contentId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icons.spinner className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">
          {error instanceof Error ? error.message : "Error loading content"}
        </div>
      </div>
    );
  }

  if (!data?.content) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div>Content not found</div>
      </div>
    );
  }

  const content: SeriesContentDetails = data.content;

  return (
    <>
      <header className="bg-white dark:bg-[rgb(9,10,11)]">
        <nav className="mt-4 px-8">
          <Link href={`/series/${content.seriesId}`}>
            <Icons.back />
          </Link>
        </nav>
        <div className="my-8 px-8">
          <h1 className="text-3xl font-bold">{content.title}</h1>
          <p className="text-gray-600 mt-2">Format: {content.format}</p>
        </div>
      </header>

      <ContentPlayerCore content={content} />
    </>
  );
}
