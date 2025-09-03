import { getUploadUrl } from "@/domain/asset/asset.api";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import Axios from "axios";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";
import { useState } from "react";

export interface UploadFileResponse {
  id: string;
  name: string;
  contentType: string;
  extension: string;
  sourceUrl: string;
  userId: string;
  uploadBucketKey: string;
  status: string;
  webpageUrl?: string;
  createdAt: number;
}

export function useUploadFile(cb?: any, ctx?: any, props?: any) {
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  function getFileExtension(file: any) {
    return file.name.split(".").pop().toLowerCase();
  }

  const addUserAssetMutation = useAddUserAssetMutation();

  const { data: authUser } = useCurrentAuthUser({});

  const onUploadFileChange = async (e: any) => {
    const file = e?.target?.files?.[0] || e;
    const extension = getFileExtension(file) || "";

    setIsUploading(true);

    const contentType = file.type || "";
    const fileName = file.name || "";
    const fileSize = file.size || 0;

    if (props?.types?.includes("*")) {
    } else {
      if (props?.types && !props?.types?.includes(extension)) {
        alert(
          `Incorrect file type. Only the following are supported: ${JSON.stringify(props?.types || [])}`
        );
        e.target.value = "";

        return null;
      }
    }

    const response = (await getUploadUrl(
      { extension, contentType },
      {
        Authorization: authUser?.jwt,
      }
    )) as any;

    const { signedUrl: url, s3Key, assetUrl, id } = response;

    // const formData = new FormData();
    // formData.append("image", file);

    Axios.put(url, file, {
      headers: { ["Content-Type"]: contentType },
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setPercentCompleted(percentCompleted);
      },
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
      // @ts-ignore
      .then(async (resp: UploadFileResponse) => {
        setIsUploading(false);

        if (e?.target?.value) {
          e.target.value = "";
        }

        cb(resp);
      });
  };

  return { onUploadFileChange, percentCompleted, isUploading };
}
