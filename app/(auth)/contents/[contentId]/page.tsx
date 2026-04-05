"use client";

import { useGetSeriesContentDetailsQuery } from "@/domain/content-v2/use-get-series-content-details-query";
import { useGetSeriesDetailsQuery } from "@/domain/content-v2/use-get-series-details-query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { formatTime } from "../../convos/_play/utils";
import { Slider } from "@/components/ui/slider";
import { Icons } from "@/components/ui/icons.v2";

export default function ContentDetailsPage() {
  const params = useParams<{ contentId: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const contentId = params.contentId;

  const playerRef = useRef<any>(null);

  const seek = useCallback((time: number) => {
    playerRef.current.seekTo(time, "seconds");
  }, []);

  const play = useCallback(() => {
    playerRef.current?.player?.player?.play();
  }, []);

  function pause() {
    playerRef.current?.player?.player?.pause();
  }

  const seekAndPlay = useCallback(
    (time: number) => {
      seek(time);
      play();
    },
    [seek, play]
  );

  const onReady = useCallback((data: any) => {
    setDuration(data.getDuration());
  }, []);

  const { data } = useGetSeriesContentDetailsQuery({ contentId });

  const content = data?.content;
  const series = data?.series;

  const { data: seriesDetails } = useGetSeriesDetailsQuery({
    seriesId: content?.seriesId,
  });

  const handleSeekChange = (event: number[]) => {
    seekAndPlay(event[0]);
  };

  if (!data) {
    return;
  }

  const currentTranscriptionInput = content?.transcriptions?.filter(
    (transcription) => {
      return (
        transcription?.start <= currentTime && transcription?.end >= currentTime
      );
    }
  )?.[0]?.input;

  const PROGRESS_INTERVAL = 100;

  return (
    <div className="px-40 mt-20 grid grid-cols-2">
      <div className="w-[24rem]">
        <div>
          <img
            className="rounded-2xl aspect-square w-[24rem]"
            src={data?.content?.backgroundImage}
          />
        </div>

        <h1 className="mt-16 mb-2 text-2xl">{content?.title}</h1>
        <h4 className="text-gray-500">{series?.source?.title}</h4>

        <div className="flex items-center gap-4 mt-32">
          <Slider
            hidden
            min={0}
            max={duration}
            step={1}
            value={[currentTime]}
            defaultValue={[currentTime]}
            onValueChange={handleSeekChange}
            className="w-full"
          />
        </div>

        <div className="mt-12 flex justify-between">
          <button className="text-2xl">
            <Icons.loop />
          </button>

          <button className="text-2xl">
            <Icons.backward />
          </button>

          <div className="text-5xl">
            {isPlaying ? (
              <button
                onClick={() => {
                  pause();
                }}
              >
                <Icons.pause />
              </button>
            ) : (
              <button
                onClick={() => {
                  play();
                }}
              >
                <Icons.play />
              </button>
            )}
          </div>
          <button className="text-2xl">
            <Icons.forward />
          </button>
          <button className="text-2xl">
            <Icons.list />
          </button>
        </div>

        <ReactPlayer
          url={content?.mediaUrl}
          width="100%"
          ref={playerRef}
          onReady={onReady}
          playing={isPlaying}
          controls={false}
          onProgress={(value) => {
            setCurrentTime(value.playedSeconds);
          }}
          height={"0px"}
          progressInterval={PROGRESS_INTERVAL}
          onPlay={() => {
            // setNewContextId();

            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      <div className="text-2xl">
        <h1 className="mb-2 text-2xl font-bold">{content?.title}</h1>
        <h4 className="text-gray-500 text-sm">{series?.source?.title}</h4>

        <p className="mt-32">{currentTranscriptionInput}</p>
      </div>
    </div>
  );
}
