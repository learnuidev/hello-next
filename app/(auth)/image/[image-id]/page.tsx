"use client";

import { useGetImageParams } from "./hooks/use-get-image-params";

export default function ImageDetails() {
  const { imageId } = useGetImageParams();
  return (
    <div>
      <h1>Images Details: {imageId}</h1>
    </div>
  );
}
