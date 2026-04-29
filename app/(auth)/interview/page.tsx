"use client";

import { IMAGE_FORMATS } from "@/components/_select-character/selected-character/character-content/image-formats";
import { useListUserAssets } from "@/domain/asset/use-list-user-assets";
import Image from "next/image";

export default function InterviewPage() {
  const { data: userAssets, isLoading, isError } = useListUserAssets();

  const imageAssets =
    userAssets?.filter((asset: any) =>
      IMAGE_FORMATS.includes(asset.contentType),
    ) || [];

  return (
    <div>
      <header>
        <h1>User Assets</h1>
      </header>

      <main>
        {isLoading ? (
          <div>
            <p>Is Loading...</p>{" "}
          </div>
        ) : isError ? (
          <div>
            <p>Failed Loading Images</p>
          </div>
        ) : (
          <section>
            {imageAssets?.map((asset) => {
              return (
                <div key={asset?.id} className="relative h-full">
                  <Image
                    src={asset?.sourceUrl}
                    alt={"Image"}
                    fill
                    loading="lazy"
                    decoding="async"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
