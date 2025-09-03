// import { getUploadUrl } from "@/domain/asset/asset.api";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import Axios from "axios";
import { rootFileUrl } from "./constants";
import { useQueryClient } from "@tanstack/react-query";
import { listFilesQueryKey } from "./hooks/use-list-files-query";
// import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";

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

interface GetUploadUrlResponse {
  fileId: string;
  presignedUrl: string;
}
const getUploadUrl = async (
  {
    fileName,
    contentType,
    fileSize,
    extension,
  }: {
    fileName: string;
    contentType: string;
    fileSize: number;
    extension: string;
  },
  { Authorization }: { Authorization: string }
): Promise<GetUploadUrlResponse> => {
  const resp = await fetch(`${rootFileUrl}/files`, {
    method: "POST",
    body: JSON.stringify({
      fileName,
      contentType,
      fileSize,
      extension,
    }),
    headers: {
      Authorization,
    },
  });

  return (await resp.json()) as GetUploadUrlResponse;
};

export function useUploadFileNew() {
  function getFileExtension(file: any) {
    return file.name.split(".").pop().toLowerCase();
  }

  const queryClient = useQueryClient();

  //   const addUserAssetMutation = useAddUserAssetMutation();

  const { data: authUser } = useCurrentAuthUser({});

  const onUploadFileChange = async (e: any) => {
    const file = e?.target?.files?.[0] || e;
    const extension = getFileExtension(file) || "";

    const contentType = file.type || "";
    const fileName = file.name || "";
    const fileSize = file.size || 0;

    const response = await getUploadUrl(
      { fileName, contentType, fileSize, extension },
      {
        Authorization: authUser?.jwt,
      }
    );

    const { presignedUrl: url, fileId } = response;

    Axios.put(url, file, {
      headers: { ["Content-Type"]: contentType },
    });

    // @ts-ignore
    queryClient.refetchQueries([listFilesQueryKey]);
  };

  return onUploadFileChange;
}
