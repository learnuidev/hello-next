import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useMutation } from "@tanstack/react-query";
import { listenApiUrl } from "../../constants";
import { UploadMediaButton } from "./upload-media-button";

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
  const updateMediaMutation = useUpdateMediaMutation();

  return (
    <UploadMediaButton
      text={text}
      onUploadSuccess={({ id }) => {
        updateMediaMutation.mutateAsync({
          mediaId,
          customAudioId: id,
        });
      }}
    />
  );
};
