// import { Icons } from "../../ui/icons.v2";

import { Icons } from "@/components/ui/icons.v2";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import Axios from "axios";
import { useRef } from "react";
import { listenApiUrl } from "../../constants";
import { cn } from "@/lib/utils";

export interface GetUploadUrlParams {
  urlId?: string;
  contentType: string;
  extension: string;
}
export interface GetUploadUrlSuccess {
  signedUrl: string;
  s3Key: string;
  assetUrl: string;
}

const getUploadUrl = async (
  { contentType, extension }: GetUploadUrlParams,
  opts: {
    Authorization: string;
  }
): Promise<GetUploadUrlSuccess> => {
  const res = await fetch(`${listenApiUrl}/v1/get-upload-url`, {
    method: "POST",
    headers: {
      // 'Access-Control-Allow-Origin': "*",
      Authorization: `Bearer ${opts?.Authorization}`,
    },
    body: JSON.stringify({
      contentType,
      extension,
    }),
  });
  const resp = (await res.json()) as any;

  return resp;
};

export const UploadMediaButton = ({
  onUploadSuccess,
  text,
  className,
}: {
  onUploadSuccess: (asset: { id: string }) => void;
  text?: string;
  className?: string;
}) => {
  function getFileExtension(file: any) {
    return file.name.split(".").pop().toLowerCase();
  }

  const fileInputRef = useRef(null);

  const addUserAssetMutation = useAddUserAssetMutation();

  const { data: authUser } = useCurrentAuthUser({});

  const onUploadFileChange = async (e: any) => {
    const file = e.target.files[0];
    const extension = getFileExtension(file) || "";

    const contentType = file.type || "";

    console.log({ extension, contentType });

    const response = (await getUploadUrl(
      { extension, contentType },
      {
        Authorization: authUser?.jwt,
      }
    )) as any;

    const { signedUrl: url, s3Key, assetUrl, id } = response;

    Axios.put(url, file, {
      headers: { ["Content-Type"]: contentType },
    });

    addUserAssetMutation
      // @ts-ignore
      .mutateAsync({
        id,
        contentType,
        extension,
        sourceUrl: assetUrl,
        uploadBucketKey: s3Key,
      })
      .then(async (asset: any) => {
        onUploadSuccess(asset);
        console.log("UPLOADED");

        // @ts-ignore
        fileInputRef.current.value = "";

        // Update Component
      })
      .catch((err) => {
        // @ts-ignore
        fileInputRef.current.value = "";
      });
  };

  return (
    <div className={cn("space-x-2", className)}>
      <Icons.plusIcon />
      <input
        ref={fileInputRef}
        type="file"
        id="actual-btn"
        className="hidden"
        onChange={onUploadFileChange}
      />

      <label htmlFor="actual-btn">{text || "Choose File"}</label>
    </div>
  );
};
