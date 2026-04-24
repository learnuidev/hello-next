"use client";

import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { ContentEpisode } from "@/domain/content-v2/content-v2.types";
import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";
import { useIsEnrolled } from "@/domain/enrollments";
import { cn } from "@/lib/utils";

export function SeriesDetailsTabs({
  seriesId,
  className,
  onEpisodeClick,
}: {
  seriesId: string;
  className?: string;
  onEpisodeClick?: (episodeId: string) => void;
}) {
  const { data } = useGetSeriesDetailsQuery({
    seriesId,
  });

  const { isEnrolled, isLoading: isEnrollmentLoading } =
    useIsEnrolled(seriesId);

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "audio":
        return <Icons.music className="h-4 w-4 text-purple-500" />;
      case "video":
        return <Icons.contentSolid className="h-4 w-4 text-blue-500" />;
      case "text":
        return <Icons.book className="h-4 w-4 text-green-500" />;
      case "youtube":
        return <Icons.youtube className="h-4 w-4 text-red-500" />;
      default:
        return <Icons.content className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!data) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <Icons.spinner className="animate-spin h-8 w-8" />
        </div>
      </PageContainer>
    );
  }

  return (
    <main className="mt-8">
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-[rgb(9,10,11)] dark:to-[rgb(20,21,22)] rounded-3xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
          集
        </h2>
        {data.episodes.length === 0 ? (
          <div className="text-center py-12">
            <Icons.archive className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">暂无内容</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.episodes.map((episode: ContentEpisode, index: number) => (
              <div
                key={episode.id}
                className={cn(
                  "bg-white dark:bg-[rgb(20,21,22)] rounded-xl shadow-sm border border-gray-100 dark:border-[rgb(31,33,35)] transition-all duration-200 hover:shadow-md",
                  !isEnrolled && "opacity-60",
                )}
              >
                <div className="p-2">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        if (isEnrolled && onEpisodeClick) {
                          onEpisodeClick(episode.id);
                        }
                      }}
                      disabled={!isEnrolled}
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                        isEnrolled
                          ? "bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105"
                          : "bg-gray-200 dark:bg-[rgb(31,33,35)] cursor-not-allowed",
                      )}
                    >
                      <Icons.play className="h-3 w-3 text-white dark:text-gray-900 ml-0.5" />
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-1 truncate">
                        {episode.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        {getFormatIcon(episode.type)}
                        <span className="text-gray-500 dark:text-gray-400">
                          {episode.lang}
                        </span>
                      </div>
                    </div>

                    {isEnrolled ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          window.location.href = `/contents/${episode.id}`;
                        }}
                        className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-[rgb(31,33,35)] h-9 px-3"
                      >
                        <span>查看</span>
                        <Icons.front className="h-3.5 w-3.5" />
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[rgb(31,33,35)] px-3 py-2 rounded-md">
                        <Icons.lock className="h-3.5 w-3.5" />
                        <span>订阅后访问</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
