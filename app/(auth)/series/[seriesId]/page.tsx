"use client";

import { StatsList } from "@/components/new-home-page/components/content-card/stats-list";
import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { useToast } from "@/components/ui/use-toast";
import { ContentV2 } from "@/domain/content-v2/content-v2.types";
import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";
import {
  useCreateEnrollmentMutation,
  useDeleteEnrollmentMutation,
  useIsEnrolled,
} from "@/domain/enrollments";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { SeriesDetailsTabs } from "./components/series-details-tabs";

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

  const playingAudioRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = (episode: ContentV2) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (playingAudioRef.current === episode.id) {
      playingAudioRef.current = null;
      return;
    }

    const audio = new Audio(episode.mediaUrl);
    audioRef.current = audio;
    playingAudioRef.current = episode.id;

    audio.play();

    audio.onended = () => {
      playingAudioRef.current = null;
      audioRef.current = null;
    };
  };

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
            <p className="text-gray-500 text-sm my-4">
              {data.series.description}
            </p>
            <div>
              <StatsList
                className="text-xl font-extralight mt-4"
                {...data.series.stats}
              />
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

      <SeriesDetailsTabs seriesId={seriesId} />
    </PageContainer>
  );
}
