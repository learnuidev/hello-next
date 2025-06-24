import { Icons } from "../../ui/icons.v2";

import { getUploadUrl } from "@/domain/asset/asset.api";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useUpdateComponentMutation } from "@/domain/component/use-update-component-mutation";
import { IComponent } from "@/domain/lesson/component.queries";
import { useUpdateMeaningMutation } from "@/domain/sentence/use-update-meaning-mutation";
import Axios from "axios";

export const UploadAudioButton = (props: {
  currentPhrase: IComponent;
  meaningId?: string;
}) => {
  function getFileExtension(file: any) {
    return file.name.split(".").pop().toLowerCase();
  }

  const updateMeaningMutation = useUpdateMeaningMutation();

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
      .then(async () => {
        console.log("UPLOADED");

        if (props?.meaningId) {
          // @ts-ignore
          updateMeaningMutation.mutateAsync({
            id: props.meaningId,
            audioUrl: assetUrl,
          });
        } else {
          // @ts-ignore
          updateComponentMutation.mutateAsync({
            id: props?.currentPhrase?.id,
            audio: assetUrl,
          });
        }

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
