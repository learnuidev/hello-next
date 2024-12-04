"use client";

import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { useUpdateContentMutation } from "@/domain/content/use-update-content-mutation";
import {
  UploadFileResponse,
  useGetUploadJsonHandler,
} from "@/domain/file-upload/use-get-upload-json-handler";

// 1. upload translation to s3

export function ContentWithS3Translations() {
  const { data: contents } = useListContentsQuery();

  const updateContentMutation = useUpdateContentMutation();

  const contentsWithoutS3 =
    contents?.filter((content) => !content?.sourceUrl) || [];

  const uploadJsonHandlerAll = useGetUploadJsonHandler();

  const mutateAll = async () => {
    if (contentsWithoutS3?.length !== 0) {
      return Promise.all(
        contentsWithoutS3?.map(async (content) => {
          return uploadJsonHandlerAll({
            json: content,
            name: content?.title || "",
          }).then((res: UploadFileResponse) => {
            return updateContentMutation.mutateAsync({
              id: content?.id || "",
              sourceUrl: res.sourceUrl,
              uploadBucketKey: res.uploadBucketKey,
              s3LinkAddedAt: Date.now(),
            });
          });
        })
      );
    }

    return null;
  };

  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return <div> You dont have the permission to view this page </div>;
  }

  if (!contentsWithoutS3?.length) {
    return (
      <Nothing
        icon={Icons.kiwi}
        message={"All the content has been uploaded to s3"}
      />
    );
  }

  return (
    <div className="m-8">
      <button
        className="bg-gray-800 px-4 py-2"
        onClick={() => {
          mutateAll().then(() => {
            alert("DONE");
          });
        }}
      >
        Mutate All
      </button>

      <div>
        <code>
          <pre>{JSON.stringify(contentsWithoutS3, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
}
