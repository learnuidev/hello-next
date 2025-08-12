"use client";

import { useExtractImageQuery } from "@/domain/character-contents/use-extract-image-mutation";
import { useGetImageParams } from "./hooks/use-get-image-params";
import Link from "next/link";
import { Icons } from "@/components/ui/icons.v2";

export default function ImageDetails() {
  const { imageId } = useGetImageParams();

  const { data } = useExtractImageQuery(imageId);

  return (
    <div className="p-8">
      <Link href="/images" className="mb-8 block">
        <Icons.back className="text-2xl" />
      </Link>
      <img
        className="h-auto max-w-5xl m-auto rounded-lg"
        src={data?.sourceUrl}
      />

      <div>
        <code>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
      </div>
    </div>
  );
}
