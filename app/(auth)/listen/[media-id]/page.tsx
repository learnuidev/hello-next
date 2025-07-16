"use client";

import { useGetMediaQuery } from "../hooks/use-get-media-query";
import { useMediaParams } from "./hooks/use-media-params";

export default function MediaDetails() {
  const { mediaId } = useMediaParams();

  const { data } = useGetMediaQuery(mediaId);
  return <div> Media Details</div>;
}
