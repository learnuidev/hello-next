"use client";

import { useExtractImageQuery } from "@/domain/character-contents/use-extract-image-mutation";
import { useGetImageParams } from "./hooks/use-get-image-params";
import Link from "next/link";
import { Icons } from "@/components/ui/icons.v2";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";

export default function ImageDetails() {
  const { imageId } = useGetImageParams();

  const { data, isLoading } = useExtractImageQuery(imageId);

  if (isLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/images" className="mb-8 block">
        <Icons.back className="text-2xl" />
      </Link>
      <div className="flex justify-between gap-8 flex-col sm:flex-row items-start">
        <img
          className="h-80 max-w-2xl m-auto rounded-lg"
          src={data?.sourceUrl}
        />

        <div className="space-y-8 px-4 mt-4 w-full">
          {data?.imageMetadata?.details?.map((metadata: any) => {
            return (
              <Link
                key={JSON.stringify(metadata)}
                href={`/nmm/${metadata?.hanzi || metadata?.input}?lang=zh`}
                className="block text-[14px]"
              >
                <p>{metadata?.pinyin}</p>
                <p className="text-2xl">{metadata?.hanzi || metadata?.input}</p>
                <p className="text-gray-400">{metadata?.en}</p>
              </Link>
            );
          })}
        </div>
      </div>
      {/* <div>
        <code>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </code>
      </div> */}
    </div>
  );
}
