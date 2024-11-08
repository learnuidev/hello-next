import { Icons } from "../../ui/icons.v2";

import { getUploadUrl } from "@/domain/asset/asset.api";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { updateComponent } from "@/domain/component/update-component.api";
import { IComponent } from "@/domain/lesson/component.queries";
import { queryIds } from "@/domain/lesson/queryIds";
import { siteConfig } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "axios";

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

        queryClient.invalidateQueries([queryIds.listComponents]);
      },
    }
  );
}

export const UploadAudioButton = (props: { currentPhrase: IComponent }) => {
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
  );
};
