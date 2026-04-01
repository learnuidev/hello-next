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
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

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

      <main className="mt-8">
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">集</h2>
          {data.episodes.length === 0 ? (
            <div className="text-center py-12">
              <Icons.archive className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">暂无内容</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.episodes.map((episode: ContentV2, index: number) => (
                <div
                  key={episode.id}
                  className={cn(
                    "bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md",
                    !isEnrolled && "opacity-60",
                  )}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          if (isEnrolled) {
                            handlePlayAudio(episode);
                          }
                        }}
                        disabled={!isEnrolled}
                        className={cn(
                          "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
                          isEnrolled
                            ? "bg-gray-900 hover:bg-gray-800 hover:scale-105"
                            : "bg-gray-200 cursor-not-allowed",
                        )}
                      >
                        <Icons.play className="h-5 w-5 text-white ml-0.5" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
                          {episode.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm">
                          {getFormatIcon(episode.format)}
                          <span className="text-gray-500">{episode.lang}</span>
                        </div>
                      </div>

                      {isEnrolled ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            window.location.href = `/contents/${episode.id}`;
                          }}
                          className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 h-9 px-3"
                        >
                          <span>查看</span>
                          <Icons.front className="h-3.5 w-3.5" />
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
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
    </PageContainer>
  );
}
