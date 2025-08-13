/* eslint-disable @next/next/no-img-element */
import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useAddCharacterContentMutation } from "@/domain/character-contents/use-add-character-contents-mutation";
import { useExtractImageMutation } from "@/domain/character-contents/use-extract-image-mutation";
import { useListCharacterContentsQuery } from "@/domain/character-contents/use-list-character-contents-query";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import Link from "next/link";
import { useState } from "react";

function ImageItem({ item }: any) {
  const extractImageMutation = useExtractImageMutation();

  const [showMeta, setShowMetaData] = useState(false);

  return (
    <Link href={`/images/${item?.id}`}>
      <div className="mb-4 relative">
        <img
          onClick={() => {
            if (item.imageMetadata) {
              setShowMetaData((show) => !show);
            }
          }}
          className="w-full object-cover rounded-xl"
          alt={item?.name}
          src={item?.sourceUrl}
        />

        {!item?.imageMetadata && (
          <button
            onClick={() => {
              extractImageMutation
                .mutateAsync({
                  id: item?.id,
                })
                .then(() => {
                  alert("done");
                });
            }}
            className="absolute bottom-12 text-2xl right-8 text-black"
          >
            {extractImageMutation.isPending ? (
              <Icons.spinner spinPulse />
            ) : (
              <Icons.magicWand />
            )}
          </button>
        )}
      </div>

      {showMeta && (
        <div className="space-y-8 px-4 mt-4">
          {item?.imageMetadata?.details?.map((metadata: any) => {
            return (
              <Link
                key={JSON.stringify(metadata)}
                href={`/nmm/${metadata?.hanzi}?lang=zh`}
                target="_blank"
                className="block text-[14px]"
              >
                <p>{metadata?.pinyin}</p>
                <p>{metadata?.hanzi}</p>
                <p className="text-gray-400">{metadata?.en}</p>
              </Link>
            );
          })}
        </div>
      )}
    </Link>
  );
}

const imageFormats = ["png", "jpg", "jpeg", "gif", "webp"];

export const CharacterContent = ({ characterId }: { characterId: string }) => {
  const [showMeta, setShowMeta] = useState(false);
  const { data } = useListCharacterContentsQuery({
    content: characterId,
    fetchType: "content",
  });
  const isSuperAdmin = useIsSuperAdmin();

  const addCharacterContentMutation = useAddCharacterContentMutation();
  return (
    <div>
      <section className="my-12 flex space-x-12">
        <UploadFileButton
          onSuccess={(resp) => {
            addCharacterContentMutation.mutateAsync({
              content: characterId,
              ...resp,
            });
          }}
          types={imageFormats}
        />

        {isSuperAdmin && (
          <button
            onClick={() => {
              setShowMeta(!showMeta);
            }}
          >
            {showMeta ? "Hide Meta" : "Show Meta"}
          </button>
        )}
      </section>

      {isSuperAdmin && showMeta ? (
        <code>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      ) : data?.length === 0 ? (
        <Nothing />
      ) : (
        <section className="grid grid-cols-4 py-10 md:py-20 gap-4">
          {data?.map((item: any) => {
            if (imageFormats?.includes(item?.extension)) {
              return <ImageItem item={item} key={item.id} />;
            }
          })}
        </section>
      )}
    </div>
  );
};
