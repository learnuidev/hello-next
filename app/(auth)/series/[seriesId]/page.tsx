"use client";

import { StatsList } from "@/components/new-home-page/components/content-card/stats-list";
import { PageContainer } from "@/components/page-container";
import { Icons } from "@/components/ui/icons.v2";
import { Button } from "@/components/ui/button";
import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";
import {
  useCreateEnrollmentMutation,
  useDeleteEnrollmentMutation,
  useIsEnrolled,
} from "@/domain/enrollments";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ContentV2 } from "@/domain/content-v2/content-v2.types";

export default function SeriesDetailsPage() {
  const params = useParams<{ seriesId: string }>();

  const seriesId = params.seriesId;

  const { data } = useGetSeriesDetailsQuery({
    seriesId,
  });

  const { isEnrolled, isLoading: isEnrollmentLoading } =
    useIsEnrolled(seriesId);

  const createEnrollmentMutation = useCreateEnrollmentMutation();
  const deleteEnrollmentMutation = useDeleteEnrollmentMutation();
  const { toast } = useToast();

  const handleEnroll = async () => {
    try {
      await createEnrollmentMutation.mutateAsync({ seriesId });
      toast({
        title: "Success",
        description: "You have been enrolled in this series",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to enroll in series",
        variant: "destructive",
      });
    }
  };

  const handleUnenroll = async () => {
    try {
      await deleteEnrollmentMutation.mutateAsync(seriesId);
      toast({
        title: "Success",
        description: "You have been unenrolled from this series",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to unenroll from series",
        variant: "destructive",
      });
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
    <PageContainer>
      <header>
        <nav className="mt-4">
          <Link href="/">
            <Icons.back />
          </Link>
        </nav>
        <div className="my-8 flex flex-row gap-8">
          <img
            className="aspect-square w-60 rounded"
            src={data.series.backgroundImage}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{data.series.title}</h1>
            <p>{data.series.description}</p>
            <div>
              <StatsList className="text-xl mt-4" {...data.series.stats} />
            </div>
            <div className="mt-6">
              {isEnrollmentLoading ? (
                <Icons.spinner className="animate-spin h-5 w-5" />
              ) : isEnrolled ? (
                <Button
                  variant="destructive"
                  onClick={handleUnenroll}
                  disabled={deleteEnrollmentMutation.isPending}
                >
                  {deleteEnrollmentMutation.isPending ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.check className="mr-2 h-4 w-4" />
                  )}
                  Enrolled
                </Button>
              ) : (
                <Button
                  onClick={handleEnroll}
                  disabled={createEnrollmentMutation.isPending}
                >
                  {createEnrollmentMutation.isPending ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.plusIcon className="mr-2 h-4 w-4" />
                  )}
                  Enroll
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="bg-gray-50 mt-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Episodes</h2>
          {data.episodes.length === 0 ? (
            <p className="text-gray-600">No episodes available yet.</p>
          ) : (
            <div className="space-y-3">
              {data.episodes.map((episode: ContentV2) => (
                <div
                  key={episode.id}
                  className={`bg-white p-4 rounded-lg shadow-sm border ${
                    isEnrolled
                      ? "cursor-pointer hover:border-blue-500 transition-colors"
                      : "opacity-60 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (isEnrolled) {
                      window.location.href = `/contents/${episode.id}`;
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{episode.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Format: {episode.format}
                      </p>
                    </div>
                    {isEnrolled && (
                      <Icons.front className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  {!isEnrolled && (
                    <p className="text-sm text-blue-600 mt-2">
                      Enroll to access this episode
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </PageContainer>
  );
}
