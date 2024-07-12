import { Icons } from "../ui/icons.v2";

import { useState } from "react";
import { getUploadUrl } from "@/domain/asset/asset.api";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import Axios from "axios";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { siteConfig } from "@/lib/config";
import { queryIds } from "@/domain/lesson/queryIds";

const updateComponent = async (
  params: any,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/update-component`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};

export function useUpdateComponentMutation(options = {} as any) {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  return useMutation(
    async (params: any) => {
      const response = await updateComponent(params, {
        Authorization: authUser?.jwt,
      });
      return response;
    },
    {
      ...options,
      onSuccess: (data) => {
        if (options?.onSucess) {
          options?.onSuccess(data);
        }

        queryClient.invalidateQueries([queryIds.listComponents, null]);
      },
    }
  );
}

export const AddAudioButton = (props: any) => {
  const generateAudioMutation = () => {
    alert("generate audio");
  };

  function getFileExtension(file: any) {
    return file.name.split(".").pop().toLowerCase();
  }

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

    console.log("RESPONSE", response);

    // const formData = new FormData();
    // formData.append("image", file);

    Axios.put(url, file, {
      headers: { ["Content-Type"]: contentType },
    });

    addUserAssetMutation
      .mutateAsync({
        id,
        contentType,
        extension,
        sourceUrl: assetUrl,
        uploadBucketKey: s3Key,
      })
      .then(async () => {
        console.log("UPLOADED");

        updateComponentMutation.mutateAsync({
          id: props?.currentPhrase?.id,
          audio: assetUrl,
        });

        // Update Component
      });
  };

  return (
    <div className="flex space-x-8 items-center">
      {/* <button className="">
        <Icons.plusIcon /> <span>upload</span>
      </button> */}

      <div className="space-x-2">
        <Icons.plusIcon />
        <input
          type="file"
          id="actual-btn"
          className="hidden"
          onChange={onUploadFileChange}
        />

        <label htmlFor="actual-btn">Choose File</label>
      </div>

      <button
        onClick={() => {
          generateAudioMutation();
        }}
      >
        <Icons.ai /> Generate
      </button>
    </div>
  );
};
