// import { Icons } from "../../ui/icons.v2";

import { Icons } from "@/components/ui/icons.v2";
// import { getUploadUrl } from "@/domain/asset/asset.api";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useUpdateComponentMutation } from "@/domain/component/use-update-component-mutation";
import { IComponent } from "@/domain/lesson/component.queries";
import { useUpdateMeaningMutation } from "@/domain/sentence/use-update-meaning-mutation";
import Axios from "axios";
import { listenApiUrl } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useRef } from "react";

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

const useUpdateMediaMutation = () => {
  const jwt = useJwtToken();
  return useMutation({
    mutationFn: async ({ mediaId, ...rest }: any) => {
      const resp = await fetch(`${listenApiUrl}/v1/update-media`, {
        method: "POST",
        headers: {
          Authorization: jwt,
        },
        body: JSON.stringify({
          mediaId,
          ...rest,
        }),
      });

      return resp.json();
    },
  });
};

export const getUploadUrl = async (
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

export const UploadAudioButtonListen = ({
  mediaId,
  text,
}: {
  mediaId: string;
  text?: string;
}) => {
  function getFileExtension(file: any) {
    return file.name.split(".").pop().toLowerCase();
  }

  const fileInputRef = useRef(null);

  //   const updateMeaningMutation = useUpdateMeaningMutation();

  const updateMediaMutation = useUpdateMediaMutation();

  const addUserAssetMutation = useAddUserAssetMutation();

  const updateComponentMutation = useUpdateComponentMutation();

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
        console.log("UPLOADED");

        updateMediaMutation.mutateAsync({
          mediaId,
          customAudioId: asset.id,
        });

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
    <div className="space-x-2">
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
