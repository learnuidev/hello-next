// import Image from 'next/image'
"use client";

import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";

import { useUpdateComponentSummaryMutation } from "@/domain/component-summary/update-component-summary";
import { ListMeaningsResponse } from "@/domain/sentence/meanings.types";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Icons } from "../ui/icons.v2";
import { parseYoutubeUrl } from "./parse-youtube-url";

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

  useEffect(() => {
    if (meaning?.youtubeUrl) {
      setVideoUrl(meaning?.youtubeUrl);
    }
  }, [meaning?.youtubeUrl]);

  let meaningResponse = meaning as ListMeaningsResponse;

  return meaningResponse?.youtubeUrl && !addVideoUrl ? (
    <div>
      <div className="border rounded-lg overflow-hidden">
        <ReactPlayer
          className="aspect-video"
          url={parseYoutubeUrl(meaningResponse?.youtubeUrl).data}
          width={"100%"}
          // width={isSmall ? "100%" : "600px"}
          height={"100%"}
          controls
        />
      </div>

      <button
        className="mt-4 text-gray-500"
        onClick={() => {
          setAddVideoUrl(true);
        }}
      >
        {" "}
        <Icons.edit />
      </button>
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
                  console.log("Summary Successfully Updated");
                });
            }
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
