"use client";

import { MediaPlayer } from "./components/media-player";
import { useMediaParams } from "./hooks/use-media-params";

export default function MediaDetails() {
  const { mediaId } = useMediaParams();

  return <MediaPlayer mediaId={mediaId} />;
}
