// import Image from 'next/image'
"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { useUpdateComponentSummaryMutation } from "@/domain/component-summary/update-component-summary";
import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";

import { useState } from "react";
import ReactPlayer from "react-player";
import { Icons } from "../ui/icons.v2";

export const WithYoutubeVideo = ({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) => {
  const [addVideoUrl, setAddVideoUrl] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const updateSummaryMutation = useUpdateComponentSummaryMutation();

  const {
    data: meaning,
    isLoading,
    isError,
  } = useListMeaningsQuery({
    content: characterId,
    lang,
  });

  let meaningResponse = meaning as ListMeaningsResponse;

  return meaningResponse?.youtubeUrl ? (
    <ReactPlayer
      className="aspect-video"
      url={meaningResponse?.youtubeUrl}
      // width={isSmall ? "100%" : "600px"}
      height={"100%"}
      controls
    />
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
            updateSummaryMutation
              // @ts-ignore
              .mutateAsync({
                id: meaningResponse?.id,
                youtubeUrl: videoUrl,
              })
              .then(() => {
                console.log("Summary Successfully Updated");
              });
          }}
        >
          Add
        </button>
        <button
          disabled={!videoUrl}
          onClick={() => {
            setAddVideoUrl(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div>
      <button
        onClick={() => {
          setAddVideoUrl(true);
        }}
      >
        <Icons.youtube />
      </button>
    </div>
  );
};
