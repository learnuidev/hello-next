"use client";

import { useListCharacterContentsQuery } from "@/domain/character-contents/use-list-character-contents-query";
import { useGetImageParams } from "./hooks/use-get-image-params";

export default function ImageDetails() {
  const { imageId } = useGetImageParams();

  const { data } = useListCharacterContentsQuery({ fetchType: "user" });
  return (
    <div>
      <h1>Images Details: {imageId}</h1>

      <div>
        <code>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
      </div>
    </div>
  );
}
