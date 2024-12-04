import { getUploadUrl } from "@/domain/asset/asset.api";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";

export interface UploadFileResponse {
  id: string;
  contentType: string;
  extension: string;
  sourceUrl: string;
  userId: string;
  uploadBucketKey: string;
  status: string;
  createdAt: number;
}

export function useGetUploadJsonHandler(cb?: any) {
  const addUserAssetMutation = useAddUserAssetMutation();

  const { data: authUser } = useCurrentAuthUser({});

  const onUploadFileChange = async ({
    json,
    name,
    // size,
  }: {
    json: any;
    name?: string;
    // size?: number;
  }) => {
    const contentType = "application/json";
    const fileName = name || "";

    const size = new TextEncoder().encode(JSON.stringify(json)).length;

    const fileSize = size || 0;

    const extension = "json";

    console.log({ extension, contentType });

    const response = (await getUploadUrl(
      { extension, contentType },
      {
        Authorization: authUser?.jwt,
      }
    )) as any;

    const { signedUrl: url, s3Key, assetUrl, id } = response;

    await fetch(url, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(json),
    });

    return addUserAssetMutation
      .mutateAsync({
        id,
        name: fileName,
        size: fileSize,
        contentType,
        extension,
        sourceUrl: assetUrl,
        uploadBucketKey: s3Key,
      })
      .then(async (resp: UploadFileResponse) => {
        if (cb) {
          return cb(resp);
        }
        return resp;
      });
  };

  return onUploadFileChange;
}
