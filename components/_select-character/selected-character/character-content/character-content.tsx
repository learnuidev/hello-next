/* eslint-disable @next/next/no-img-element */
import { Nothing } from "@/app/nmm/nothing";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useAddCharacterContentMutation } from "@/domain/character-contents/use-add-character-contents-mutation";
import { useListCharacterContentsQuery } from "@/domain/character-contents/use-list-character-contents-query";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { useState } from "react";

export const CharacterContent = ({ characterId }: { characterId: string }) => {
  const [showMeta, setShowMeta] = useState(false);
  const { data } = useListCharacterContentsQuery(characterId);
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
        <section className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
          {data?.map((item: any) => {
            if (["png", "jpg", "jpeg"]?.includes(item?.extension)) {
              return (
                <div key={item.id} className="mb-4 break-inside-avoid">
                  <img
                    className="w-full object-cover rounded-xl"
                    alt={item?.name}
                    src={item?.sourceUrl}
                  />
                </div>
              );
            }
          })}
        </section>
      )}
    </div>
  );
};
