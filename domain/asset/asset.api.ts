"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";

import { useCurrentAuthUser } from "../auth/auth.queries";
import { GetUploadUrlParams, GetUploadUrlSuccess } from "./asset.types";
import { siteConfig } from "@/lib/config";

// TODO: Move this to .env

export const getUploadUrl = async (
  { contentType, extension }: GetUploadUrlParams,
  opts: {
    Authorization: string;
  }
): Promise<GetUploadUrlSuccess> => {
  const res = await fetch(`${siteConfig.apiUrl}/v2/get-upload-url`, {
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
