"use client";

import { PageContainer } from "@/components/page-container";
import { Icons } from "@/components/ui/icons.v2";
import { useGetSeriesContentDetailsQuery } from "@/domain/content-v2/use-get-series-content-details-query";
import { SeriesContentDetails } from "@/domain/content-v2/series-content-details.types";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ContentDetailsPage() {
  const params = useParams<{ contentId: string }>();
  const contentId = params.contentId;

  const { data, isLoading, error } = useGetSeriesContentDetailsQuery({
    contentId,
  });

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Icons.spinner className="animate-spin h-8 w-8" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">
            {error instanceof Error ? error.message : "Error loading content"}
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!data?.content) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <div>Content not found</div>
        </div>
      </PageContainer>
    );
  }

  const content: SeriesContentDetails = data.content;

  return (
    <PageContainer>
      <header>
        <nav className="mt-4">
          <Link href={`/series/${content.seriesId}`}>
            <Icons.back />
          </Link>
        </nav>
        <div className="my-8">
          <h1 className="text-3xl font-bold">{content.title}</h1>
          <p className="text-gray-600 mt-2">Format: {content.format}</p>
        </div>
      </header>

      <main className="bg-gray-50">
        {content.mediaUrl && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Media</h2>
            {content.format === "youtube" || content.youtubeUrl ? (
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={content.mediaUrl || content.youtubeUrl}
                  title="Video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <audio controls className="w-full">
                <source src={content.mediaUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        )}

        {content.transcriptions && content.transcriptions.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Transcriptions</h2>
            <div className="space-y-4">
              {content.transcriptions.map((transcription) => (
                <div
                  key={transcription.id}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  {"hanzi" in transcription ? (
                    <div>
                      <p className="text-lg font-medium mb-2">
                        {transcription.hanzi}
                      </p>
                      {transcription.pinyin && (
                        <p className="text-gray-600 mb-2">
                          {transcription.pinyin}
                        </p>
                      )}
                      {transcription.chinglish && (
                        <p className="text-gray-500 mb-2">
                          {transcription.chinglish}
                        </p>
                      )}
                      {transcription.en && (
                        <p className="text-gray-700">{transcription.en}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      {transcription.words.map((word, idx) => (
                        <span key={idx} className="mr-2">
                          {word.input}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <code>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </code>
        </div>
      </main>
    </PageContainer>
  );
}
