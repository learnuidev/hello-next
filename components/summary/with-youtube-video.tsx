// import Image from 'next/image'
"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { useUpdateComponentSummaryMutation } from "@/domain/component-summary/update-component-summary";
import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Icons } from "../ui/icons.v2";
import { parseYoutubeUrl } from "./parse-youtube-url";

import { create } from "zustand";

const useYoutubeVideoStore = create((set: any, get: any) => ({
  videoUrl: "",
  setVideoUrl: (f: any) =>
    typeof f === "function"
      ? set({ videoUrl: f(get().videoUrl) })
      : set({ videoUrl: f }),
  addVideoUrl: false,
  setAddVideoUrl: (f: any) =>
    typeof f === "function"
      ? set({ addVideoUrl: f(get().addVideoUrl) })
      : set({ addVideoUrl: f }),
}));

export const useYoutubeVideoUrl = () => {
  const videoUrl = useYoutubeVideoStore((state) => state.videoUrl);
  const setVideoUrl = useYoutubeVideoStore((state) => state.setVideoUrl);

  const addVideoUrl = useYoutubeVideoStore((state) => state.addVideoUrl);
  const setAddVideoUrl = useYoutubeVideoStore((state) => state.setAddVideoUrl);

  return {
    videoUrl,
    setVideoUrl,
    addVideoUrl,
    setAddVideoUrl,
  };
};
export const WithYoutubeVideo = ({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) => {
  const { videoUrl, setVideoUrl, addVideoUrl, setAddVideoUrl } =
    useYoutubeVideoUrl();

  const updateSummaryMutation = useUpdateComponentSummaryMutation();

  const {
    data: meaning,
    isLoading,
    isError,
  } = useListMeaningsQuery({
    content: characterId,
    lang,
  });

  useEffect(() => {
    if (meaning?.youtubeUrl) {
      setVideoUrl(meaning?.youtubeUrl);
    }
  }, [meaning?.youtubeUrl, setVideoUrl]);

  let meaningResponse = meaning as ListMeaningsResponse;

  return meaningResponse?.youtubeUrl && !addVideoUrl ? (
    <div className="mb-12">
      <div className="border rounded-lg overflow-hidden">
        <ReactPlayer
          className="aspect-video"
          url={parseYoutubeUrl(meaningResponse?.youtubeUrl).data}
          width={"100%"}
          height={"100%"}
          controls
        />
      </div>
    </div>
  ) : addVideoUrl ? (
    <div>
      <input
        className="w-full h-12 text-lg"
        value={videoUrl}
        onChange={(event) => {
          setVideoUrl(event?.target.value);
        }}
        placeholder="Video Url"
      />
      <div className="flex gap-4 mt-4">
        <button
          disabled={!videoUrl}
          onClick={() => {
            const parsed = parseYoutubeUrl(videoUrl);

            if (parsed.data) {
              updateSummaryMutation
                // @ts-ignore
                .mutateAsync({
                  id: meaningResponse?.id,
                  youtubeUrl: parsed.data,
                })
                .then(() => {
                  setAddVideoUrl(false);
                });
            }
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            setAddVideoUrl(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : null;
};
