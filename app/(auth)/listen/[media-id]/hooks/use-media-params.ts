"use client";

import { useParams } from "next/navigation";

export const useMediaParams = () => {
  const params = useParams<{ "media-id": string }>();

  return {
    mediaId: params["media-id"],
  };
};
