"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { GetUploadUrlParams, GetUploadUrlSuccess } from "./asset.types";

// TODO: Move this to .env
const url =
  "https://ocdi1u27uf.execute-api.us-east-1.amazonaws.com/dev/v1/get-upload-url";

export const getUploadUrl = async (
  { contentType, extension }: GetUploadUrlParams,
  opts: {
    Authorization: string;
  }
): Promise<GetUploadUrlSuccess> => {
  const res = await fetch(url, {
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
