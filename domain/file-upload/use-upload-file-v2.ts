import { getUploadUrl } from "@/domain/asset/asset.api";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import Axios from "axios";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";

export interface UploadFileResponse {
  id: string;
  contentType: string;
  extension: string;
  sourceUrl: string;
  userId: string;
  uploadBucketKey: string;
  status: string;
  webpageUrl?: string;
  createdAt: number;
}

export function useUploadFileV2(cb?: any, ctx?: any, props?: any) {
  function getFileExtension(file: any) {
    return file.name.split(".").pop().toLowerCase();
  }

  const addUserAssetMutation = useAddUserAssetMutation();

  const { data: authUser } = useCurrentAuthUser({});

  const onUploadFileChange = async (e: any) => {
    const file = e?.target?.files?.[0] || e;
    const extension = getFileExtension(file) || "";

    const contentType = file.type || "";
    const fileName = file.name || "";
    const fileSize = file.size || 0;

    console.log({ extension, contentType });

    if (props?.types && !props?.types?.includes(extension)) {
      alert("Incorrect file type");
      e.target.value = "";

      return null;
    }

    console.log("FILE", file);

    const response = (await getUploadUrl(
      { extension, contentType },
      {
        Authorization: authUser?.jwt,
      }
    )) as any;

    const { signedUrl: url, s3Key, assetUrl, id } = response;

    console.log("RESPONSE", response);

    // const formData = new FormData();
    // formData.append("image", file);

    Axios.put(url, file, {
      headers: { ["Content-Type"]: contentType },
    });

    addUserAssetMutation
      .mutateAsync({
        id,
        name: fileName,
        size: fileSize,
        contentType,
        extension,
        sourceUrl: assetUrl,
        uploadBucketKey: s3Key,
        ...ctx,
      })
      .then(async (resp: UploadFileResponse) => {
        console.log("UPLOADED", resp);

        if (e?.target?.value) {
          e.target.value = "";
        }

        cb(resp);
      });
  };

  return {
    onUploadFileChange,
    addUserAssetMutation,
  };
}
